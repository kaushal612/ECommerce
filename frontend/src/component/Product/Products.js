import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Loader from '../layout/Loader/Loader';
import Product from '../Home/ProductCard';
import Pagination from 'react-js-pagination';

const Products = ({ match }) => {

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);


    const { products, loading, error, productsCount, resultPerPage } = useSelector(state => state.products);

    const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }


    useEffect(() => {
        dispatch(getProducts(keyword, currentPage));
    }, [dispatch, keyword, currentPage]);



    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="PRODUCTS -- ECOMMERCE" />
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <Product key={product._id} product={product} />
                            ))}
                    </div>


                    {resultPerPage < productsCount && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}



                </Fragment>
            )}
        </Fragment>

    )
};

export default Products