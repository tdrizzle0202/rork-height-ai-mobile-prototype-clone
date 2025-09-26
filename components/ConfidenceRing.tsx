import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONT_FAMILIES } from "@/constants/typography";

type AccuracyTier = "High" | "Moderate" | "Low";

interface AccuracyBadgeProps {
  accuracy: AccuracyTier;
}

export function AccuracyBadge({ accuracy }: AccuracyBadgeProps) {
  const getColor = (accuracy: AccuracyTier) => {
    switch (accuracy) {
      case "High":
        return "#10b981"; // green
      case "Moderate":
        return "#f59e0b"; // amber
      case "Low":
        return "#ef4444"; // red
    }
  };

  const color = getColor(accuracy);

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{accuracy} Accuracy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: FONT_FAMILIES.medium,
  },
});