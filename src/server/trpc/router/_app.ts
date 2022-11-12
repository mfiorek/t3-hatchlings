import { router } from "../trpc";
import { hatchlingRouter } from "./hatchling";

export const appRouter = router({
  hatchling: hatchlingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
