import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: { Creator: true },
      orderBy: { created_at: "desc" },
    });
  }),

  getbyId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findFirstOrThrow({
        where: { id: input.id },
        include: { Creator: true, Tags: { include: { Tag: true } } },
      });
    }),

  getPopular: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      orderBy: { view_count: "desc" },
      take: 3,
    });
  }),
});
