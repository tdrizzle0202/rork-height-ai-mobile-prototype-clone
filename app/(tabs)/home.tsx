import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

import { useHeightData, HeightDataItem } from "@/components/HeightDataProvider";
import { FONT_FAMILIES } from "@/constants/typography";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [unit, setUnit] = useState<"ft" | "cm">("ft");
  const { heightData } = useHeightData();

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



  const renderHeightCard = (item: HeightDataItem) => (
    <TouchableOpacity key={item.id} style={styles.card} onPress={() => handleCardPress(item.id)}>
      <View style={styles.photoPlaceholder}>
        <Text style={styles.photoText}>Photo</Text>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
      </View>
      
      <View style={styles.rightColumn}>
        <Text style={styles.heightText}>{formatHeight(item.heightCm)}</Text>
        <Text style={styles.dateText}>{formatDate(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );



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
        
        {heightData.map(renderHeightCard)}
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
    fontWeight: "bold",
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
    fontFamily: FONT_FAMILIES.heavy,
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
    fontFamily: FONT_FAMILIES.heavy,
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
    fontFamily: FONT_FAMILIES.heavy,
  },
  rightColumn: {
    alignItems: "flex-end",
    justifyContent: "center",
    minHeight: 88,
  },
  heightText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
    fontFamily: FONT_FAMILIES.heavy,
    textAlign: "right",
  },
  dateText: {
    fontSize: 12,
    color: "#999999",
    fontFamily: FONT_FAMILIES.heavy,
    textAlign: "right",
  },

});