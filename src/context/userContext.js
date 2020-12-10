import React, { createContext, useReducer } from "react";

export const userContext = createContext();

const initialState = {
  isLoginUser: false,
  //jaga2 kedepannya mau tambah admin
  isLoginAdmin: false,
  user: null,
  loading: true,
  refreshCard: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH_CARD":
      return {
        ...state,
        refreshCard: true,
      };
    case "CARD_REFRESHED":
      return {
        ...state,
        refreshCard: false,
      };
    case "USER_LOADED":
      return {
        ...state,
        isLoginUser: true,
        user: action.payload,
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoginUser: false,
        isLoginAdmin: false,
        user: null,
        loading: false,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoginUser: true,
        isLoginAdmin: false,
        loading: false,
      };
    case "LOGIN_ADMIN":
      return {
        ...state,
        isLoginAdmin: true,
        isLoginUser: false,
        loading: false,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLoginUser: false,
        isLoginAdmin: false,
        user: null,
        loading: false,
      };
    default:
      throw new Error();
  }
};

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <userContext.Provider value={[state, dispatch]}>
      {props.children}
    </userContext.Provider>
  );
};
