import {createStore} from "redux";
import { fromJS } from "immutable";
import reducers from "./reducers";

const makeStore = (initialState, options) => {
  return createStore(reducers, fromJS(initialState));
};

export default makeStore;
