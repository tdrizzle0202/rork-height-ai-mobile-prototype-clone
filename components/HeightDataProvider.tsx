import { useCallback, useMemo } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import { db } from '@/lib/instant';
import { tx, id } from '@instantdb/react-native';

export type HeightDataItem = {
  id: string;
  name: string;
  photoUri: string | null;
  heightCm: number;
  accuracy: "High" | "Moderate" | "Low";
  date: string;
  explanation: string;
};

export const [HeightDataProvider, useHeightData] = createContextHook(() => {
  const { data, isLoading, error } = db.useQuery({ heights: {} });

  const deleteHeightData = useCallback((itemId: string) => {
    db.transact(tx.heights[itemId].delete());
  }, []);

  const getHeightDataById = useCallback((id: string) => {
    const heights = Object.values(data?.heights || {});
    return heights.find((item: any) => item.id === id) as HeightDataItem | undefined;
  }, [data]);

  const updateHeightDataName = useCallback((itemId: string, name: string) => {
    db.transact(tx.heights[itemId].update({ name }));
  }, []);

  const addHeightData = useCallback((item: Omit<HeightDataItem, 'id'>) => {
    const newId = id();
    db.transact(tx.heights[newId].update({
      ...item,
      id: newId,
      createdAt: Date.now()
    }));
    return newId;
  }, []);

  return useMemo(() => ({
    heightData: Object.values(data?.heights || {}) as HeightDataItem[],
    isLoading,
    error,
    deleteHeightData,
    getHeightDataById,
    updateHeightDataName,
    addHeightData,
  }), [data, isLoading, error, deleteHeightData, getHeightDataById, updateHeightDataName, addHeightData]);
});