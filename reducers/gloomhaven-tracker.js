import Router from 'next/router';
import { fromJS } from "immutable";
import { createSelector } from "reselect";
import { actionTypes } from "../utils/constants";
import { transformMonsterNamesToState, monstersFromScenarioOrSelect } from "../utils/monster";
import { transformCharacterNamesToState } from "../utils/character";
import { INITIALIZE_TRACKER, selectScenarioLevel } from "./gloomhaven-tracker-setup";

// Constants
export const INITIALIZE_TRACKER_SUCCESS = "gloomhaven-tracker-setup/INITIALIZE_TRACKER_SUCCESS";
export const INITIALIZE_SSE = "gloomhaven-tracker/INITIALIZE_SSE";

// State
export const initialState = fromJS({
  roomCode: "",
  sseConnected: false,
  characters: {},
  monsters: {}
});

// Selectors
export const selectTracker = (state) => state.get('tracker');

export const selectCharacters = (state) => selectTracker(state).get('characters');

export const selectMonsters = (state) => selectTracker(state).get('monsters');

export const selectRoomCode = (state) => selectTracker(state).get('roomCode');

export const selectMonsterNames = () =>
  createSelector(selectTracker, (trackerState) => trackerState.get('monsters').keySeq());

export const selectClassesByInitiative = createSelector([selectCharacters, selectMonsters], (characters, monsters) => {
  return Object.values(characters).concat(Object.values(monsters)).sort((a, b) => {
    const difference = a.initiative - b.initiative;
    if (difference === 0) {
      if (!!a.active && !b.active) {
        return 1;
      } else if (!!b.active && !a.active) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return difference;
    }
  });
});

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
    case INITIALIZE_TRACKER:
      return state
        .set("characters", transformCharacterNamesToState(action.body.characterClasses))
        .set("monsters", transformMonsterNamesToState(monstersFromScenarioOrSelect(action.body.scenarioNumber, action.body.monsterClasses)));
    case INITIALIZE_TRACKER_SUCCESS:
      Router.push(`/gloomhaven-tracker?roomCode=${action.roomCode}`, `/gloomhaven-tracker/${action.roomCode}`, { shallow: true });
      return state.set("roomCode", action.roomCode);
    case actionTypes.INITIALIZE_SSE_SUCCESS:
      return state.set("sseConnected", true);
    default:
      return state;
  }
}

export default trackerReducer;
