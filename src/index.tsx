import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './pages/App';
import Wallet from './components/wallet'
ReactDOM.render(
  <BrowserRouter>
      <Routes>
        <Route  path="/" element={<App />}>
        </Route>
        <Route  path="/33" element={<Wallet />}>
        </Route>
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);


