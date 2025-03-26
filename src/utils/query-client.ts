// since trpc and wagmi both depend on tanstack, we need to allow both to share the same query client
// without this, trpc is unable to invalidate queries
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default queryClient
