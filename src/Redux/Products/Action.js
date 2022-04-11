import { replace } from 'formik';
import axiosbash from '../../API/AmazonNodeAPI';
import {
  ADD_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
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

// Get a Single Product
export const getProductDetails = (id) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_DETAILS_REQUEST,
  });

  try {
    const res = await axiosbash.get(`/getproduct/${id}`);
    console.log(res.data);

    dispatch({
      type: GET_PRODUCT_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload: err.response ? err.response.data : err.message,
    });
  }
};

// Add a Product
export const addProduct = (formData, navigate = null) => async (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_REQUEST,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axiosbash.post(`/addproduct`, formData, config);
    navigate("/admin/products");

    console.log(res.data);
    dispatch({
      type: 'ADD_PRODUCT_SUCCESS',
      payload: { category: formData.title.shortTitle, product: res.data },
    });
    if (navigate) navigate("/admin/products");
  } catch (err) {
    dispatch({
      type: 'ADD_PRODUCT_FAIL',
      payload: err.response ? err.response.data : err.message,
    });
  }
};

export const updateProduct = (id, formData, navigate = null) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axiosbash.patch(`/updateproduct/${id}`, formData, config);
    dispatch(getProducts())
    navigate("/admin/products", replace);

    console.log("responce update product ", res.data);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: { category: formData.title.shortTitle, updatedProduct: res.data },
    });
    if (navigate) navigate("/admin/products");
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
