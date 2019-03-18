import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { fromJS } from "immutable";
import reducers from "../reducers/root";
import epics from "../epics/root";
import { composeWithDevTools } from "redux-devtools-extension";

const makeStore = (initialState, options) => {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(reducers, fromJS(initialState),
    composeWithDevTools(
      applyMiddleware(epicMiddleware)
    )
  );

  epicMiddleware.run(epics);

  return store
};

export default makeStore;
