import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useHeightData } from "@/components/HeightDataProvider";
import { FONT_FAMILIES } from "@/constants/typography";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [unit, setUnit] = useState<"ft" | "cm">("ft");
  const { heightData } = useHeightData();

  const toggleUnit = () => {
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
    router.push(`/result?id=${itemId}`);
  };

  const renderHeightCard = (item: typeof heightData[0]) => (
    <TouchableOpacity key={item.id} style={styles.card} onPress={() => handleCardPress(item.id)}>
      <View style={styles.photoPlaceholder}>
        <Text style={styles.photoText}>Photo</Text>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.heightText}>{formatHeight(item.heightCm)}</Text>
        <Text style={styles.dateText}>{item.name}</Text>
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  photoPlaceholder: {
    width: 72,
    height: 72,
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
  },
  heightText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
    fontFamily: FONT_FAMILIES.heavy,
  },
  dateText: {
    fontSize: 14,
    color: "#666666",
    fontFamily: FONT_FAMILIES.heavy,
  },

});