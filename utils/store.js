import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { fromJS } from "immutable";
import reducers from "../redux/reducers/root";
import epics from "../redux/epics/root";
import { composeWithDevTools } from "redux-devtools-extension";

const makeStore = (initialState) => {
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
