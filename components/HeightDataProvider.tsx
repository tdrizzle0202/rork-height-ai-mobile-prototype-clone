import { useCallback, useMemo, useEffect } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import { db } from '@/lib/instant';
import { heightData as initialHeightData } from '@/mocks/height-data';

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
  const { isLoading, error, data: heightData } = db.useQuery({ heights: {} });
  
  // Initialize with mock data if database is empty
  useEffect(() => {
    if (!isLoading && heightData?.heights && heightData.heights.length === 0) {
      // Add initial data to InstantDB
      initialHeightData.forEach(item => {
        db.transact(db.tx.heights[item.id].update({
          ...item,
          createdAt: Date.now()
        }));
      });
    }
  }, [isLoading, heightData]);

  const deleteHeightData = useCallback((id: string) => {
    db.transact(db.tx.heights[id].delete());
  }, []);

  const getHeightDataById = useCallback((id: string) => {
    return heightData?.heights?.find((item: any) => item.id === id) as HeightDataItem | undefined;
  }, [heightData]);

  const updateHeightDataName = useCallback((id: string, name: string) => {
    db.transact(db.tx.heights[id].update({ name }));
  }, []);

  const addHeightData = useCallback((item: Omit<HeightDataItem, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    db.transact(db.tx.heights[id].update({
      ...item,
      id,
      createdAt: Date.now()
    }));
    return id;
  }, []);

  return useMemo(() => ({
    heightData: (heightData?.heights || []) as HeightDataItem[],
    isLoading,
    error,
    deleteHeightData,
    getHeightDataById,
    updateHeightDataName,
    addHeightData,
  }), [heightData, isLoading, error, deleteHeightData, getHeightDataById, updateHeightDataName, addHeightData]);
});