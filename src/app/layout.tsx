'use client'
import '~/styles/globals.css'
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider, createConfig } from '@privy-io/wagmi'
import { http } from 'wagmi'
import { base } from 'wagmi/chains'
import { SmartWalletsProvider } from '@privy-io/react-auth/smart-wallets'
import { env } from '~/env'
import { getRPCUrl } from "~/utils/getRPCUrl";
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '~/utils/query-client'
import { api } from '~/utils/api'

const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(getRPCUrl(base.id)),
  },
})
declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}

function RootLayout({children,}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PrivyProvider
          appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
          config={{
            defaultChain: base,
            supportedChains: [base],
            loginMethods: ['email'],

            embeddedWallets: {
              createOnLogin: 'all-users',
            },
          }}
        > 
          <SmartWalletsProvider>
            <QueryClientProvider client={queryClient}>
              <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
            </QueryClientProvider>  
          </SmartWalletsProvider>
        </PrivyProvider>
      </body>
    </html>
  );
}

export default api.withTRPC(RootLayout)