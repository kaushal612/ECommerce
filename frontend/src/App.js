import React, { useState } from 'react';

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
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import axios from 'axios';
import Payment from './component/Cart/Payment.js';

import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';

import OrderSuccess from './component/Cart/OrderSuccess.js';
import MyOrders from './component/Order/MyOrders.js';

import OrderDetails from './component/Order/OrderDetails.js';

function App() {


  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto:300,400,500,700', 'sans-serif']
      }
    });


    store.dispatch(loadUser());

    getStripeApiKey();

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

      <Route exact path="/password/forgot" component={ForgotPassword} />

      <Route exact path="/password/reset/:token" component={ResetPassword} />

      <Route exact path="/cart" component={Cart} />





      <ProtectedRoute exact path="/account" component={Profile} />

      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />

      <ProtectedRoute exact path="/shipping" component={Shipping} />

      <Switch>
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

      </Switch>


      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>

          <ProtectedRoute exact path="/process/payment" component={Payment} />

        </Elements>)}

      <ProtectedRoute exact path="/success" component={OrderSuccess} />

      <ProtectedRoute exact path="/orders" component={MyOrders} />














      <Footer />
    </Router>

  );
}

export default App;
