import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        isLoading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        isLoading: false,
      };
    case REGISTER_USER_FAIL:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        isLoading: true,
        isAuthenticated: false,
      };
    case LOGIN_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_USER_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        isLoading:false,
        isAuthenticated:false,
        user:null,
        error:null
      }
    default:
      return state;
  }
};
