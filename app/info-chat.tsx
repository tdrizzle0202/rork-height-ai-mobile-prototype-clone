import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Send } from "lucide-react-native";

export default function InfoChatScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri?: string }>();
  const [message, setMessage] = useState("");
  
  const suggestions = [
    "What's their age?",
    "Are they wearing shoes?",
    "What's their gender?",
    "Any other details?",
  ];

  const handleSend = () => {
    if (message.trim()) {
      // TODO: Call API with image and additional info
      console.log('Processing with additional info:', message);
      console.log('Image URI:', imageUri ? decodeURIComponent(imageUri) : null);
      router.push('/(tabs)/home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color="#000000" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Additional Info</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.instruction}>
          Help us improve accuracy by providing additional information about the person in the photo.
        </Text>
        
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.suggestionChip}
              onPress={() => setMessage(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type additional information..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, { opacity: message.trim() ? 1 : 0.5 }]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Send color="#ffffff" size={20} />
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
    fontFamily: "System",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  instruction: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 24,
    marginBottom: 32,
    fontFamily: "System",
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  suggestionChip: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  suggestionText: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
    fontFamily: "System",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    fontFamily: "System",
  },
  sendButton: {
    backgroundColor: "#000000",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  headerSpacer: {
    width: 24,
  },
});