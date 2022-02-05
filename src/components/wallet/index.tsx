// imports
import React, {useState, useEffect} from 'react';
import localforage from 'localforage';
import { useParams } from 'react-router-dom';

type RoomParams = {
    wallet: string;
}
interface Product {
	CoinName: string;
	price: string;
  }
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

 function Wallet() {

const [Coins, setCoins] = useState<collection[]>([initialwallet])

const { wallet } = useParams<RoomParams>();
/*async function gatherData(){
// https://api.coingecko.com/api/v3/coins/bitcoin
await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
	.then(response => response.json())
	.then(el => {console.log(el)})

}
 */


  
    useEffect(() => {
        async function start(){
			const StoreData = await localforage.getItem<collection[]>('stashWallet')
			if (StoreData) {  
			let MyWallet = StoreData.find(o => o.id === wallet);
			console.log(MyWallet?.coins)
			setCoins(StoreData)
			}
	  
        }

        start()

      }, [])



 async function addCoin(e: React.SyntheticEvent){
	e.preventDefault()

	const target = e.target as typeof e.target & {
      	coin: { value: string };
    		};
    	const CoinName = target.coin.value

		// 
		const StoreData = await localforage.getItem<collection[]>('stashWallet')
	let objIndex = Coins.findIndex((obj => obj.id === wallet));
			if(StoreData){
				let storage = StoreData
				 storage[objIndex].coins.push({CoinName:`CoinName` , price: "6565"})
				console.log(storage)
				await localforage.setItem('stashWallet', storage)
			}
	
 }

  return (
    <div className="App">
    	<form onSubmit={addCoin}>
    		<input
    		required
    		placeholder='Coin ID'
    		type='text'
    		name='coin'

    		/>
    		<label htmlFor='coin'> you can find coins id in <a href='google.com'>CoinGecko</a> </label>
		<input
		type='submit'
		value='pesquisar'
		/>
    	</form>
    	<div>
    	<h3>bem vindo a {wallet}</h3>

    	</div>
    </div>
  );
}

export default Wallet;
