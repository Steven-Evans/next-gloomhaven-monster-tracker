import { Set, fromJS } from "immutable";
import { createSelector } from "reselect";
import {INITIALIZE_TRACKER_SUCCESS} from "./gloomhaven-tracker-setup";

// Constants

// State
export const initialState = fromJS({
  roomCode: "",
  monsterClass: [
    {
      initiative: 0,
      active: true,
    }
  ]
});

// Selectors
export const selectTracker = (state) => state.get('tracker');

export const selectRoomCode = () =>
  createSelector(selectTracker, (setupState) => setupState.get('roomCode'));

// Actions
export function pageLoad(characterClasses) {
  return {
    type: CHARACTERS_CHANGED,
    characterClasses,
  }
}

export function initializeTrackerSuccess(roomCode) {
  return {
    type: INITIALIZE_TRACKER_SUCCESS,
    roomCode,
  }
}

// Reducer
function trackerReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_TRACKER_SUCCESS:
      return state.set("roomCode", action.roomCode);
    default:
      return state;
  }
}

export default trackerReducer;
