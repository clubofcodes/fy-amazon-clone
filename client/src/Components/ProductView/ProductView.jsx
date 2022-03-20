import { CircularProgress, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthentication } from "../../Utils/Context/useAuthentication";
import "./ProductView.css";

const ProductView = () => {
    window.scrollTo(0, 0);

    //To get name of product from url parameters.
    const { id } = useParams("");
    //New state to store particular product data.
    const [StoredProductData, setProductData] = useState("");
    //routing hook to go to particular path.
    const navigate = useNavigate();
    //Custom hook to store logedIn user email to context.
    const userAuth = useAuthentication();

    //To get individual product data.
    const getProductData = async () => {
        const productResponse = await fetch(`/product/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const productData = await productResponse.json();
        (productResponse.status !== 200) ? alert("No such product") : setProductData(productData);
    };

    useEffect(() => {
        getProductData();
    }, [id]);

    //Add to cart and store to db.
    const addToCart = async (id) => {
        const addedToCartResponse = await fetch(`/addtocart/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(StoredProductData),
            credentials: "include"
        });

        const cartProductData = await addedToCartResponse.json();
        (addedToCartResponse.status !== 200) ? console.log("No such data available") : userAuth.login(cartProductData);
    }

    return (
        <div className="cart_section">
            {StoredProductData && Object.keys(StoredProductData).length &&
                <div className="cart_container">
                    <div className="left_cart">
                        <img src={StoredProductData.detailUrl} alt="Single Product" />
                        <div className="cart_btn">
                            <button className="cart_btn1" onClick={() => addToCart(StoredProductData.title.longTitle)}>Add to Cart</button>
                            <button className="cart_btn2">Buy Now</button>
                        </div>
                    </div>
                    <div className="right_cart">
                        <h3>{StoredProductData.title.shortTitle}</h3>
                        <h4>{StoredProductData.title.longTitle}</h4>
                        <Divider />
                        <p className="mrp">M.R.P. : <del>₹{StoredProductData.price.mrp}</del></p>
                        <p>Deal of the Day : <span style={{ color: "#B12704" }}>₹{StoredProductData.price.cost}.00</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}> ₹{StoredProductData.price.mrp - StoredProductData.price.cost} ({StoredProductData.price.discount} </span></p>
                        <div className="discount_box">
                            <h5 >Discount : <span style={{ color: "#111" }}>{StoredProductData.discount}</span> </h5>
                            <h4>FREE Delivery : <span style={{ color: "#111", fontWeight: "600" }}>Apr 8 - 22</span> Details</h4>
                            <p style={{ color: "#111" }}>Fastest delivery: <span style={{ color: "#111", fontWeight: "600" }}> Tomorrow 11AM</span></p>
                        </div>
                        <div className="description">Specifications <br />
                            <ul className="mt-1">{StoredProductData.description.split(",").map((feature, index) => (
                                <li className="feature_list" key={index}>{feature} <br /></li>
                            ))}</ul>
                        </div>
                    </div>
                </div>}

            {!StoredProductData ? <div className="loading d-flex flex-column justify-content-center align-items-center h-100 p-5">
                <CircularProgress />
                <h2>Loading....</h2>
            </div> : ""}
        </div>
    )
}

export default ProductView;