import React from 'react';

import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';



const Product = ({ product }) => {

    const optons = {
        edit: false,
        color: "yellow",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    };


    return (

        <Link className="productCard" to={Product._id}>
            <img src={product.images[0].url} alt={product.name} />

            <p>{product.name}</p>

            <div>
                <ReactStars {...optons} />
                <span>({product.numofReviews} Reviews)</span>
            </div>

            <span>{product.price}</span>


        </Link>

    )
}

export default Product