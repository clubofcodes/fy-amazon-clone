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
