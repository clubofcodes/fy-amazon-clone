import "./Cart.css";
import { CircularProgress, Divider } from "@mui/material";
import DropDown from "./Parts/DropDown";
import SubTotal from "./Parts/SubTotal";
import BuyBox from "./Parts/BuyBox";
import { useCallback, useEffect, useState } from "react";
import EmptyCart from "./Parts/EmptyCart";

const AddToCart = () => {

    const [StoredCartData, setCartData] = useState("");

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
    };

    useEffect(() => {
        getCartData();
    }, []);

    return (
        <div className="buynow_section">
            {StoredCartData.length ? <div className="buynow_container">
                <div className="left_buy">
                    <h1>Shopping Cart</h1>
                    <p>Select all items</p>
                    <span className="leftbuyprice">Price</span>
                    <Divider />
                    {StoredCartData.map((cart, index) => (
                        <>
                            <div className="item_containert" key={index}>
                                <img src={cart.detailUrl} alt="Single Product" />
                                <div className="item_details">
                                    <h3>{cart.title.shortTitle}</h3>
                                    <h4>{cart.title.longTitle}</h4>
                                    <h3 className="diffrentprice">₹625.00</h3>
                                    <p className="unusuall">Usually dispatched in 8 days.</p>
                                    <p>Eligible for FREE Shipping</p>
                                    <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                                    <DropDown />
                                </div>
                                <h3 className="item_price">₹{cart.price.cost}.00</h3>
                            </div>
                            <Divider />
                        </>
                    ))}
                    <SubTotal cartItem={StoredCartData} />
                </div>
                <BuyBox cartItem={StoredCartData} />
            </div> :
                <div className="loading d-flex flex-column justify-content-center align-items-center h-100 p-5">
                    <CircularProgress />
                    <h2>Loading....</h2>
                </div>
            }
        </div>
    )
}

export default AddToCart;