import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import { saveHeightResultProcedure } from "./routes/height-results/save/route";
import { getHeightResultsProcedure } from "./routes/height-results/get/route";
import { deleteHeightResultProcedure } from "./routes/height-results/delete/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  heightResults: createTRPCRouter({
    save: saveHeightResultProcedure,
    get: getHeightResultsProcedure,
    delete: deleteHeightResultProcedure,
  }),
});

export type AppRouter = typeof appRouter;