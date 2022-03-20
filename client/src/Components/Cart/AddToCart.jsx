import "./Cart.css";
import { Divider } from "@mui/material";
import DropDown from "./Parts/DropDown";
import SubTotal from "./Parts/SubTotal";
import { products } from "../../Assets/files/productData";
import BuyBox from "./Parts/BuyBox";

const AddToCart = () => {
    return (
        <div className="buynow_section">
            <div className="buynow_container">
                <div className="left_buy">
                    <h1>Shopping Cart</h1>
                    <p>Select all items</p>
                    <span className="leftbuyprice">Price</span>
                    <Divider />
                    <div className="item_containert">
                        <img src="https://rukminim1.flixcart.com/image/416/416/kapoo7k0/electric-kettle/p/6/s/pigeon-favourite-original-imafs7xhj5uwgrh4.jpeg?q=70" alt="Single Product" />
                        <div className="item_details">
                            <h3>Home &amp; Kitchen</h3>
                            <h4>Pigeon FAVOURITE Electric Kettle  (1.5 L, Silver, Black)</h4>
                            <h3 className="diffrentprice">₹625.00</h3>
                            <p className="unusuall">Usually dispatched in 8 days.</p>
                            <p>Eligible for FREE Shipping</p>
                            <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                            <DropDown />
                        </div>
                        <h3 className="item_price">₹625.00</h3>
                    </div>
                    <Divider />
                    <SubTotal productItem={products} />
                </div>
                <BuyBox />
            </div>
        </div>
    )
}

export default AddToCart;