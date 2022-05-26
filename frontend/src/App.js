import React from 'react';

import './App.css';
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import WebFont from 'webfontloader';

import { useEffect } from 'react';
import Footer from './component/layout/Footer/Footer';

import Home from './component/Home/Home.js';
import Loader from './component/layout/Loader/Loader';



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
      
      <Footer />
    </Router>

  );
}

export default App;
