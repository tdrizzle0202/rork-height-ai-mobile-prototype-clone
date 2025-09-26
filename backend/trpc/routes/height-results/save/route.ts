import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";

export const saveHeightResultProcedure = publicProcedure
  .input(z.object({
    name: z.string(),
    heightCm: z.number(),
    confidence: z.number(),
    photoUri: z.string(),
  }))
  .mutation(async ({ input, ctx }) => {
    const { data, error } = await ctx.supabase
      .from('height_results')
      .insert({
        name: input.name,
        height_cm: input.heightCm,
        confidence: input.confidence,
        photo_uri: input.photoUri,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to save height result: ${error.message}`);
    }

    return data;
  });