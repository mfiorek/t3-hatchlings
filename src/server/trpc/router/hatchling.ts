import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const hatchlingRouter = router({
  addRandomHatchling: protectedProcedure
    .input(
      z.object({
        hatchlingId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userHatchling.create({
        data: {
          hatchlingId: input.hatchlingId,
          userId: ctx.session.user.id,
        },
      });
    }),
  getHatchlings: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userHatchling.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
