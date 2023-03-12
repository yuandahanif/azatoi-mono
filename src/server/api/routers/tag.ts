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
    .input(
      z.object({
        id: z.string(),
        take: z.number().optional().default(12),
        skip: z.number().optional().default(0),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findMany({
        where: { Tags: { some: { tag_id: { equals: input.id } } } },
        include: { Creator: true },
        orderBy: { created_at: "desc" },
        take: input.take,
        skip: input.skip,
      });
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.tag.findFirstOrThrow({
        where: { id: input.id },
      });
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tag.create({
        data: { name: input.name },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.tag.delete({ where: { id: input.id } });
    }),
});
