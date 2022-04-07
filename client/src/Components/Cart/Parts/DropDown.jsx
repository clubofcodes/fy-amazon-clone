import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../../Redux/Products/Action";
import { getUsers, getValidateUser } from "../../../Redux/Users/UserAction";
import { useAuthentication } from "../../../Utils/Context/useAuthentication";

const DropDown = ({ deleteData, toggle, qty }) => {

    //Custom hook to store logedIn user email to context.
    const userAuth = useAuthentication();

    const [SelectedValue, setSelectedValue] = useState(qty);

    const dispatch = useDispatch();

    const removeCartItem = async (id) => {
        toggle(true);
        try {
            const delCartItemResponse = await fetch(`http://localhost:3575/api/removeitem/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const delCartItemData = await delCartItemResponse.json();
            console.log(delCartItemData);

            if (delCartItemResponse.status === 400 || !delCartItemData) {
                console.log("Something went wrong!!");
            } else {
                userAuth.login(delCartItemData)
                dispatch(getValidateUser());
                toggle(false);
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="add_remove_select">
            <select name="" id="" value={SelectedValue} onChange={(e) => { e.preventDefault(); setSelectedValue(e.target.value); }} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10+">10+</option>
            </select>
            <p style={{ cursor: "pointer" }} onClick={() => removeCartItem(deleteData)}>Delete</p><span>|</span>
            <p className="forremovemedia">Save Or Later</p><span>|</span>
            <p className="forremovemedia">See More like this</p>
        </div>
    )
}

export default DropDown