export const getProducts = () => async (dispatch) => {
    try {
        const data = await fetch("/getproducts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const res = await data.json();
        // console.log(res);
        dispatch({ type: "SUCCESS_GET_PRODUCTS", payload: res });
    } catch (error) {
        dispatch({ type: "FAIL_GET_PRODUCTS", payload: error.response });
    }
}
export const updateProduct = (id, formData) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const res = await axiosbash.put(`/products/${id}`, formData, config);
  
      console.log(res.data);
      dispatch({
        type: 'UPDATE_PRODUCT_SUCCESS',
        payload: { category: formData.category, updatedProduct: res.data },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'UPDATE_PRODUCT_FAIL',
        payload: err.response ? err.response.data : err.message,
      });
    }
  };