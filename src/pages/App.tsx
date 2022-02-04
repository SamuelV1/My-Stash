import React, {useState, useEffect} from 'react';
import localforage from 'localforage'

interface collection {
    WalletName: string,
    coins: object,
}

function App() {
const [localWallet, setlocal] = useState('')

async function createWallet(){
console.log('Carteira criada')
let data = [{
	WalletName: "mining233",
	coins: {
	bitcoin: "preço",
	etherun: "preço"
	}
}]
const localwallet = await localforage.getItem<collection[]>('stashWallet')

	if(localwallet){
	localwallet.concat(data)
 	localforage.setItem('stashWallet', localwallet)
	} else localforage.setItem('stashWallet', data)


}
 useEffect(() => {
        async function start(){
            const StoreData = await localforage.getItem('stashWallet')
          if (StoreData){
          console.log(StoreData)
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
