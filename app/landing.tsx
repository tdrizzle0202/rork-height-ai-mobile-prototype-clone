import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FONT_FAMILIES } from "@/constants/typography";

export default function LandingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.messageContainer}>
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>how tall are you?</Text>
          </View>
        </View>
        
        <View style={styles.videoContainer}>
          <View style={styles.videoPlaceholder}>
            <Text style={styles.videoText}>Demo Video</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.getStartedButton}
          onPress={() => router.push("/paywall")}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
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
  videoContainer: {
    width: "70%",
    aspectRatio: 9/16,
    marginBottom: 48,
  },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  videoText: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
    fontFamily: FONT_FAMILIES.medium,
  },
  messageContainer: {
    marginBottom: 48,
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  messageBubble: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 17,
    fontWeight: "400",
    color: "#ffffff",
    textAlign: "left",
    fontFamily: FONT_FAMILIES.medium,
  },
  getStartedButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 24,
    minWidth: 200,
  },
  getStartedText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: FONT_FAMILIES.medium,
  },
});