import { supabase } from './supabase';
import * as Crypto from 'expo-crypto';
import * as Device from 'expo-device';

function getDeviceId(): string {
  return Device.osInternalBuildId || Device.modelId || 'unknown-device';
}

export async function uploadPhoto(localUri: string): Promise<string> {
  if (!localUri?.trim()) throw new Error('Local URI is required');
  
  const deviceId = getDeviceId();
  const uuid = Crypto.randomUUID();
  const fileName = `${uuid}.jpg`;
  const filePath = `${deviceId}/${fileName}`;

  const response = await fetch(localUri);
  const blob = await response.blob();

  const { error } = await supabase.storage
    .from('photos')
    .upload(filePath, blob, {
      contentType: 'image/jpeg',
      upsert: false,
    });

  if (error) throw new Error(`Failed to upload photo: ${error.message}`);
  return filePath;
}

export async function getPhotoUrl(path: string, expiresIn: number = 3600): Promise<string> {
  if (!path?.trim()) throw new Error('Photo path is required');
  
  try {
    const { data, error } = await supabase.storage
      .from('photos')
      .createSignedUrl(path, expiresIn);

    if (error) {
      console.error('Supabase storage error:', error);
      throw new Error(`Failed to get photo URL: ${error.message}`);
    }
    return data.signedUrl;
  } catch (error) {
    console.error('Error getting photo URL:', error);
    throw error;
  }
}

export async function deletePhoto(path: string): Promise<void> {
  if (!path?.trim()) {
    console.warn('No photo path provided for deletion');
    return;
  }
  
  const { error } = await supabase.storage
    .from('photos')
    .remove([path]);

  if (error) {
    console.warn(`Failed to delete photo ${path}: ${error.message}`);
  }
}