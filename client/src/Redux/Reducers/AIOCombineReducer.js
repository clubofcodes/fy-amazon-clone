import { getProductsReducers } from "./ProductReducer";

import { combineReducers } from "redux";

const rootreducers = combineReducers({
    getproductsdata: getProductsReducers
});

export default rootreducers;