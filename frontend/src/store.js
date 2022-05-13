import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { taskReducer } from "./reducers/taskReducers";
import {
  userReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
  registerUser: userRegisterReducer,
  user: userReducer,
  task: taskReducer,
});

const initialState = {};

const store = legacy_createStore(reducers, initialState,composeWithDevTools(applyMiddleware(thunk)));

export default store;
