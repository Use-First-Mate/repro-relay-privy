Issue with bridging ETH from Base to Ethereum network, using reservoir relay and privy smart wallets. Attempting to transfer ETH from privy smart wallet (Base) -> external wallet (Ethereum)

To run this project, you need to have the following environment variables set:

- NEXT_PUBLIC_PRIVY_APP_ID
- PRIVY_APP_SECRET
- NEXT_PUBLIC_ALCHEMY_API_KEY
- BASE_RPC_URL

1. Create a new client-side Privy app here: https://docs.privy.io/basics/get-started/account , and enable smart wallets with Kernel (ZeroDev) as the provider. Configure the chain as Base.
2. Create a new app in Alchemy and get the API key: https://docs.alchemy.com/reference/api-overview . Ensure Base Mainnet is included in the networks tab.
3. Create a new .env file in the root of the project and add the environment variables.
4. Run `yarn install` to install the dependencies.
5. Run `yarn dev` to start the development server.

Deposit from Ethereum to Base:
1. Enter an amount to deposit.
2. Click the "Get Deposit Address" button.
3. Copy the deposit address and send ETH from Ethereum to it.
4. Refresh wallet balance to see the ETH added to your balance.

Withdraw from Base to Ethereum:
1. Enter an withdrawal address.
2. Click the "Withdraw ETH" button.