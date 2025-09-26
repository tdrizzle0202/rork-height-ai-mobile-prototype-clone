import { useCallback, useMemo } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import { db } from '@/lib/instant';

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

  const deleteHeightData = useCallback((id: string) => {
    db.transact(db.tx.heights[id].delete());
  }, []);

  const getHeightDataById = useCallback((id: string) => {
    const heights = Object.values(data?.heights || {});
    return heights.find((item: any) => item.id === id) as HeightDataItem | undefined;
  }, [data]);

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
    heightData: Object.values(data?.heights || {}) as HeightDataItem[],
    isLoading,
    error,
    deleteHeightData,
    getHeightDataById,
    updateHeightDataName,
    addHeightData,
  }), [data, isLoading, error, deleteHeightData, getHeightDataById, updateHeightDataName, addHeightData]);
});