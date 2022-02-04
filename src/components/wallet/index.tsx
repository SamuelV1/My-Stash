import React, {useState, ChangeEvent} from 'react';

interface FormElements extends HTMLFormControlsCollection {
    yourInputName: HTMLInputElement
}

interface YourFormElement extends HTMLFormElement {
   readonly elements: FormElements
}

 function Wallet() {

const [Coins, setCoins] = useState('')
/*async function gatherData(){
// https://api.coingecko.com/api/v3/coins/bitcoin
await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
	.then(response => response.json())
	.then(el => {console.log(el)})

}

gatherData() */

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
    </div>
  );
}

export default Wallet;
