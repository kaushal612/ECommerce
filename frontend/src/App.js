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
import LoginRegister from './component/User/LoginRegister';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js';
import Profile from './component/User/Profile.js';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile.js';
import UpdatePassword from './component/User/UpdatePassword.js';


function App() {


  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.user);



  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto:300,400,500,700', 'sans-serif']
      }
    });


    store.dispatch(loadUser());

  }, [dispatch]);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/products/:keyword" component={Products} />

      <Route exact path="/search" component={Search} />

      <Route exact path="/login" component={LoginRegister} />
      <ProtectedRoute exact path="/account" component={Profile} />

      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />




      <Footer />
    </Router>

  );
}

export default App;
