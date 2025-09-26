import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image, Platform } from 'react-native';
import { X, Share, Download } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { FONT_FAMILIES } from '@/constants/typography';

type ShareModalProps = {
  visible: boolean;
  onClose: () => void;
  name: string;
  heightCm: number;
  photoUri: string | null;
  unit: 'ft' | 'cm';
};

export const ShareModal = ({ visible, onClose, name, heightCm, photoUri, unit }: ShareModalProps) => {
  const viewShotRef = useRef<ViewShot>(null);

  const formatHeight = (heightCm: number) => {
    if (unit === 'cm') {
      return `${heightCm} cm`;
    }
    const totalInches = heightCm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}′${inches}″`;
  };

  const displayName = name && name.trim() !== '' && name !== 'Name' 
    ? name 
    : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const getAge = () => {
    return Math.floor(Math.random() * 10) + 20; // Random age between 20-29 for demo
  };

  const handleShare = async () => {
    try {
      if (!viewShotRef.current?.capture) return;
      
      const uri = await viewShotRef.current.capture();

      if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.href = uri;
        link.download = `height-result-${displayName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(uri, {
            mimeType: 'image/png',
            dialogTitle: 'Share Height Result',
          });
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (Platform.OS === 'web') {
        console.log('Save to camera roll is not available on web');
        return;
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission needed to save to camera roll');
        return;
      }

      if (!viewShotRef.current?.capture) return;
      
      const uri = await viewShotRef.current.capture();

      await MediaLibrary.saveToLibraryAsync(uri);
      console.log('Image saved to camera roll');
    } catch (error) {
      console.error('Error saving:', error);
    }
  };



  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X color="#000000" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Share Result</Text>
          <View style={styles.spacer} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.previewContainer}>
            <View style={styles.cardWrapper}>
              <ViewShot ref={viewShotRef} style={styles.shareCard}>
                <View style={styles.card}>
                  {photoUri ? (
                    <Image 
                      source={{ uri: photoUri.replace('w=150&h=150&fit=crop&crop=face', 'w=1080&h=1350&fit=crop') }} 
                      style={styles.photo} 
                      resizeMode="cover" 
                    />
                  ) : (
                    <View style={styles.photoPlaceholder}>
                      <Text style={styles.placeholderText}>Photo</Text>
                    </View>
                  )}
                  
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.gradient}
                  >
                    <View style={styles.textContainer}>
                      <View style={styles.leftText}>
                        <Text style={styles.nameAge} numberOfLines={1} ellipsizeMode="tail">
                          {displayName} {getAge()}
                        </Text>
                        <Text style={styles.heightText}>
                          {formatHeight(heightCm)}
                        </Text>
                      </View>
                      <Text style={styles.watermark}>HeightAI</Text>
                    </View>
                  </LinearGradient>
                </View>
              </ViewShot>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={async () => { await handleSave(); onClose(); }}>
            <Download color="#000000" size={20} />
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton} onPress={async () => { await handleShare(); onClose(); }}>
            <Share color="#ffffff" size={20} />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    fontFamily: FONT_FAMILIES.medium,
  },
  spacer: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  previewContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  cardWrapper: {
    width: 270,
    height: 337.5,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 0.25 }],
  },
  bottomButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  saveButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#000000',
    paddingVertical: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: FONT_FAMILIES.medium,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: FONT_FAMILIES.medium,
  },
  shareCard: {
    width: 1080,
    height: 1350,
    backgroundColor: '#ffffff',
  },
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    color: '#999999',
    fontWeight: '500',
    fontFamily: FONT_FAMILIES.medium,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    justifyContent: 'flex-end',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  leftText: {
    flex: 1,
  },
  nameAge: {
    fontSize: 48,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: FONT_FAMILIES.heavy,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heightText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#ffffff',
    fontFamily: FONT_FAMILIES.regular,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  watermark: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: FONT_FAMILIES.medium,
    opacity: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});