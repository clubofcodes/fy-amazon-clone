import { getProductsReducers, productDetailsReducer } from "./Products/ProductReducer";

import { combineReducers } from "redux";
import { userReducer } from "./Users/UserReducer";

const rootReducers = combineReducers({
    getproductsdata: getProductsReducers,
    productDetails: productDetailsReducer,
    userData: userReducer
});

export default rootReducers;