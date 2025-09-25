import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronRight } from "lucide-react-native";
import { FONT_FAMILIES } from "@/constants/typography";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const settingsItems = [
    { id: "terms", title: "Terms and Conditions", subtitle: "Terms of service" },
    { id: "privacy", title: "Privacy", subtitle: "Privacy settings" },
    { id: "help", title: "Help & Support", subtitle: "Get help" },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.headerTitle}>Settings</Text>
        
        <View style={styles.settingsContainer}>
          {settingsItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.settingItem}>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              </View>
              <ChevronRight color="#999999" size={20} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: FONT_FAMILIES.medium,
    marginBottom: 32,
  },
  settingsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
    fontFamily: FONT_FAMILIES.medium,
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#666666",
    fontFamily: FONT_FAMILIES.medium,
  },
});