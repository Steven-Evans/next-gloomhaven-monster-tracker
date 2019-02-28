import { Set, fromJS } from "immutable";
import { createSelector } from "reselect";

// Constants

// State
export const initialState = fromJS({
  monsterClass: [
    {
      initiative: 0,
      active: true,
    }
  ]
});

// Actions
export function pageLoad(characterClasses) {
  return {
    type: CHARACTERS_CHANGED,
    characterClasses,
  }
}

// Reducer
function trackerReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default trackerReducer;
