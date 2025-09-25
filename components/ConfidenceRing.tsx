import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ConfidenceRingProps {
  confidence: number;
  size: number;
}

export function ConfidenceRing({ confidence, size }: ConfidenceRingProps) {
  const getColor = (confidence: number) => {
    if (confidence < 40) return "#ef4444"; // red
    if (confidence < 75) return "#f59e0b"; // amber
    return "#10b981"; // green
  };

  const color = getColor(confidence);
  const borderWidth = 3;

  return (
    <View 
      style={[
        styles.ring, 
        { 
          width: size, 
          height: size, 
          borderRadius: size / 2,
          borderColor: color,
          borderWidth,
        }
      ]}
    >
      <Text style={[styles.percentage, { fontSize: size * 0.2 }]}>
        {confidence}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  percentage: {
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "System",
  },
});