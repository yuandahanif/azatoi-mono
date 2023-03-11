import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { postRouter } from "./routers/post";
import { tagRouter } from "./routers/tag";
import { linkRouter } from "./routers/link";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  post: postRouter,
  tag: tagRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
