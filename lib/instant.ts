import { init } from '@instantdb/react-native';

const APP_ID = process.env.EXPO_PUBLIC_INSTANT_APP_ID;

if (!APP_ID) {
  throw new Error('EXPO_PUBLIC_INSTANT_APP_ID is not set in environment variables');
}

export const db = init({ appId: APP_ID });

export type Schema = {
  // Define your schema here
  // Example:
  // users: {
  //   id: string;
  //   name: string;
  //   email: string;
  //   createdAt: number;
  // };
  // heights: {
  //   id: string;
  //   userId: string;
  //   heightCm: number;
  //   photoUri?: string;
  //   name?: string;
  //   createdAt: number;
  // };
};