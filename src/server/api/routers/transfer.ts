import { z } from "zod";
import type { GetQuoteParameters } from '@reservoir0x/relay-sdk'
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { zeroAddress } from "viem";

export const transferRouter = createTRPCRouter({
  ethMainnetToBaseQuote: publicProcedure
    .input(z.object({
      amountWei: z.bigint(),
      smartWalletAddress: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const quoteParams = { 
        tradeType: 'EXACT_INPUT',
        amount: input.amountWei.toString(),
        recipient: input.smartWalletAddress,
        chainId: 1,
        toChainId: 8453,
        currency: zeroAddress,
        toCurrency: zeroAddress,
        options: {
          refundTo: '0xE12Cfb1D2e85Dc85dd1D22c6629e105417149726',
          useDepositAddress: true,
        }
      } satisfies GetQuoteParameters
      const quote = await ctx.relayClient.actions.getQuote(quoteParams)
      const requestId = quote.steps[0]?.requestId
      const depositAddress = quote.steps[0]?.depositAddress
      console.log({quote})
      console.log({requestId})
      console.log({depositAddress})
      return {
        quote,
        requestId,
        depositAddress,
      };
    }),
  ethBaseToMainnetQuote: publicProcedure
    .input(z.object({
      amountWei: z.bigint(),
      smartWalletAddress: z.string(),
      toAddress: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const quoteParams = { 
        tradeType: "EXACT_INPUT",
        amount: input.amountWei.toString(),
        recipient: input.toAddress,
        chainId: 8453,
        toChainId: 1,
        currency: zeroAddress,
        toCurrency: zeroAddress,
        options: {
          user: input.smartWalletAddress,
          useDepositAddress: false,
          refundTo: input.smartWalletAddress,
          userOperationGasOverhead: 300000, // hardcoded for now
        }
      } as GetQuoteParameters
      const quote = await ctx.relayClient.actions.getQuote(quoteParams)
      const requestId = quote.steps[0]?.requestId
      console.log({quote})
      console.log({requestId})
      return {
        quote,
        requestId,
      }
    }),
});
