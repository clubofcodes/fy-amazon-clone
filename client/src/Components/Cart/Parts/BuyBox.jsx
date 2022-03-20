import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const BuyBox = ({cartItem}) => {

    const [val, setVal] = useState(false);

    const [price, setPrice] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        totalAmount();
    }, [cartItem]);

    const totalAmount = () => {
        let price = 0
        cartItem.map((item) => {
            price += item.price.cost
        });
        setPrice(price)
    }

    const proceedToBy = ()=>{
        console.log("Your Order is Confirmed");
        navigate("/");
    }

    return (
        <div className="right_buy">
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
            <div className="cost_right">
                <p>Your order is eligible for FREE Delivery. <br />
                    <span style={{ color: "#565959" }}> Select this option at checkout. Details</span></p>
                <h3>Subtotal ({cartItem.length} items): <span style={{ fontWeight: "700" }}> ₹{price}.00</span></h3>
                <button className="rightbuy_btn" onClick={proceedToBy}>Proceed to Buy</button>
                <div className="emi" onClick={() => setVal(!val)}>
                    Emi available
                    {!val ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
                <span className={val ? "show" : "hide"}> Your order qualifies for EMI with valid credit cards (not available on purchase of Gold,
                    Jewelry, Gift cards and Amazon pay balance top up). Learn more</span>
            </div>
        </div>
    )
}

export default BuyBox