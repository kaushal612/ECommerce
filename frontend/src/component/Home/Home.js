import React, { Fragment, useEffect } from "react";
//== import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "../../component/Home/Product";
// import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import { useSelector, useDispatch } from "react-redux";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";


const product = {
    name: "Blue Tshirt",
    images: [{ url: "https://media.istockphoto.com/photos/blue-blank-tshirt-front-and-back-picture-id1135510081?k=20&m=1135510081&s=612x612&w=0&h=ffsZfn74Bjw8f8IqXOVBuwCXiSHcvm-k-B_cjUF17l4=" }],
    price: "3000",
    _id: "kaushal"
}

const Home = () => {
    //   const alert = useAlert();




    return (


        <Fragment>

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

                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />


            </div>
        </Fragment>


    );
};

export default Home;