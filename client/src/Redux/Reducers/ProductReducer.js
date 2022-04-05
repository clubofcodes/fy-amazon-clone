const products = [];

export const getProductsReducers = (state = { products }, action) => {
    switch (action?.type) {
        case "SUCCESS_GET_PRODUCTS":
            return { products: action.payload }
        case "FAIL_GET_PRODUCTS":
            return { error: action.payload }
        case '':
            const { updatedProduct } = action.payload;
            return {
                ...state,
                products: state.products.map((product) =>
                  product.id === updatedProduct.id ? updatedProduct : product
                ),
                loading: false,
              };
        default: return state
    }
}
