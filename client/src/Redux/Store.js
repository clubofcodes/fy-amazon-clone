import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootreducers from "./Reducers/AIOCombineReducer";

const middleware = [thunk];

const Store = createStore(
    rootreducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;