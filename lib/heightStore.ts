import { supabase } from './supabase';

type HeightResult = {
  id: string;
  name: string;
  photoUri: string | null;
  heightCm: number | null;
  accuracy: string;
  explanation: string | null;
  method: string | null;
  date: string;
};

type DatabaseRow = {
  id: string;
  name: string;
  photo_uri: string | null;
  height_cm: number | null;
  accuracy: string;
  explanation: string | null;
  method: string | null;
  date: string;
};

export async function listResults(): Promise<HeightResult[]> {
  const { data, error } = await supabase
    .from('height_results')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw new Error(`Failed to fetch results: ${error.message}`);
  if (!data) return [];

  return data.map((row: DatabaseRow) => ({
    id: row.id,
    name: row.name,
    photoUri: row.photo_uri,
    heightCm: row.height_cm,
    accuracy: row.accuracy,
    explanation: row.explanation,
    method: row.method,
    date: row.date,
  }));
}

export async function insertPlaceholder({ name, photoUri }: { name: string; photoUri?: string }): Promise<string> {
  const { data, error } = await supabase
    .from('height_results')
    .insert({
      name,
      photo_uri: photoUri ?? null,
      height_cm: null,
      accuracy: 'Low',
      explanation: null,
      method: null,
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to insert placeholder: ${error.message}`);
  return data.id;
}

export async function patchResult(id: string, patch: {
  heightCm?: number;
  accuracy?: string;
  explanation?: string;
  method?: string;
}): Promise<void> {
  const updateData: any = {};
  
  if (patch.heightCm !== undefined) updateData.height_cm = patch.heightCm;
  if (patch.accuracy !== undefined) updateData.accuracy = patch.accuracy;
  if (patch.explanation !== undefined) updateData.explanation = patch.explanation;
  if (patch.method !== undefined) updateData.method = patch.method;

  const { error } = await supabase
    .from('height_results')
    .update(updateData)
    .eq('id', id);

  if (error) throw new Error(`Failed to update result: ${error.message}`);
}

export async function updateName(id: string, name: string): Promise<void> {
  const { error } = await supabase
    .from('height_results')
    .update({ name })
    .eq('id', id);

  if (error) throw new Error(`Failed to update name: ${error.message}`);
}

export async function deleteResult(id: string): Promise<void> {
  const { error } = await supabase
    .from('height_results')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`Failed to delete result: ${error.message}`);
}