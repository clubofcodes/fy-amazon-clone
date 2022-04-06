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

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: res.data,
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
export const addUser =
  ({ formData, navigate, shouldNavigate }) =>
  async (dispatch) => {
    console.log("adduser ",formData);
    const data = {
      email: formData.email,
      fullname: formData.fullname,
      password: formData.password,
      mNumber: formData.mNumber,
    };
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
    console.log("userAction insert",data);
    // dispatch({
    //   type: ADD_USER_REQUEST,
    // });

    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const res = await axiosbash.post("/users", data, config);
    //   console.log({ ...data, id: res.data.id });

    //   dispatch({
    //     type: ADD_USER_SUCCESS,
    //     payload: { ...data, id: res.data.id },
    //   });

    //   if (shouldNavigate) navigate("/login");
    // } catch (err) {
    //   dispatch({
    //     type: ADD_USER_FAIL,
    //     payload: err.response ? err.response.data : err.message,
    //   });
    //   setTimeout(() => {
    //     dispatch(clearError());
    //   }, 5000);
    // }
  };

// Login User
export const loginUser = (formData, navigate) => async (dispatch, getState) => {
  const data = {
    username: formData.username,
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
    const res = await axiosbash.post("/auth/login", data, config);
    console.log(res.data);

    const users = getState().userList.users;
    const loggedinUser = users.find(
      (item) =>
        item.username === data.username && item.password === data.password
    );

    const isAdmin =
      loggedinUser.username.includes("admin")
    console.log(isAdmin);

    loggedinUser.isAdmin = isAdmin;

    if (loggedinUser) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user: loggedinUser, remember: formData.remember },
      });
      if (loggedinUser.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      throw new Error("User not found");
    }
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

// Update User
export const updateUser =
  (id, formData ) =>
  async (dispatch) => {
    console.log("formdata update user  ", formData, id);
    const data = {
      email: formData.email,
      fullname: formData.fullname,
      password: formData.password,
      phone: formData.mNumber,
      userRole: formData.userRole
    };
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axiosbash.patch(`/updateuser/${id}`, data, config);

      const isAdmin =
        data.userRole.includes("admin")

      data.isAdmin = isAdmin;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { ...data, id: res.data.id },
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
export const deleteUser = (id) => async (dispatch) => {
  console.log(id);
  dispatch({
    type: DELETE_USER_REQUEST,
  });

  try {
    await axiosbash.delete(`/users/${id}`);

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
export const logout = () => {
  return {
    type: LOGOUT,
  };
};

const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
