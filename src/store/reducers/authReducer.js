const initSate = {
  authError: null
};

const authReducer = (state = initSate, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("Login error");
      return {
        ...state,
        authError: "Login failed",
        validatingAuth: false
      };
    case "LOGIN_SUCCESS":
      console.log("Login success");
      return {
        ...state,
        authError: null,
        validatingAuth: false
      };
    case "SIGNOUT_SUCCESS":
      console.log("SignOut Success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("SignUp Success");
      return {
        ...state,
        authError: null,
        validatingAuth: false
      };
    case "SIGNUP_ERROR":
      console.log("SingUp Error");
      return {
        ...state,
        authError: action.err.message,
        validatingAuth: false
      };
    case "VALIDATING_AUTH":
      return {
        ...state,
        authError: null,
        validatingAuth: true
      };
    default:
      return state;
  }
};

export default authReducer;
