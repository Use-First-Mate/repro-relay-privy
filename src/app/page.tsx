'use client'

import {usePrivy, useLogin} from '@privy-io/react-auth';
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets"
import {useState} from 'react';
import { formatEther, parseUnits } from 'viem';
import { useBalance } from "wagmi";
import { api } from '~/utils/api';

export default function Home() {
  const {ready, authenticated, user} = usePrivy();
  const { client } = useSmartWallets()
  const { login } = useLogin();
  const [amountWei, setAmountWei] = useState<bigint | undefined>(undefined)
  const { data: smartWalletBalanceETH, isFetched, refetch, } = useBalance({
    address: client?.account.address,
  })
  const { data: ethMainnetToBaseQuote, mutateAsync: ethMainnetToBaseMutateAsync, reset: resetEthMainnetToBaseQuote } = api.transfer.ethMainnetToBaseQuote.useMutation()

  if (!ready || !authenticated) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <button onClick={login} className="bg-blue-500 text-white p-4 rounded-lg justify-center items-center">
          Log in
        </button>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">ETH Transfer</h1>
      <div className="flex flex-col items-center justify-center">
        <p><b>Chain:</b> {client?.chain.name} ;  <b>Id:</b> {client?.chain.id}</p>
        <p><b>Privy Smart Wallet Address:</b> {client?.account.address}</p>
        <p><b>Privy Embedded Wallet Address:</b> {user?.wallet?.address}</p>
        <p><b>Privy Id:</b> {user?.id}</p>
        <p><b>Smart Wallet Balance:</b> {formatEther(smartWalletBalanceETH?.value ?? 0n)} ETH</p>
        <button onClick={() => refetch()} className="bg-blue-500 text-white p-4 rounded-lg justify-center items-center">Refresh Balance</button>
      </div>
      <div className="flex gap-4 w-3/4 p-10 self-center justify-center items-center">
        <div className="flex flex-col gap-4 w-1/2">
          <input type="text" placeholder="Amount ETH" className="w-full rounded-lg border border-gray-300 p-4" onChange={(e) => setAmountWei(parseUnits(e.target.value, 18))} />
          <p>Amount Wei: {amountWei?.toString()}</p>
          <div 
            onClick={async () => {
              if (!amountWei || !client?.account.address) {
                return
              }
              const quote = await ethMainnetToBaseMutateAsync({
                amountWei: amountWei,
                smartWalletAddress: client.account.address,
              })
              console.log({quote: quote.quote})
            }}
            className="w-auto flex flex-col items-center justify-center rounded-lg border bg-green-200 border-gray-300 p-4 cursor-pointer"
          >
            Get Deposit Address
          </div>
          {ethMainnetToBaseQuote && (
            <div className="flex flex-col gap-2 text-wrap break-words">
              <p>Full quote is printed in the console</p>
              <p>Deposit Address: {ethMainnetToBaseQuote.depositAddress}</p>
              <p>RequestId: {ethMainnetToBaseQuote.requestId}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 w-1/2">
          <div className="w-auto flex flex-col items-center justify-center rounded-lg border bg-red-200 border-gray-300 p-4 cursor-pointer">
            Withdraw ETH
          </div>
        </div>
      </div>
    </main>
  );
}
