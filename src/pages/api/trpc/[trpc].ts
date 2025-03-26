import { createNextApiHandler } from '@trpc/server/adapters/next'

import { appRouter } from '~/server/api/root'
import { createTRPCContext } from '~/server/api/trpc'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError: (opts) => {
    console.error(
      `❌ tRPC failed on ${opts.path ?? '<no-path>'}: ${opts.error.message}`,
    )
  },
})
