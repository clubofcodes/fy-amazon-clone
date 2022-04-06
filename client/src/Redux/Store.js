import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducers from "./AIOCombineReducer";

const middleware = [thunk];

const Store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;