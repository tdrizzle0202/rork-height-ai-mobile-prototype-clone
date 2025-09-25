import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FONT_FAMILY } from "@/constants/typography";

export default function SplashScreen() {
  const insets = useSafeAreaInsets();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/landing");
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Height AI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: FONT_FAMILY,
  },
});