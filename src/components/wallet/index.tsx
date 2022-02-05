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
  
  

 function Wallet() {

const [Coins, setCoins] = useState()

const { wallet } = useParams<RoomParams>();
/*async function gatherData(){
// https://api.coingecko.com/api/v3/coins/bitcoin
await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
	.then(response => response.json())
	.then(el => {console.log(el)})

}
 */


  // checka o local base e se não tiver aulas cadastradas seta as aulas
    useEffect(() => {
        async function start(){
			const StoreData = await localforage.getItem<collection[]>('stashWallet')
			if (StoreData) {  
			let MyWallet = StoreData.find(o => o.id === wallet);
			console.log(MyWallet?.coins)
			
			}
	  

        }

        start()

      }, [])



 function addCoin(e: React.SyntheticEvent){
	e.preventDefault()

	const target = e.target as typeof e.target & {
      	coin: { value: string };
    		};
    	const email = target.coin.value
	console.log(email," foi adicionado")
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
