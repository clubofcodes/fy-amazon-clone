import { useAuthentication } from "../../../Utils/Context/useAuthentication";

const DropDown = ({ deleteData, updateCartData }) => {

    //Custom hook to store logedIn user email to context.
    const userAuth = useAuthentication();

    const removeCartItem = async (id) => {
        try {
            const delCartItemResponse = await fetch(`removeitem/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const delCartItemData = await delCartItemResponse.json();

            if (delCartItemResponse.status === 400 || !delCartItemData) {
                console.log("Something went wrong!!");
            } else {
                userAuth.login(delCartItemData)
                updateCartData();
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="add_remove_select">
            <select name="" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <p style={{ cursor: "pointer" }} onClick={() => removeCartItem(deleteData)}>Delete</p><span>|</span>
            <p className="forremovemedia">Save Or Later</p><span>|</span>
            <p className="forremovemedia">See More like this</p>
        </div>
    )
}

export default DropDown