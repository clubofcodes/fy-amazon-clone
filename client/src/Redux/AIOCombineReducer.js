import { getProductsReducers } from "./Products/ProductReducer";

import { combineReducers } from "redux";
import { userReducer } from "./Users/UserReducer";

const rootReducers = combineReducers({
    getproductsdata: getProductsReducers,
    userData: userReducer
});

export default rootReducers;