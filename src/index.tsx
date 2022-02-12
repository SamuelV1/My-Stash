import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './pages/App';
import Wallet from './components/wallet'
import {Graph} from './components/graph/index'
ReactDOM.render(
  <BrowserRouter>
      <Routes>
        <Route  path="/" element={<App />}>
        </Route>
        <Route  path="/:wallet" element={<Wallet />}>
        </Route> 
        <Route  path="/gph" element={<Graph change={1} />}>
        </Route>
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);


