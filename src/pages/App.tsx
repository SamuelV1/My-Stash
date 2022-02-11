import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import localforage from 'localforage'
import { v4 as uuidv4 } from 'uuid'
// interface imports 
import {Product} from '../components/wallet/index'
import {Graph} from '../components/graph/index'
interface collection {
  WalletName: string,
  id: string,
  coins: Product[],
}

const initialwallet = {
WalletName: "",
id: "0",
coins: []
}

function App() {
  const [localWallet, setlocal] = useState<collection[]>([initialwallet])
 const history = useNavigate();

  async function createWallet(e: React.SyntheticEvent) {
   
    e.preventDefault()
  
    const target = e.target as typeof e.target & {
          wallet: { value: string };
          };
        const newWalletName = target.wallet.value
    

    let data = [{
      WalletName: newWalletName,
      id: uuidv4(),
      coins: []
      
      
    }]


    if (localWallet) {
     let walletArray = localWallet.concat(data)
     await localforage.setItem('stashWallet', walletArray)
      setlocal(walletArray)
    } else localforage.setItem('stashWallet', [data])
  }

  useEffect(() => {
    async function start() {
      const StoreData = await localforage.getItem<collection[]>('stashWallet')
      if (StoreData) {
        setlocal(StoreData)
      }

    }

    start()

  }, [])
  function clickHandler(string: string){
    history(`/${string}`)
  }

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
                           <h4 onClick={() => clickHandler(file.id)} key={idx}>{file.WalletName}</h4>
                        ))) :  <h2>Não achamos nada</h2>} </div>
    </div>
  );
}

export default App;
