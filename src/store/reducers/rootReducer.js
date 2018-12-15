import authReducer from "./authReducer";
import clientReducer from "./clientReducer";
import productReducer from "./productReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  client: clientReducer,
  product: productReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
