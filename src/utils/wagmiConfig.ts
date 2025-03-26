import { http, createConfig } from '@wagmi/core'
import { base } from '@wagmi/core/chains'
import { env } from '~/env'
import { base as baseViem } from 'viem/chains'

const nftPoolChains = [baseViem] as const

const rpcUrls = new Map<number, string>([
  [8453, 'https://base-mainnet.g.alchemy.com/v2'],
  [84532, 'https://base-sepolia.g.alchemy.com/v2'],
])

export function getRPCUrl(chainId: number) {
  if (rpcUrls.has(chainId)) {
    return rpcUrls.get(chainId) + `/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  } else {
    const chain = nftPoolChains.find((c) => c.id === chainId)
    if (!chain)
      throw new Error(
        'Could not find chain on server for ' + chainId.toString(),
      )
    return chain.rpcUrls.default.http[0]
  }
}


export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(getRPCUrl(base.id)),
  },
})