import React from 'react';



 function Wallet() {

/*async function gatherData(){
// https://api.coingecko.com/api/v3/coins/bitcoin
await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
	.then(response => response.json())
	.then(el => {console.log(el)})

}

gatherData() */

function addCoin(e: React.FormEvent<HTMLFormElement>){
console.log("bitcoin adicionado")
e.preventDefault();
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
