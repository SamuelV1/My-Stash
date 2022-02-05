import React, { useState, useEffect } from 'react';
import localforage from 'localforage'

interface Product {
  CoinName: string;
  price: string;
}
interface collection {
  WalletName: string,
  coins: Product[],
}

const initialwallet = {
WalletName: "",
coins: []
}

function App() {
  const [localWallet, setlocal] = useState<collection[]>([initialwallet])

  async function createWallet(e: React.SyntheticEvent) {
   
    e.preventDefault()
  
    const target = e.target as typeof e.target & {
          wallet: { value: string };
          };
        const newWalletName = target.wallet.value
    

    let data = [{
      WalletName: newWalletName,
      coins: [{CoinName:"a" , price: "40"}, {CoinName: "b", price:"40"}]
      
      
    }]


    if (localWallet) {
     let walletArray = localWallet.concat(data)
     await localforage.setItem('stashWallet', walletArray)
      setlocal(walletArray)
      console.log("novac arteira criada: ", walletArray)
    } else localforage.setItem('stashWallet', [data])
  }

  useEffect(() => {
    async function start() {
      const StoreData = await localforage.getItem<collection[]>('stashWallet')
      if (StoreData) {
        console.log("informações guardadas: ",StoreData)
        setlocal(StoreData)
      }

    }

    start()

  }, [])

  return (
    <div className="App">
      <form onSubmit={createWallet}>
    		<input
    		required
    		placeholder='New Wallet Name'
    		type='text'
    		name='wallet'

    		/>
    		<label htmlFor='wallet'> Create New Wallet </label>
		<input
		type='submit'
		value='pesquisar'
		/>
    	</form>
      <div>{localWallet.length >= 1 ? (localWallet.map((file: collection, idx) => (
                           <h4 key={idx}>{file.WalletName}</h4>
                        ))) :  <h2>Não achamos nada</h2>} </div>
    </div>
  );
}

export default App;
