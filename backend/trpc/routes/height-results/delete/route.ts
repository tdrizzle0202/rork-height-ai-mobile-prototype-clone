import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";

export const deleteHeightResultProcedure = publicProcedure
  .input(z.object({
    id: z.string(),
  }))
  .mutation(async ({ input, ctx }) => {
    const { error } = await ctx.supabase
      .from('height_results')
      .delete()
      .eq('id', input.id);

    if (error) {
      throw new Error(`Failed to delete height result: ${error.message}`);
    }

    return { success: true };
  });