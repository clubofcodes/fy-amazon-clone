import { GET_PRODUCT_DETAILS_FAIL, GET_PRODUCT_DETAILS_REQUEST, GET_PRODUCT_DETAILS_SUCCESS } from "./ProductTypes";

const products = [];

export const getProductsReducers = (state = { products }, action) => {
    switch (action?.type) {
        case 'SUCCESS_GET_PRODUCTS':
            return { products: action.payload }

        case 'ADD_PRODUCT_SUCCESS':
            const { product } = action.payload;
            return {
                ...state,
                products: [...state.products, product],
                loading: false,
            };

        case 'UPDATE_PRODUCT_SUCCESS':
            const { updatedProduct } = action.payload;
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            };

        case 'UPDATE_PRODUCT_FAIL':
            return { error: action.payload }

        case "FAIL_GET_PRODUCTS":
            return { error: action.payload }
            
        default: return state
    }
}

// Single Product Details
export const productDetailsReducer = (state = { product: null }, action) => {
    switch (action.type) {
      case GET_PRODUCT_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case GET_PRODUCT_DETAILS_SUCCESS:
        return {
          ...state,
          product: action.payload,
          loading: false,
        };
      case GET_PRODUCT_DETAILS_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  };
