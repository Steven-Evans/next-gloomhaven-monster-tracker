import { combineReducers } from 'redux-immutable';

import trackerSetupReducer from "./gloomhaven-tracker-setup";
import trackerReducer from "./gloomhaven-tracker";

const root = combineReducers({
  setup: trackerSetupReducer,
  tracker: trackerReducer,
});

export default root;
