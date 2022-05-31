import React from 'react';

import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';



const Product = ({ product }) => {

    const optons = {
        size: 'small',
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };


    return (

        <Link className="productCard" to={`/product/${product._id}`} >
            <img src={product.images[0].url} alt={product.name} />

            <p>{product.name}</p>

            <div>
                <Rating {...optons} />
                <span>({product.numofReviews} Reviews)</span>
            </div>

            <span>{product.price}</span>


        </Link >

    )
}

export default Product