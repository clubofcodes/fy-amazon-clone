import { getProductsReducers, productDetailsReducer } from "./Products/ProductReducer";
import { combineReducers } from "redux";
import { userReducer } from "./Users/UserReducer";
import { categoryListReducer } from "./Category/CategoryReducer"

const rootReducers = combineReducers({
    getproductsdata: getProductsReducers,
    productDetails: productDetailsReducer,
    userData: userReducer,
    categoryData: categoryListReducer
});

export default rootReducers;