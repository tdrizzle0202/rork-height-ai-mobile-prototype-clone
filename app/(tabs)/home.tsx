import { router, useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

import { listResults } from "@/lib/heightStore";
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

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [unit, setUnit] = useState<"ft" | "cm">("ft");
  const [heightData, setHeightData] = useState<HeightDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadResults = useCallback(async () => {
    try {
      setLoading(true);
      const results = await listResults();
      setHeightData(results);
    } catch (error) {
      console.error('Failed to load results:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadResults();
    }, [loadResults])
  );

  const toggleUnit = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setUnit(unit === "ft" ? "cm" : "ft");
  };

  const formatHeight = (heightCm: number) => {
    if (unit === "cm") {
      return `${heightCm} cm`;
    }
    const totalInches = heightCm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}′${inches}″`;
  };

  const handleCardPress = (itemId: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push(`/result?id=${itemId}`);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 14) return "1 week ago";
    return date.toLocaleDateString();
  };



  const renderHeightCard = (item: HeightDataItem) => {
    const isPending = !item.heightCm;
    
    return (
      <TouchableOpacity 
        key={item.id} 
        style={[styles.card, isPending && styles.pendingCard]} 
        onPress={() => !isPending && handleCardPress(item.id)}
        disabled={isPending}
      >
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoText}>Photo</Text>
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
        </View>
        
        <View style={styles.rightColumn}>
          {isPending ? (
            <View style={styles.analyzingContainer}>
              <ActivityIndicator size="small" color="#666666" style={styles.spinner} />
              <Text style={styles.analyzingText}>Analyzing...</Text>
            </View>
          ) : (
            <>
              <Text style={styles.heightText}>{formatHeight(item.heightCm!)}</Text>
              <Text style={styles.dateText}>{formatDate(item.date)}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };



  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Height AI</Text>
          <TouchableOpacity style={styles.unitToggle} onPress={toggleUnit}>
            <Text style={styles.unitText}>{unit === "ft" ? "ft/in" : "cm"}</Text>
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          heightData.map(renderHeightCard)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000000",
    fontFamily: FONT_FAMILIES.heavy,
  },
  unitToggle: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  unitText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
    fontFamily: FONT_FAMILIES.semibold,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    minHeight: 88,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  photoPlaceholder: {
    width: 88,
    height: 88,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  photoText: {
    fontSize: 12,
    color: "#999999",
    fontWeight: "500",
    fontFamily: FONT_FAMILIES.medium,
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 4,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000000",
    fontFamily: FONT_FAMILIES.semibold,
  },
  rightColumn: {
    alignItems: "flex-end",
    justifyContent: "center",
    minHeight: 88,
  },
  heightText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
    fontFamily: FONT_FAMILIES.bold,
    textAlign: "right",
  },
  dateText: {
    fontSize: 12,
    color: "#999999",
    fontFamily: FONT_FAMILIES.regular,
    textAlign: "right",
  },
  loadingText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginTop: 40,
    fontFamily: FONT_FAMILIES.medium,
  },
  pendingCard: {
    opacity: 0.7,
  },
  analyzingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  spinner: {
    marginRight: 8,
  },
  analyzingText: {
    fontSize: 14,
    color: "#666666",
    fontFamily: FONT_FAMILIES.medium,
    textAlign: "right",
  },
});