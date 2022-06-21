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

import Dashboard from './component/Admin/Dashboard.js';

import ProductList from './component/Admin/ProductList.js';
import NewProduct from './component/Admin/NewProduct';

import UpdateProduct from './component/Admin/UpdateProduct.js';

import OrderList from './component/Admin/OrderList.js';

import ProcessOrder from './component/Admin/ProcessOrder.js';

import UpdateUser from './component/Admin/UpdateUser.js';

import ProductReviews from './component/Admin/ProductReviews.js';

import UserList from './component/Admin/UserList.js';
import NotFound from './component/layout/Not Found/NotFound';



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

  window.addEventListener("contextmenu",(e) => e.preventDefault())




  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>

          <ProtectedRoute exact path="/process/payment" component={Payment} />

        </Elements>)}
      <Switch>

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


        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />






        <ProtectedRoute exact path="/success" component={OrderSuccess} />

        <ProtectedRoute exact path="/orders" component={MyOrders} />



        <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />

        <ProtectedRoute isAdmin={true} exact path="/admin/products" component={ProductList} />

        <ProtectedRoute isAdmin={true} exact path="/admin/product" component={NewProduct} />

        <ProtectedRoute isAdmin={true} exact path="/admin/product/:id" component={UpdateProduct} />

        <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList} />

        <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder} />

        <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UserList} />

        <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews} />


        <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser} />
        
      </Switch>



















      <Footer />
    </Router>

  );
}

export default App;
