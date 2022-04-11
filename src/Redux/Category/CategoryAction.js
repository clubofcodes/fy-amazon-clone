import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES_FAIL, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, UPDATE_CATEGORY } from "./CategoryType";
import axiosbash from '../../API/AmazonNodeAPI';
import { replace } from "formik";

// Get All Categories
export const getCategories = () => async (dispatch) => {
    dispatch({
        type: GET_CATEGORIES_REQUEST,
    });

    try {
        const res = await axiosbash.get("/getcategories");

        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_CATEGORIES_FAIL,
            payload: err.response ? err.response.data : err.message,
        });
    }
};

// Add category
export const addCategory = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            console.log("Add Category ", formData);
            const res = await axiosbash.post(`/addcategory`, formData, config);
            navigate("/admin/category");

            console.log(res.data);
            dispatch({
                type: ADD_CATEGORY,
                payload: { category: formData },
            });
        } catch (err) {
            console.log(err);
        }
    };
};

// Add category
export const updateCategory = (id, formData, navigate) => async (dispatch) => {
    // console.log(id, category);
    // return {
    //   type: UPDATE_CATEGORY,
    //   payload: { id, category },
    // };
    // console.log("formdata product  ",formData);
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const res = await axiosbash.patch(`/updatecategory/${id}`, formData, config);
        navigate("/admin/category", replace);

        console.log("responce update product ", res.data);
        dispatch({
            type: UPDATE_CATEGORY,
            payload: { category: formData },
        });
    } catch (err) {
        console.log(err);
    }
};


// Remove category
export const deleteCategory = (id, navigate) => async (dispatch) => {
    try {
        await axiosbash.delete(`/removecategory/${id}`);
        navigate('admin/category', replace)
        dispatch({
            type: DELETE_CATEGORY,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};