import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { Image } from "expo-image";
import { FONT_FAMILIES } from "@/constants/typography";

export default function PreviewScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri?: string }>();
  const decodedImageUri = imageUri ? decodeURIComponent(imageUri) : null;

  const handleAdd = () => {
    router.push(`/info-chat${imageUri ? `?imageUri=${imageUri}` : ''}`);
  };

  const handleDone = () => {
    // TODO: Call API and create new result card
    console.log('Processing image:', decodedImageUri);
    router.push('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color="#000000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.photoContainer}>
          {decodedImageUri ? (
            <Image
              source={{ uri: decodedImageUri }}
              style={styles.photo}
              contentFit="cover"
            />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.photoText}>Photo Preview</Text>
            </View>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add Info</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    fontFamily: FONT_FAMILIES.medium,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  photoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  photo: {
    width: "100%",
    aspectRatio: 3/4,
    borderRadius: 16,
  },
  photoPlaceholder: {
    width: "100%",
    aspectRatio: 3/4,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
    fontFamily: FONT_FAMILIES.medium,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },
  addButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#000000",
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    fontFamily: FONT_FAMILIES.medium,
  },
  doneButton: {
    flex: 1,
    backgroundColor: "#000000",
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: "center",
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: FONT_FAMILIES.medium,
  },
  headerSpacer: {
    width: 24,
  },
});