import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  CLEAR_ERROR,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_SINGLE_USER_FAIL,
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./UserTypes";

// import { decrypt, encrypt } from "../../Utils/Encrypt";

let user = localStorage.getItem("user");

export const userReducer = (
  state = { users: [], user: null, authUser: user ? user : null },
  action
) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
    case GET_SINGLE_USER_REQUEST:
    case ADD_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false,
      };
    case LOGIN_USER_SUCCESS:
      // if (action.payload.remember) {
      // localStorage.setItem("user", encrypt(action.payload.user));
      // }
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case UPDATE_USER_SUCCESS:
      if (action.payload.id === state.authUser.id) {
        // localStorage.setItem("user", encrypt(action.payload));
      }
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        authUser:
          action.payload.id === state.authUser.id
            ? action.payload
            : state.authUser,
        loading: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        loading: false,
      };
    case "LOGOUT_USER_SUCCESS":
      return {
        ...state,
        user: null,
      };
    case GET_ALL_USERS_FAIL:
    case GET_SINGLE_USER_FAIL:
    case ADD_USER_FAIL:
    case LOGIN_USER_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
