import axiosbash from '../../API/AmazonNodeAPI';
import {
  ADD_CATEGORY,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  CLEAR_FILTER,
  DELETE_CATEGORY,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_FAIL,
  GET_PRODUCTS_BY_CATEGORY_REQUEST,
  GET_PRODUCTS_BY_CATEGORY_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  SET_FILTER,
  SET_FILTERED_PRODUCTS,
  UPDATE_CATEGORY,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "./ProductTypes";

export const getProducts = () => async (dispatch) => {
  try {
    const productsResponse = await axiosbash.get("/getproducts");

    // const res = await data.json();
    // console.log(res);
    dispatch({ type: "SUCCESS_GET_PRODUCTS", payload: productsResponse.data });
  } catch (error) {
    dispatch({ type: "FAIL_GET_PRODUCTS", payload: error.response });
  }
}

// Add a Product
export const addProduct =
  (formData, navigate = null) =>{
    console.log("formdata   ",formData);
    return async (dispatch) => {
      dispatch({
        type: 'ADD_PRODUCT_REQUEST',
      });

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const res = await axiosbash.post(`/addproduct`, formData, config);

        console.log(res.data);
        dispatch({
          type: 'ADD_PRODUCT_SUCCESS',
          payload: { category: formData.title.shortTitle, product: res.data },
        });
        if (navigate) navigate("/products");
      } catch (err) {
        dispatch({
          type: 'ADD_PRODUCT_FAIL',
          payload: err.response ? err.response.data : err.message,
        });
      }
    };
  }


export const updateProduct = (id, formData) => async (dispatch) => {
  console.log("formdata product  ",formData);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axiosbash.patch(`/updateproduct/${id}`, formData, config);

    console.log("responce update product ",res.data);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: { category: formData.category, updatedProduct: res.data },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: err.response ? err.response.data : err.message,
    });
  }
};


// Delete a Product
export const deleteProduct = (id) => async (dispatch) => {
  // const id = 9;
  // const category = "electronics";

  dispatch({
    type: DELETE_PRODUCT_REQUEST,
  });

  try {
    await axiosbash.delete(`/removeproduct/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: err.response ? err.response.data : err.message,
    });
  }
};
