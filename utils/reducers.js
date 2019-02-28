import { combineReducers } from 'redux-immutable';

import trackerSetupReducer from "../reducers/gloomhaven-tracker-setup";
import trackerReducer from "../reducers/gloomhaven-tracker";

const rootReducer = combineReducers({
  setup: trackerSetupReducer,
  tracker: trackerReducer,
});

export default rootReducer;
