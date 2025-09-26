import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONT_FAMILIES } from "@/constants/typography";

type AccuracyTier = "High" | "Moderate" | "Low";

interface AccuracyBadgeProps {
  accuracy: AccuracyTier;
}

export function AccuracyBadge({ accuracy }: AccuracyBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: "#10b981" }]}>
      <Text style={styles.text}>High Accuracy</Text>
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