import { init } from '@instantdb/react-native';

const APP_ID = process.env.EXPO_PUBLIC_INSTANT_APP_ID;

if (!APP_ID) {
  throw new Error('EXPO_PUBLIC_INSTANT_APP_ID is not set in environment variables');
}

export const db = init({ appId: APP_ID });

export type Schema = {
  heights: {
    id: string;
    name: string;
    photoUri: string | null;
    heightCm: number;
    accuracy: "High" | "Moderate" | "Low";
    date: string;
    explanation: string;
    createdAt: number;
  };
};