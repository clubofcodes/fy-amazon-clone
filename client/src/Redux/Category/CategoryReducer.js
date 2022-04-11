import {
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    ADD_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
  } from "./CategoryType";
  
// Category List
export const categoryListReducer = (state = { categories: [], data:[] }, action) => {
    switch (action.type) {
      case GET_CATEGORIES_REQUEST:
        return {
          ...state,
        };
  
      case GET_CATEGORIES_SUCCESS:
        console.log(action.payload," cat");
        return {
          ...state,
          categories: action.payload.category,
          data:action.payload.data
        };
      case ADD_CATEGORY:
        return {
          ...state,
          categories: [...state.categories, action.payload],
        };
      case UPDATE_CATEGORY:
        console.log(action.payload);
        return {
          ...state,
          categories: state.categories.map((category, index) =>
            index === action.payload.id ? action.payload.category : category
          ),
        };
      case DELETE_CATEGORY:
        return {
          ...state,
          categories: state.categories.filter(
            (category, index) => index !== action.payload
          ),
        };
  
      case GET_CATEGORIES_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };