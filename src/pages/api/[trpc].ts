import type { NextApiRequest, NextApiResponse } from 'next'
import { createOpenApiNextHandler } from 'trpc-openapi'
import { createTRPCContext, createTRPCRouter } from '~/server/api/trpc'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Handle incoming OpenAPI requests
  console.log('TRPC HANDLER')
  const openRouter = createTRPCRouter({})
  return createOpenApiNextHandler({
    router: openRouter,
    createContext: createTRPCContext,
    onError: (opts: { path: string; error: { message: string } }) => {
      console.error(
        `❌ tRPC failed on ${opts.path ?? '<no-path>'}: ${opts.error.message}`,
      )
    },
    responseMeta: undefined,
  })(req, res)
}

export default handler
