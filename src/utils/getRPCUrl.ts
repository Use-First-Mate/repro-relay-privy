import { env } from '~/env'
import { base } from 'viem/chains'

const nftPoolChains = [base] as const

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
