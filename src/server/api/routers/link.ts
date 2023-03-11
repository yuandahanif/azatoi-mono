import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const linkRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.link.findMany();
  }),

  getbyId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.link.findFirstOrThrow({
        where: { id: input.id },
      });
    }),
});
