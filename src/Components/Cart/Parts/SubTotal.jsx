import { useEffect, useState } from 'react'

const SubTotal = ({cartItem, qty}) => {
    const [price, setPrice] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [cartItem]);

    const totalAmount = () => {
        let price = 0
        cartItem.map((item) => {
            price += (item.price.cost * item.qty)
        });
        setPrice(price)
    }
    return (
        <div className="sub_item">
            <h3>Subtotal ({qty} items):<strong style={{ fontWeight: "700", color: "#111" }}> ₹{price}.00</strong></h3>
        </div>
    )
}

export default SubTotal