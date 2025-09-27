import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Modal, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { ArrowLeft, ThumbsUp, ThumbsDown, Share, Edit3, MoreHorizontal } from "lucide-react-native";
import { AccuracyBadge } from "@/components/ConfidenceRing";
import { listResults, updateName, deleteResult } from "@/lib/heightStore";
import { ShareModal } from "@/components/ShareModal";
import { FONT_FAMILIES } from "@/constants/typography";

type HeightDataItem = {
  id: string;
  name: string;
  photoUri: string | null;
  heightCm: number | null;
  accuracy: string;
  explanation: string | null;
  method: string | null;
  date: string;
};

export default function ResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [title, setTitle] = useState("Name");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<HeightDataItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadItem = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const results = await listResults();
        const item = results.find(r => r.id === id);
        setCurrentItem(item || null);
        if (item) {
          setTitle(item.name);
        }
      } catch (error) {
        console.error('Failed to load item:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadItem();
  }, [id]);
  
  const accuracy = (currentItem?.accuracy as "High" | "Moderate" | "Low") || "High";
  const formatHeight = (heightCm: number) => {
    const totalInches = heightCm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}′${inches}″`;
  };
  const height = currentItem && currentItem.heightCm ? formatHeight(currentItem.heightCm) : "5′11″";
  
  const explanation = currentItem?.explanation || "Based on visual analysis of body proportions and reference objects in the image, our AI model estimates this person's height with high confidence. The analysis considers factors such as head-to-body ratio, limb proportions, and environmental context clues to provide an accurate measurement.";
  const shortAnalysis = explanation.length > 100 ? explanation.substring(0, 100) + "..." : explanation;
  const fullAnalysis = explanation;

  const handleShare = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setShowShareModal(true);
  };

  const handleFeedback = (type: "up" | "down") => {
    if (!type || type.trim() === "") return;
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setFeedback(type);
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      await deleteResult(id);
      setShowMenu(false);
      router.back();
    } catch (error) {
      console.error('Failed to delete result:', error);
    }
  };

  const MenuModal = () => (
    <Modal
      visible={showMenu}
      transparent
      animationType="fade"
      onRequestClose={() => setShowMenu(false)}
    >
      <TouchableOpacity 
        style={styles.menuOverlay} 
        activeOpacity={1} 
        onPress={() => {
          if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
          setShowMenu(false);
        }}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
            <Text style={styles.menuItemText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
          router.back();
        }}>
          <ArrowLeft color="#000000" size={24} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          {isEditingTitle ? (
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              onBlur={async () => {
                setIsEditingTitle(false);
                if (id && title.trim()) {
                  try {
                    await updateName(id, title.trim());
                    if (currentItem) {
                      setCurrentItem({ ...currentItem, name: title.trim() });
                    }
                  } catch (error) {
                    console.error('Failed to update name:', error);
                  }
                }
              }}
              onSubmitEditing={async () => {
                setIsEditingTitle(false);
                if (id && title.trim()) {
                  try {
                    await updateName(id, title.trim());
                    if (currentItem) {
                      setCurrentItem({ ...currentItem, name: title.trim() });
                    }
                  } catch (error) {
                    console.error('Failed to update name:', error);
                  }
                }
              }}
              autoFocus
              selectTextOnFocus
            />
          ) : (
            <TouchableOpacity onPress={() => {
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
              setIsEditingTitle(true);
            }} style={styles.titleTouchable}>
              <Text style={styles.headerTitle}>{title}</Text>
            </TouchableOpacity>
          )}
          {!isEditingTitle && title === "Name" && (
            <TouchableOpacity 
              onPress={() => {
                if (Platform.OS !== 'web') {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
                setIsEditingTitle(true);
              }}
              style={styles.editButton}
            >
              <Edit3 color="#666666" size={16} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => {
          if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          }
          setShowMenu(true);
        }} style={styles.menuButton}>
          <MoreHorizontal color="#000000" size={24} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <>
            <View style={styles.photoContainer}>
          {currentItem?.photoUri ? (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoText}>Photo Preview</Text>
            </View>
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoText}>Result Photo</Text>
            </View>
          )}
        </View>
        
        <View style={styles.resultContainer}>
          <View style={styles.heightSection}>
            <View style={styles.heightInfo}>
              <Text style={styles.heightLabel}>Barefoot Height</Text>
              <Text style={styles.heightValue}>{height}</Text>
            </View>
            <AccuracyBadge accuracy={accuracy as "High" | "Moderate" | "Low"} />
          </View>
          
          <View style={styles.analysisSection}>
            <Text style={styles.analysisTitle}>Analysis</Text>
            <Text style={styles.analysisText}>
              {showFullAnalysis ? fullAnalysis : shortAnalysis}
            </Text>
            <TouchableOpacity onPress={() => {
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
              setShowFullAnalysis(!showFullAnalysis);
            }}>
              <Text style={styles.readMoreText}>
                {showFullAnalysis ? "Show less" : "Read more"}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackTitle}>Was this helpful?</Text>
            <View style={styles.feedbackButtons}>
              <TouchableOpacity 
                style={[styles.feedbackButton, feedback === "up" && styles.feedbackButtonActive]}
                onPress={() => handleFeedback("up")}
              >
                <ThumbsUp color={feedback === "up" ? "#ffffff" : "#666666"} size={20} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.feedbackButton, feedback === "down" && styles.feedbackButtonActive]}
                onPress={() => handleFeedback("down")}
              >
                <ThumbsDown color={feedback === "down" ? "#ffffff" : "#666666"} size={20} />
              </TouchableOpacity>
            </View>
          </View>
            </View>
          </>
        )}
      </ScrollView>
      
      <MenuModal />
      
      {currentItem && currentItem.heightCm && (
        <ShareModal
          visible={showShareModal}
          onClose={() => setShowShareModal(false)}
          name={currentItem.name}
          heightCm={currentItem.heightCm}
          photoUri={currentItem.photoUri}
          unit="ft"
        />
      )}
      
      <View style={[styles.bottomButtons, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => {
            if (Platform.OS !== 'web') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
            router.push("/info-chat");
          }}
        >
          <Text style={styles.addButtonText}>Add Info</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Share color="#ffffff" size={20} />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    fontFamily: FONT_FAMILIES.medium,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    fontFamily: FONT_FAMILIES.medium,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingVertical: 2,
    minWidth: 80,
  },
  editButton: {
    padding: 4,
  },
  titleTouchable: {
    // No additional styling needed, just makes the title touchable
  },
  spacer: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  photoContainer: {
    padding: 24,
    paddingBottom: 16,
  },
  photoPlaceholder: {
    width: "100%",
    aspectRatio: 3/4,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
    fontFamily: FONT_FAMILIES.medium,
  },
  resultContainer: {
    padding: 24,
  },
  heightSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  heightInfo: {
    flex: 1,
  },
  heightLabel: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 8,
    fontFamily: FONT_FAMILIES.medium,
  },
  heightValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: FONT_FAMILIES.medium,
  },
  analysisSection: {
    marginBottom: 32,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 12,
    fontFamily: FONT_FAMILIES.medium,
  },
  analysisText: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
    marginBottom: 8,
    fontFamily: FONT_FAMILIES.medium,
  },
  readMoreText: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
    fontFamily: FONT_FAMILIES.medium,
  },
  feedbackSection: {
    alignItems: "center",
  },
  feedbackTitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 16,
    fontFamily: FONT_FAMILIES.medium,
  },
  feedbackButtons: {
    flexDirection: "row",
    gap: 16,
  },
  feedbackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackButtonActive: {
    backgroundColor: "#000000",
  },
  bottomButtons: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 0,
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  addButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#000000",
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    fontFamily: FONT_FAMILIES.medium,
  },
  shareButton: {
    flex: 1,
    backgroundColor: "#000000",
    paddingVertical: 16,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: FONT_FAMILIES.medium,
  },
  menuButton: {
    padding: 4,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 100,
    paddingRight: 24,
  },
  menuContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 120,
  },
  menuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#ff3b30",
    fontWeight: "500",
    fontFamily: FONT_FAMILIES.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  loadingText: {
    fontSize: 16,
    color: "#666666",
    fontFamily: FONT_FAMILIES.medium,
  },
});