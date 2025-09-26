import { useState, useCallback, useMemo } from 'react';
import createContextHook from '@nkzw/create-context-hook';
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
  const [heightData, setHeightData] = useState<HeightDataItem[]>(initialHeightData);

  const deleteHeightData = useCallback((id: string) => {
    setHeightData(prev => prev.filter(item => item.id !== id));
  }, []);

  const getHeightDataById = useCallback((id: string) => {
    return heightData.find(item => item.id === id);
  }, [heightData]);

  const updateHeightDataName = useCallback((id: string, name: string) => {
    setHeightData(prev => prev.map(item => 
      item.id === id ? { ...item, name } : item
    ));
  }, []);

  return useMemo(() => ({
    heightData,
    deleteHeightData,
    getHeightDataById,
    updateHeightDataName,
  }), [heightData, deleteHeightData, getHeightDataById, updateHeightDataName]);
});