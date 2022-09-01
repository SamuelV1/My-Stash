// imports
import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { useParams } from 'react-router-dom';
// style import
import {Container,Form,FormContainer,SubmitButton,Testetexto} from './style'


type RoomParams = {
	wallet: string;
}
export interface Product {
	CoinName: string;
	CoinSymbol: string;
	price: number;
	image: string;
	symbol: string;
	price_change_24h: number;

}

export interface collection {
	WalletName: string,
	id: string,
	coins: Product[],
}

const initialtest = [{ CoinName: "Bitcoin", CoinSymbol: "btc", price: 20066, image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579", symbol: "btc", price_change_24h: 1.1357 }]


function Wallet() {

	const [dummyshow, setdummy] = useState<Product[]>(initialtest)

	const { wallet } = useParams<RoomParams>();


	useEffect(() => {
		async function start() {
            const StoreData = await localforage.getItem<collection[]>('stashWallet')
            if (StoreData) {
                let MyWallet = StoreData.find(o => o.id === wallet);
                if (MyWallet) {
                    MyWallet.coins.forEach(async function (arrayItem) {
                        console.log(arrayItem)
                        await fetch(`https://api.coingecko.com/api/v3/coins/${arrayItem.CoinName}`)
                            .then(response => response.json())
                            .then(el => {
                                if (el.error) {
                                    alert("coin não encontrado")
                                    console.log(el)
                                } else {
                                    const data: Product = {
                                        CoinName: el.id,
                                        CoinSymbol: el.symbol,
                                        price: el.market_data.current_price.usd,
                                        image: el.image.small,
                                        symbol: el.symbol,
                                        // wtf is this why i done this lord i'm so sorry for this
                                        price_change_24h: el.market_data.price_change_percentage_24h,
                                        // string to number then fix the number but turns into string then turns into number again
                                    }
                                    
                                    if (dummyshow) {
                                        // @ts-ignore
                                        setdummy(dummyshow => [...dummyshow, data])
                                        // @ts-ignore
                                    }
                                   
                                }
                            })
                    })

                }


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

		  // @ts-ignore
		let objIndex = StoreData.findIndex(o => o.id === wallet);
		
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
							CoinName: el.id,
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
				
				setdummy(MyWallet.coins)
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

				<Container>{dummyshow.length >= 1 ? (dummyshow.map((file: Product, idx) => (
					

					<h4 key={idx}><div><img src={file.image} alt="Coin Icon" /></div> <div> <p>{file.CoinName}</p> <p className='Symbol'>{file.CoinSymbol}</p></div> <div><p>${file.price}</p> <Testetexto emphasized={file.price_change_24h}>{file.price_change_24h}</Testetexto></div></h4>

				))) : <h2>Não achamos nada</h2>}  </Container>
			</div>
		</div>
	);
}

export default Wallet;
