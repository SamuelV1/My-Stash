// imports
import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useParams } from 'react-router-dom';

type RoomParams = {
	wallet: string;
}
interface Product {
	CoinName: string;
	price: string;
	image: string;
	symbol: string;
	price_change_24h:string;

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

	
	const [localWallet, setLocal] = useState<collection>(initialwallet)

	const { wallet } = useParams<RoomParams>();
	
	


	useEffect(() => {
		async function start() {
			const StoreData = await localforage.getItem<collection[]>('stashWallet')
			if (StoreData) {
				let MyWallet = StoreData.find(o => o.id === wallet);
				if (MyWallet) {
					setLocal(MyWallet)
				}
				setCoins(StoreData)

			}

		}

		start()

	}, [])



	async function addCoin(e: React.SyntheticEvent) {
		e.preventDefault()

		const target = e.target as typeof e.target & {
			coin: { value: string };
		};
		const CoinName = target.coin.value
	
		// 
		const StoreData = await localforage.getItem<collection[]>('stashWallet')
		let objIndex = Coins.findIndex((obj => obj.id === wallet));
		if (StoreData) {
			// add the new coin to the localStorage
			let storage = StoreData
			// test code
			await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
		.then(response => response.json())
		.then(el => {
			const data: Product = {
				CoinName: el.name,
				price: el.market_data.current_price.usd,
				image: el.image.small,
				symbol: el.symbol,
				price_change_24h: el.market_data.price_change_percentage_24h,
			}
			storage[objIndex].coins.push(data)
			
		 })

			await localforage.setItem('stashWallet', storage)
			// add the coin in the local wallet
			let MyWallet = StoreData.find(o => o.id === wallet);
			if (MyWallet) {
				setLocal(MyWallet)
				
			}
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

				<div>{localWallet.coins.length >= 1 ? (localWallet.coins.map((file: Product, idx) => (
                           <h4  key={idx}>{file.CoinName} <img src={file.image} alt="Coin Icon" /> <p>{file.price}</p> </h4>
						  
                        ))) :  <h2>Não achamos nada</h2>} </div>
			</div>
		</div>
	);
}

export default Wallet;
