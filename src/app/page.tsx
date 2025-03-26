'use client'

import {usePrivy, useLogin} from '@privy-io/react-auth';
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets"
import {useState} from 'react';
import { parseUnits } from 'viem';

export default function Home() {
  const {ready, authenticated, user} = usePrivy();
  const { login } = useLogin();
  const [amountWei, setAmountWei] = useState<bigint | undefined>(undefined)

  if (!ready || !authenticated) {
    return (
      <button onClick={login}>
        Log in
      </button>
    )
  }

  return (
    <main className="flex min-h-screen flex-col gap-4">
      <h1 className="text-2xl font-bold text-center">ETH Transfer</h1>
      <div className="text-center flex flex-col">
        <p>Privy Smart Wallet Address: {user?.smartWallet?.address}</p>
        <p>Privy Embedded Wallet Address: {user?.wallet?.address}</p>
        <p>Privy Id: {user?.id}</p>
      </div>
      <div className="flex gap-4 w-3/4 p-10 self-center justify-center items-center">
        <div className="flex flex-col gap-4 w-1/2">
          <input type="text" placeholder="Amount ETH" className="w-full rounded-lg border border-gray-300 p-4" onChange={(e) => setAmountWei(parseUnits(e.target.value, 18))} />
          Amount Wei: {amountWei?.toString()}
          <div className="w-auto flex flex-col items-center justify-center rounded-lg border bg-green-200 border-gray-300 p-4 cursor-pointer">
            Deposit ETH
          </div>
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
