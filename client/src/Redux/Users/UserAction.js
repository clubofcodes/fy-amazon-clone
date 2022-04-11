import { replace } from "formik";
import axiosbash from "../../API/AmazonNodeAPI";
import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_SINGLE_USER_FAIL,
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  LOGOUT,
  CLEAR_ERROR,
} from "./UserTypes";

// Get All Users
export const getUsers = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_USERS_REQUEST,
  });

  try {
    const res = await axiosbash.get("/getusers");
    const filtUser = res.data.filter((val, index) => val.activeUser)
    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: filtUser,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: err.response ? err.response.data : err.message,
    });
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }
};

// Get User by ID
export const getSingleUser = (id) => async (dispatch) => {
  dispatch({
    type: GET_SINGLE_USER_REQUEST,
  });

  try {
    const res = await axiosbash.get(`/users/${id}`);

    dispatch({
      type: GET_SINGLE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SINGLE_USER_FAIL,
      payload: err.response ? err.response.data : err.message,
    });
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }
};

//Add User
export const addUser = ({ formData, navigate }) => async (dispatch) => {
  console.log("adduser ", formData);
  // const data = {
  //   email: formData.email,
  //   username: formData.username,
  //   password: formData.password,
  //   name: {
  //     firstname: formData.firstname,
  //     lastname: formData.lastname,
  //   },
  //   address: {
  //     city: formData.city,
  //     street: formData.street,
  //     number: formData.number,
  //     zipcode: formData.zipcode,
  //     geolocation: {
  //       lat: formData.geolocation.coordinates
  //         ? formData.geolocation.coordinates.lat
  //         : "22.2323345344",
  //       long: formData.geolocation.coordinates
  //         ? formData.geolocation.coordinates.lng
  //         : "22.435355345",
  //     },
  //   },
  //   phone: formData.phone,
  // };
  // console.log("userAction insert",data);
  dispatch({
    type: ADD_USER_REQUEST,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axiosbash.post("/register", formData, config);
    console.log({ ...formData, id: res.data.id });

    dispatch({
      type: ADD_USER_SUCCESS,
      payload: { ...res.data },
    });

    navigate("/login");
  } catch (err) {
    dispatch({
      type: ADD_USER_FAIL,
      payload: err.response ? err.response.data : err.message,
    });
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }
};

// Login User
export const loginUser = (formData, navigate = null) => async (dispatch) => {
  const data = {
    email: formData.email,
    password: formData.password,
  };

  dispatch({
    type: LOGIN_USER_REQUEST,
  });

  try {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
<<<<<<< HEAD
=======
    const res = await axiosbash.post("/auth/login", data, config);
    console.log("/login   ",res.data);
>>>>>>> disha

    const logedInUserRes = await axiosbash.patch("/login", data, config);
    console.log(logedInUserRes);

<<<<<<< HEAD
    const isAdmin = logedInUserRes?.data.userRole.toLowerCase().includes("admin");
=======
    const isAdmin =
      loggedinUser.username.includes("admin")
    console.log("/login isadmin ",isAdmin);
>>>>>>> disha

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: logedInUserRes.data
    });

    isAdmin ? navigate("/admin") : navigate("/")

    // dispatch(getValidateUser());

<<<<<<< HEAD
=======
    console.log();
    if (loggedinUser) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user: loggedinUser, },
      });
      if (loggedinUser.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      throw new Error("User not found");
    }
>>>>>>> disha
  } catch (err) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: err.response ? err.response.data : err.message,
    });
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }
};

export const getValidateUser = () => async (dispatch) => {
  console.log("Called");

  // const validUserResponse = await fetch("/validuser", {
  //   method: "GET",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   },
  //   credentials: "include"
  // });

  try {
    const config = {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    const validUserResponse = await axiosbash.get("/validuser", config);

    console.log("Data: ", validUserResponse?.data);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: validUserResponse.data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: err.response ? err.response.data : err.message,
    });
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }
  // (validUserResponse.status !== 200) ? console.log("First login") : setUserData(validUserData);
};

// Update User
export const updateUser = (id, formData = [], navigate) => async (dispatch) => {
  console.log("formdata update user  ", formData, id);
  dispatch({
    type: UPDATE_USER_REQUEST,
  });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(formData.length);
    const res = formData.length === 0 ? await axiosbash.patch(`/updateuser/${id}/false`, config)
      : await axiosbash.patch(`/updateuser/${id}/true`, formData, config);
    dispatch(getUsers())
    console.log("responce ", res);
    navigate('/admin/users', replace)
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: { ...formData, id: res.data.id },
    });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: err.response ? err.response.data : err.message,
    });
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }
};

// Delete User
export const deleteUser = (id, navigate) => async (dispatch) => {
  dispatch({
    type: DELETE_USER_REQUEST,
  });

  try {
    await axiosbash.delete(`/users/${id}/false`);
    navigate('/admin/users');
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: err.response ? err.response.data : err.message,
    });
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }
};

// LOGOUT User
export const logout = (navigate) => async (dispatch) => {

  try {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const x = await axiosbash.get("/logout", config);
    console.log(x);

    if (navigate) navigate("/", { replace: true });

    dispatch({
      type: "LOGOUT_USER_SUCCESS"
    });

  } catch (err) {

    dispatch({
      type: "LOGOUT_USER_FAIL",
      payload: err.response && err.message,
    });
    setTimeout(() => {
      dispatch(clearError());
    }, 5000);
  }
};

const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
