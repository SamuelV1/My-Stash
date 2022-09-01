// imports
import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useParams } from 'react-router-dom';
// style import
import {Container,Form,FormContainer,SubmitButton} from './style'


type RoomParams = {
	wallet: string;
}
export interface Product {
	CoinName: string;
	CoinSymbol: string;
	price: string;
	image: string;
	symbol: string;
	price_change_24h: number;

}
export interface collection {
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
			// remember to add a error handler
			await fetch(`https://api.coingecko.com/api/v3/coins/${CoinName}`)
				.then(response => response.json())
				.then(el => {
					if (el.error) {
						alert("coin não encontrado")
						console.log(el)
					} else {
						const data: Product = {
							CoinName: el.name,
							CoinSymbol: el.symbol,
							price: el.market_data.current_price.usd,
							image: el.image.small,
							symbol: el.symbol,
							// wtf is this why i done this lord i'm so sorry for this
							price_change_24h: el.market_data.price_change_percentage_24h,
							// string to number then fix the number but turns into string then turns into number again
						}
						storage[objIndex].coins.push(data)
					}
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
			<Form onSubmit={addCoin}>
				<FormContainer> 
				<input
					required
					placeholder='Coin ID'
					type='text'
					name='coin'

				/>
				<label htmlFor='coin'>find the id in<a href='google.com'>CoinGecko</a> </label>
				</FormContainer>
				<SubmitButton
					type='submit'
					value='find'
				/>
			</Form>
			<div>
				<h3>bem vindo a {wallet}</h3>

				<Container>{localWallet.coins.length >= 1 ? (localWallet.coins.map((file: Product, idx) => (
					// graph sucks lol who made this XD
					<h4 key={idx}><div><img src={file.image} alt="Coin Icon" /></div> <div> <p>{file.CoinName}</p> <p className='Symbol'>{file.CoinSymbol}</p></div> <div><p>{file.price}</p> <p>{file.price_change_24h}</p></div></h4>

				))) : <h2>Não achamos nada</h2>}  </Container>
			</div>
		</div>
	);
}

export default Wallet;
