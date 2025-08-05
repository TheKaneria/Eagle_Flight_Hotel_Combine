import {
  REGISTER_CUSTOMER_BEGIN,
  REGISTER_CUSTOMER_SUCCESS,
  REGISTER_CUSTOMER_FAIL,
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_OTP_BEGIN,
  FORGOT_PASSWORD_OTP_SUCCESS,
  FORGOT_PASSWORD_OTP_FAIL,
  LOGIN_BEGIN_AIR_LIVE,
  LOGIN_SUCCESS_AIR_LIVE,
  LOGIN_FAIL_AIR_LIVE,
  GET_CANCELLATION_POLICY_SUCCESS,
  GET_CANCELLATION_POLICY_ERROR,
  GET_CANCELLATION_POLICY_BEGIN,
  GET_CURRENT_ACCOUNT_BALANCE_BEGIN,
  GET_CURRENT_ACCOUNT_BALANCE_SUCCESS,
  GET_CURRENT_ACCOUNT_BALANCE_ERROR,
  GET_COMPANY_LIST_BEGIN,
  GET_COMPANY_LIST_SUCCESS,
  GET_COMPANY_LIST_ERROR,
} from "../Actions";

const auth_reducer = (state, action) => {
  // register customer

  if (action.type === REGISTER_CUSTOMER_BEGIN) {
    return { ...state, register_customer_loading: true };
  }

  if (action.type === REGISTER_CUSTOMER_SUCCESS) {
    return {
      ...state,
      register_customer_loading: false,
      register_customer_data: action.payload,
      // contact_number: action.payload.data.contact_number,
    };
  }

  if (action.type === REGISTER_CUSTOMER_FAIL) {
    return { ...state, register_customer_loading: false };
  }

  // User login api
  if (action.type === LOGIN_BEGIN) {
    return { ...state, login_loading: true };
  }

  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      login_loading: false,
      login_data: action.payload.data,
      is_token: action.payload.token,
    };
  }

  if (action.type === LOGIN_FAIL) {
    return { ...state, login_loading: false, login_error: true };
  }

  if (action.type === GET_COMPANY_LIST_BEGIN) {
    return { ...state, getcompanylist_loading: true };
  }

  if (action.type === GET_COMPANY_LIST_SUCCESS) {
    return {
      ...state,
      getcompanylist_loading: false,
      getcompanylist_data: action.payload,
    };
  }

  if (action.type === GET_COMPANY_LIST_ERROR) {
    return { ...state, getcompanylist_loading: false };
  }

  // User login api
  if (action.type === LOGIN_BEGIN_AIR_LIVE) {
    return { ...state, login_loading: true };
  }

  if (action.type === LOGIN_SUCCESS_AIR_LIVE) {
    return {
      ...state,
      login_loading: false,
      login_data_air_live: action.payload.data,
      is_token_air_live: action.payload.Token,
    };
  }

  if (action.type === LOGIN_FAIL_AIR_LIVE) {
    return { ...state, login_loading: false, login_error: true };
  }

  // forgot password api
  if (action.type === FORGOT_PASSWORD_BEGIN) {
    return { ...state, forgot_password_loading: true };
  }

  if (action.type === FORGOT_PASSWORD_SUCCESS) {
    return {
      ...state,
      forgot_password_loading: false,
    };
  }

  if (action.type === FORGOT_PASSWORD_FAIL) {
    return { ...state, forgot_password_loading: false };
  }

  if (action.type === FORGOT_PASSWORD_OTP_BEGIN) {
    return { ...state, forgot_password_otp_loading: false };
  }

  // forgot password api
  if (action.type === FORGOT_PASSWORD_OTP_SUCCESS) {
    return { ...state, forgot_password_otp_loading: true };
  }

  if (action.type === FORGOT_PASSWORD_OTP_FAIL) {
    return {
      ...state,
      forgot_password_otp_loading: false,
    };
  }

  // Cancellation login api

  if (action.type === GET_CANCELLATION_POLICY_BEGIN) {
    return { ...state, cancellation_policy_loading: true };
  }

  if (action.type === GET_CANCELLATION_POLICY_SUCCESS) {
    return {
      ...state,
      cancellation_policy_loading: false,
      cancellation_policy: action.payload,
    };
  }

  if (action.type === GET_CANCELLATION_POLICY_ERROR) {
    return { ...state, cancellation_policy_loading: false };
  }

  // Cancellation login api

  if (action.type === GET_CURRENT_ACCOUNT_BALANCE_BEGIN) {
    return { ...state, currentaccountbalanceloading: true };
  }

  if (action.type === GET_CURRENT_ACCOUNT_BALANCE_SUCCESS) {
    return {
      ...state,
      currentaccountbalanceloading: false,
      currentaccountbalance: action.payload,
    };
  }

  if (action.type === GET_CURRENT_ACCOUNT_BALANCE_ERROR) {
    return { ...state, currentaccountbalanceloading: false };
  }
};

export default auth_reducer;
