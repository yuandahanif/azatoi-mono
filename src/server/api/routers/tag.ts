import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const tagRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany({
      orderBy: { name: "asc" },
    });
  }),

  getAllWithCount: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { Posts: true } } },
    });
  }),

  getPostsByTagId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.tag.findFirstOrThrow({
        where: { Posts: { every: { post_id: { equals: input.id } } } },
      });
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tag.create({
        data: { name: input.name },
      });
    }),
});
