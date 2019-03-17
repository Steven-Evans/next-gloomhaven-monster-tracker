import Router from 'next/router';
import { fromJS } from "immutable";
import { createSelector } from "reselect";
import { actionTypes } from "../utils/constants";

// Constants
export const INITIALIZE_TRACKER_SUCCESS = "gloomhaven-tracker-setup/INITIALIZE_TRACKER_SUCCESS";
export const INITIALIZE_SSE = "gloomhaven-tracker/INITIALIZE_SSE";

// State
export const initialState = fromJS({
  roomCode: "",
  sseConnected: false,
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
      Router.push(`/gloomhaven-tracker/?roomCode=${action.roomCode}`, `/gloomhaven-tracker/${action.roomCode}`, { shallow: true }).then((val) => console.log("router promise", val));
      return state.set("roomCode", action.roomCode);
    case actionTypes.INITIALIZE_SSE_SUCCESS:
      return state.set("sseConnected", true);
    default:
      return state;
  }
}

export default trackerReducer;
