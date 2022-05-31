import axios from 'axios';
import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    CLEAR_ERRORS,
} from '../constants/productConstants';

export const getProducts = (keyword = "", currentPage = 1, price = [0, 50000], category, ratings = 0) => async (dispatch) => {

    try {

        dispatch({
            type: ALL_PRODUCT_REQUEST,


        });


        let requestLink = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
            requestLink += `&category=${category}`;
        }

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


// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(`/api/v1/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};


//clearing errors
export const clearErrors = () => async (dispatch) => {

    dispatch({
        type: CLEAR_ERRORS,
    });

}

