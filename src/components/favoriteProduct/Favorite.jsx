import {Link} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {useSelector} from "react-redux";

function discoutPrice(price, sale){
    return price*(1 - (sale/100));
}

function ShopCard(props) {

    const isLogin = useSelector(state => state.auth.login?.currentUser)
    const FAVORITE_API = process.env.REACT_APP_FETCH_API + `/favorites/user/${isLogin.userDtoResponse.id}`;
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
            .get(`${FAVORITE_API}`)
            .then(res => {
                console.log(res.data.favoriteProductDtoResponses);
                const arrayProduct = [];
                res.data.favoriteProductDtoResponses.forEach(item => {
                    arrayProduct.push(item.productDtoResponse)
                })
                setProducts(arrayProduct);
                console.log(products)
            })
            .catch(err => {console.log(err)
            })
    }, [FAVORITE_API, props]);
    console.log(products)

    return (

        <>
            {products.map((item) => {
                const {
                    id,
                    name,
                    image,
                    price,
                    sale,
                    markDtoResponse
                } = item;
                return (
                    <div key={id} className="col-lg-4 col-md-4 col-sm-6">
                        <div className="collection-card">
                            {markDtoResponse.tag === "" ? ("") : (
                                <div
                                    className= {markDtoResponse.tagBadge === "" ? "offer-card" : `offer-card ${markDtoResponse.tagBadge}`}
                                >
                                    <span>{markDtoResponse.tag}</span>
                                </div>
                            )}
                            <div className="collection-img">

                                <Link legacyBehavior to={`/shop-details/${id}`}>
                                    <img className="hover_image" style={{width:'200px', height: '200px'}} src={image} alt="" />
                                </Link>

                                <div className="view-dt-btn">
                                    <div className="plus-icon">
                                        <i className="bi bi-plus" />
                                    </div>
                                    <Link legacyBehavior to={`/shop-details/${id}`}>
                                        <a>View Details</a>
                                    </Link>
                                </div>

                            </div>
                            <div className="collection-content text-center">
                                <h4>
                                    <Link legacyBehavior to={`/shop-details/${id}`} >
                                        {name}
                                    </Link>
                                </h4>
                                <div className="price">
                                    <h6>${discoutPrice(price, sale)}</h6>
                                    {sale !==  0 && <del>${price}</del>}
                                </div>
                                <div className="review">
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default ShopCard;