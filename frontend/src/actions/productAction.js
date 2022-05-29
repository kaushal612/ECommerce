import axios from 'axios';
import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
} from '../constants/productConstants';

export const getProducts = (keyword = "", currentPage = 1) => async (dispatch) => {

    try {

        dispatch({
            type: ALL_PRODUCT_REQUEST,


        });


        const requestLink = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;

        const { data } = await axios.get(requestLink);

        console.log(data);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        });



    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }

};


//get product details
export const getProductDetails = (productId) => async (dispatch) => {

    try {

        dispatch({
            type: PRODUCT_DETAILS_REQUEST,

        });

        console.log(productId);

        const { data } = await axios.get(`/api/v1/product/${productId}`);



        console.log(data);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });



    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }

}


//clearing errors
export const clearErrors = () => async (dispatch) => {

    dispatch({
        type: CLEAR_ERRORS,
    });

}

