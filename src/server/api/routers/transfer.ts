import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const transferRouter = createTRPCRouter({
  ethMainnetToBaseQuote: publicProcedure
    .input(z.object({
      amountWei: z.bigint(),
      from: z.string(),
      to: z.string(),
    }))
    .query(({ input }) => {
      return {
        
      };
    }),
});
