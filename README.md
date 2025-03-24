Issue with bridging ETH from Base to Ethereum network, using reservoir relay and privy smart wallets. Attempting to transfer ETH from privy smart wallet (Base) -> external wallet (Ethereum)

To run this project, you need to have the following environment variables set:

- NEXT_PUBLIC_PRIVY_APP_ID
- PRIVY_APP_SECRET
- NEXT_PUBLIC_ALCHEMY_API_KEY

1. Create a new client-side Privy app here: https://docs.privy.io/basics/get-started/account , and enable smart wallets with Kernel (ZeroDev) as the provider. Configure the chain as Base.
2. Create a new app in Alchemy and get the API key: https://docs.alchemy.com/reference/api-overview . Ensure Base Mainnet is included in the networks tab.