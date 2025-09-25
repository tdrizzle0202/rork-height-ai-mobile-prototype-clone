import { Tabs, router } from "expo-router";
import { Home, Settings, Plus, Camera, Upload } from "lucide-react-native";
import React, { useState } from "react";
import { View, TouchableOpacity, Text, Modal, StyleSheet, Alert, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';

function AddSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Camera permission is required to take photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onClose();
        router.push(`/preview?imageUri=${encodeURIComponent(result.assets[0].uri)}`);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const handleUploadPhoto = async () => {
    try {
      if (Platform.OS === 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Media library permission is required to upload photos.');
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onClose();
        router.push(`/preview?imageUri=${encodeURIComponent(result.assets[0].uri)}`);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      Alert.alert('Error', 'Failed to upload photo. Please try again.');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.sheetContainer} 
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity 
          style={styles.sheet}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.optionsGrid}>
            <TouchableOpacity style={styles.optionBox} onPress={handleTakePhoto}>
              <Camera color="#111827" size={32} />
              <Text style={styles.optionText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionBox} onPress={handleUploadPhoto}>
              <Upload color="#111827" size={32} />
              <Text style={styles.optionText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

export default function TabLayout() {
  const [showAddSheet, setShowAddSheet] = useState(false);

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#111827",
          tabBarInactiveTintColor: "#9CA3AF",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 1,
            borderTopColor: "#f0f0f0",
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "500",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Home color={color} size={26} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <Settings color={color} size={24} />,
          }}
        />
      </Tabs>
      
      {/* Floating Add Button - positioned to not interfere with tabs */}
      <View style={[styles.fabContainer, styles.fabPosition]} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setShowAddSheet(true)}
          accessibilityRole="button"
          accessibilityLabel="Add photo"
          activeOpacity={0.8}
        >
          <Plus color="#ffffff" size={24} />
        </TouchableOpacity>
      </View>
      
      <AddSheet visible={showAddSheet} onClose={() => setShowAddSheet(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 999,
  },
  fabPosition: {
    bottom: 36,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  sheetContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 120,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    backgroundColor: "transparent",
  },
  optionsGrid: {
    flexDirection: "row",
    gap: 16,
  },
  optionBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginTop: 12,
    textAlign: "center",
  },
});