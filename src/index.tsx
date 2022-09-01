import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './pages/App';
import Wallet from './components/wallet'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1b173b;
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


