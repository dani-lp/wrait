import { createTRPCRouter } from "./trpc";
import { cohereRouter } from "./routers/cohere";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  cohere: cohereRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
