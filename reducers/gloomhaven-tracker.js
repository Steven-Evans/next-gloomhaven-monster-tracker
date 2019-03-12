import { fromJS } from "immutable";
import { createSelector } from "reselect";
import { actionTypes } from "../utils/constants";

// Constants
export const INITIALIZE_TRACKER_SUCCESS = "gloomhaven-tracker-setup/INITIALIZE_TRACKER_SUCCESS";
export const INITIALIZE_SSE = "gloomhaven-tracker/INITIALIZE_SSE";

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

export function initializeSSE(roomCode) {
  return {
    type: INITIALIZE_SSE,
    roomCode,
  }
}

// Reducer
function trackerReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_TRACKER_SUCCESS:
      return state.set("roomCode", action.roomCode);
    case actionTypes.INITIALIZE_SSE_SUCCESS:
      console.log("SSE connection set up");
      return state;
    default:
      return state;
  }
}

export default trackerReducer;
