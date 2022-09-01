import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './pages/App';
import Wallet from './components/wallet'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background: rgb(27,26,73);
background: linear-gradient(135deg, rgba(27,26,73,1) 5%, rgba(0,0,0,1) 92%);
    background-repeat: no-repeat;
    background-attachment: fixed;
    color: snow;
  }
`

 
ReactDOM.render(
  <BrowserRouter>
  <GlobalStyle></GlobalStyle>
      <Routes>
        <Route  path="/" element={<App />}>
        </Route>
        <Route  path="/:wallet" element={<Wallet />}>
        </Route> 
       
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);


