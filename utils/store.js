import {createStore} from "redux";
import { fromJS } from "immutable";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const makeStore = (initialState, options) => {
  return createStore(reducers, fromJS(initialState), composeWithDevTools());
};

export default makeStore;
