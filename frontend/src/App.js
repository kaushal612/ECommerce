import React from 'react';

import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import WebFont from 'webfontloader';

import { useEffect } from 'react';
import Footer from './component/layout/Footer/Footer';

import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';

import Search from './component/Product/Search.js';


function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto:300,400,500,700', 'sans-serif']
      }
    });
  }, [])

  return (
    <Router>
      <Header />

      <Route exact path="/" component={Home}  />
      <Route exact path="/product/:id" component={ProductDetails}  />
      <Route exact path="/products" component={Products}  />
      <Route exact path="/products/:keyword" component={Products}  />

      <Route exact path="/search" component={Search}  />



      
      <Footer />
    </Router>

  );
}

export default App;
