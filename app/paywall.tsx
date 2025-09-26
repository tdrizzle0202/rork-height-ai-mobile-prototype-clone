import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { FONT_FAMILIES } from "@/constants/typography";

export default function PaywallScreen() {
  const handleContinue = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.headline}>3 Days Free Trial</Text>
          <Text style={styles.subline}>Then $10/week. Cancel anytime.</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
        
        <Text style={styles.legalNote}>
          By continuing, you agree to our Terms of Service and Privacy Policy. 
          Subscription automatically renews unless cancelled.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  headline: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: FONT_FAMILIES.medium,
  },
  subline: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: FONT_FAMILIES.medium,
  },
  continueButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 24,
    minWidth: 200,
    marginBottom: 32,
  },
  continueText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: FONT_FAMILIES.medium,
  },
  legalNote: {
    fontSize: 12,
    color: "#999999",
    textAlign: "center",
    lineHeight: 16,
    paddingHorizontal: 16,
    fontFamily: FONT_FAMILIES.medium,
  },
});