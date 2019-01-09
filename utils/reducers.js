import { combineReducers } from 'redux-immutable';

import trackerSetupReducer from "../reducers/gloomhaven-tracker-setup";

console.log('setupReducer', trackerSetupReducer, );

const rootReducer = combineReducers({
  setup: trackerSetupReducer,
});

export default rootReducer;
