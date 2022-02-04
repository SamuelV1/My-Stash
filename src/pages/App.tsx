import React, { useState, useEffect } from 'react';
import localforage from 'localforage'

interface collection {
  WalletName: string,
  coins: object,
}
const Initialfiles: collection =
{
    WalletName: "placeholder",
    coins: {},
    
}

function App() {
  const [localWallet, setlocal] = useState<collection[]>()

  async function createWallet() {
   
    let data = [{
      WalletName: "mining233",
      coins: {
        bitcoin: "preço",
        etherun: "preço"
      }
    }]


    if (localWallet) {
      localWallet.concat(data)
      localforage.setItem('stashWallet', localWallet)
    } else console.log("não sei bixo")


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
      <button onClick={createWallet}>Criar Nova carteira</button>

      <div> </div>
    </div>
  );
}

export default App;
