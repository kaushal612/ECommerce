import React, { Fragment, useEffect } from "react";
//== import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./ProductCard";
// import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";




const Home = () => {
      const alert = useAlert();


    const dispatch = useDispatch();
    const { products, loading, error} = useSelector(state => state.products);


    useEffect(() => {

        if(error){
        alert.error(error);
        dispatch(clearErrors());
           
        }

       

        dispatch(getProducts());

    }, [dispatch,error,alert]);

    return (


        <Fragment>


            {loading ? <Loader /> :

                (<Fragment>

                    <MetaData title="MYSHOP" />
                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        { // {products &&
                            //   products.map((product) => (
                            //     <ProductCard key={product._id} product={product} />
                            //   ))}
                        }

                        {
                            products &&
                            products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))
                        }


                    </div>
                </Fragment>)
            }



        </Fragment>


    );
};

export default Home;