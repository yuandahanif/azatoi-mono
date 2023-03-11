import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ count: z.number().optional() }).optional())
    .query(({ ctx, input }) => {
      const query = ctx.prisma.post.findMany({
        include: { Creator: true },
        orderBy: { created_at: "desc" },
        take: input?.count,
      });

      return query;
    }),

  getbyId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.post.findFirstOrThrow({
        where: { id: input.id },
        include: {
          Creator: true,
          Tags: { include: { Tag: true } },
          Links: true,
        },
      });
    }),

  getPopular: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      orderBy: { view_count: "desc" },
      take: 3,
    });
  }),

  addViewCount: publicProcedure
    .input(
      z.object({
        id: z.string(),
        amount: z.number().default(1),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.update({
        where: { id: input.id },
        data: { view_count: { increment: input.amount } },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        thumbnail: z.string(),
        categories: z.array(z.string()),
        links: z.array(z.object({ label: z.string(), link: z.string() })),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const links: { link: string; name: string }[] = [];
        input.links.forEach((l) => links.push({ link: l.link, name: l.label }));

        const post = await ctx.prisma.post.create({
          data: {
            content: input.description,
            thumbnail: input.thumbnail,
            title: input.title,
            Creator: { connect: { id: ctx.session.user.id } },
            Links: { createMany: { data: links } },
          },
          select: { id: true },
        });

        const tags = input.categories.map((c) => ({
          post_id: post.id,
          tag_id: c,
        }));

        return await ctx.prisma.postsOnTags.createMany({
          data: tags,
          skipDuplicates: true,
        });
      } catch (error) {}
    }),
});
