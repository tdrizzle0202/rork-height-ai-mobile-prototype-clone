import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
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
  useEffect(() => {
    if (Platform.OS === 'web') {
      // Load Google Font CSS for web
      const link = document.createElement('link');
      link.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ExpoSplashScreen.hideAsync();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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

