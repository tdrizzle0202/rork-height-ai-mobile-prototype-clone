import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";

import React, { useEffect, useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HeightDataProvider } from "@/components/HeightDataProvider";
import { trpc, trpcClient } from "@/lib/trpc";

ExpoSplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
const rootLayoutStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="paywall" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="preview" options={{ headerShown: false }} />
      <Stack.Screen name="info-chat" options={{ headerShown: false }} />
      <Stack.Screen name="result" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    async function loadFonts() {
      try {
        if (Platform.OS === 'web') {
          // Load Google Font CSS for web
          const link = document.createElement('link');
          link.href = 'https://fonts.googleapis.com/css2?family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap';
          link.rel = 'stylesheet';
          document.head.appendChild(link);
          
          // Wait a bit for the font to load
          timeoutId = setTimeout(() => setFontsLoaded(true), 100);
        } else {
          // For native platforms, we'll use the system font with custom styling
          // since loading custom fonts requires local font files
          setFontsLoaded(true);
        }
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Continue with system font as fallback
      }
    }

    loadFonts();
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        ExpoSplashScreen.hideAsync();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Keep splash screen visible while fonts load
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HeightDataProvider>
          <GestureHandlerRootView style={rootLayoutStyles.container}>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </HeightDataProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

