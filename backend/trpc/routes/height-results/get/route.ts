import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";

export const getHeightResultsProcedure = publicProcedure
  .input(z.object({
    limit: z.number().optional().default(10),
    offset: z.number().optional().default(0),
  }))
  .query(async ({ input, ctx }) => {
    const { data, error } = await ctx.supabase
      .from('height_results')
      .select('*')
      .order('created_at', { ascending: false })
      .range(input.offset, input.offset + input.limit - 1);

    if (error) {
      throw new Error(`Failed to fetch height results: ${error.message}`);
    }

    return data || [];
  });