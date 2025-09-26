import { trpc } from '@/lib/trpc';

export type HeightResult = {
  id: string;
  name: string;
  height_cm: number;
  confidence: number;
  photo_uri: string;
  created_at: string;
  updated_at: string;
};

export type SaveHeightResultInput = {
  name: string;
  heightCm: number;
  confidence: number;
  photoUri: string;
};

export function useHeightResults(limit = 10, offset = 0) {
  return trpc.heightResults.get.useQuery({ limit, offset });
}

export function useSaveHeightResult() {
  const utils = trpc.useUtils();
  
  return trpc.heightResults.save.useMutation({
    onSuccess: () => {
      // Invalidate and refetch height results after saving
      utils.heightResults.get.invalidate();
    },
  });
}

export function useDeleteHeightResult() {
  const utils = trpc.useUtils();
  
  return trpc.heightResults.delete.useMutation({
    onSuccess: () => {
      // Invalidate and refetch height results after deleting
      utils.heightResults.get.invalidate();
    },
  });
}