import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tagRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany();
  }),

  getAllWithCount: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany({
      include: { _count: { select: { Posts: true } } },
    });
  }),

  getbyId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.tag.findFirstOrThrow({
        where: { Posts: { every: { post_id: { equals: input.id } } } },
      });
    }),
});
