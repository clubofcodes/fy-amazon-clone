import "./Cart.css";
import { CircularProgress, Divider } from "@mui/material";
import DropDown from "./Parts/DropDown";
import SubTotal from "./Parts/SubTotal";
import BuyBox from "./Parts/BuyBox";
import { useEffect, useState } from "react";
import EmptyCart from "./Parts/EmptyCart";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
    var totalItem = 0;

    const [StoredCartData, setCartData] = useState([]);
    //New state for loading
    const [isLoading, setIsLoading] = useState(true);
    //for navigating to particular component.
    const navigate = useNavigate();

    const getCartData = async () => {
        const getCartDataRes = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const CartData = await getCartDataRes.json();
        (getCartDataRes.status !== 200) ? console.log("No such data available") : setCartData(CartData.carts);
        (CartData?.carts.length && getCartDataRes.status !== 200) ? setIsLoading(true) : setIsLoading(false);
    };

    useEffect(() => {
        getCartData();
    }, []);

    return (
        <>
            {isLoading ?
                <div className="loading d-flex flex-column justify-content-center align-items-center h-100 p-5">
                    <CircularProgress />
                    <h2>Loading....</h2>
                </div> : StoredCartData.length ?
                    <div className="buynow_section">
                        <div className="buynow_container">
                            <div className="left_buy">
                                <h1>Shopping Cart</h1>
                                <p>Select all items</p>
                                <span className="leftbuyprice">Price</span>
                                <Divider />
                                {StoredCartData.map((cart, index) => (
                                    <>
                                        <div className="item_containert" key={index}>
                                            <img className="pe-auto" src={cart.detailUrl} alt="Single Product" onClick={() => navigate(`/product/${cart.title.longTitle}`)} />
                                            <div className="item_details">
                                                <h3>{cart.title.shortTitle}</h3>
                                                <h4>{cart.title.longTitle}</h4>
                                                <h3 className="diffrentprice">₹625.00</h3>
                                                <p className="unusuall">Usually dispatched in 8 days.</p>
                                                <p>Eligible for FREE Shipping</p>
                                                <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                                                <DropDown deleteData={cart.id} updateCartData={getCartData} qty={cart.qty} />
                                            </div>
                                            <h3 className="item_price">₹{cart.price.cost}.00</h3>
                                            <h1 hidden>{totalItem += cart.qty}</h1>
                                        </div>
                                        <Divider />
                                    </>
                                ))}
                                <SubTotal cartItem={StoredCartData} qty={totalItem} />
                            </div>
                            <BuyBox cartItem={StoredCartData} qty={totalItem} />
                        </div>
                    </div> : <EmptyCart />}
        </>
    )
}

export default AddToCart;