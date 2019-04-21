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
export const UPDATE_CHARACTER_EXPERIENCE = "gloomhaven-tracker/UPDATE_CHARACTER_EXPERIENCE";
export const INCREMENT_CHARACTER_EXPERIENCE = "gloomhaven-tracker/INCREMENT_CHARACTER_EXPERIENCE";
export const DECREMENT_CHARACTER_EXPERIENCE = "gloomhaven-tracker/DECREMENT_CHARACTER_EXPERIENCE";
export const UPDATE_CHARACTER_HEALTH = "gloomhaven-tracker/UPDATE_CHARACTER_HEALTH";
export const INCREMENT_CHARACTER_HEALTH = "gloomhaven-tracker/INCREMENT_CHARACTER_HEALTH";
export const DECREMENT_CHARACTER_HEALTH = "gloomhaven-tracker/DECREMENT_CHARACTER_HEALTH";
export const UPDATE_CHARACTER_INITIATIVE = "gloomhaven-tracker/UPDATE_CHARACTER_INITIATIVE";
export const UPDATE_CHARACTER_STATUS_EFFECT = "gloomhaven-tracker/UPDATE_CHARACTER_STATUS_EFFECT";

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

export const selectMonster = (monsterName) => (state) => selectMonsters(state)[monsterName];

export const selectCharacter = (characterName) => (state) => selectCharacters(state)[characterName];



/*
export const selectMonsterByName = (monsterName) =>
  createSelector(selectMonsters, (monstersState) => monstersState[monsterName]);

export const selectCharacterByName = (characterName) =>
  createSelector(selectCharacters, (characterState) => characterState[characterName]);
*/

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
/*export function pageLoad(characterClasses) {
  return {
    type: CHARACTERS_CHANGED,
    characterClasses,
  }
}*/

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

export function updateCharacterExperience(characterName, experience) {
  return {
    type: UPDATE_CHARACTER_EXPERIENCE,
    characterName,
    experience,
  }
}

export function incrementCharacterExperience(characterName) {
  return {
    type: INCREMENT_CHARACTER_EXPERIENCE,
    characterName,
  }
}

export function decrementCharacterExperience(characterName) {
  return {
    type: DECREMENT_CHARACTER_EXPERIENCE,
    characterName,
  }
}

export function updateCharacterHealth(characterName, currentHealth) {
  return {
    type: UPDATE_CHARACTER_HEALTH,
    characterName,
    currentHealth
  }
}

export function incrementCharacterHealth(characterName) {
  return {
    type: INCREMENT_CHARACTER_HEALTH,
    characterName,
  }
}

export function decrementCharacterHealth(characterName) {
  return {
    type: DECREMENT_CHARACTER_HEALTH,
    characterName,
  }
}

export function updateCharacterInitiative(characterName, initiative) {
  return {
    type: UPDATE_CHARACTER_INITIATIVE,
    characterName,
    initiative,
  }
}

export function updateCharacterStatusEffect(characterName, statusEffect, checked) {
  return {
    type: UPDATE_CHARACTER_STATUS_EFFECT,
    characterName,
    statusEffect,
    checked,
  }
}

// Reducer
function numberOrEmpty(stateVal) {
  return isNaN(stateVal) ? "" : stateVal;
}

function trackerReducer(state = initialState, action) {
  let keyPath, nextVal;
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
    case UPDATE_CHARACTER_EXPERIENCE:
      nextVal = parseInt(action.experience);
      return state.setIn(["characters", action.characterName, "experience"], numberOrEmpty(nextVal));
    case INCREMENT_CHARACTER_EXPERIENCE:
      keyPath = ["characters", action.characterName, "experience"];
      nextVal = parseInt(state.getIn(keyPath)) + 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case DECREMENT_CHARACTER_EXPERIENCE:
      keyPath = ["characters", action.characterName, "experience"];
      nextVal = parseInt(state.getIn(keyPath)) - 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case UPDATE_CHARACTER_HEALTH:
      nextVal = parseInt(action.currentHealth);
      return state.setIn(["characters", action.characterName, "currentHealth"], numberOrEmpty(nextVal));
    case INCREMENT_CHARACTER_HEALTH:
      keyPath = ["characters", action.characterName, "currentHealth"];
      nextVal = parseInt(state.getIn(keyPath)) + 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case DECREMENT_CHARACTER_HEALTH:
      keyPath = ["characters", action.characterName, "currentHealth"];
      nextVal = parseInt(state.getIn(keyPath)) - 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case UPDATE_CHARACTER_INITIATIVE:
      nextVal = parseInt(action.initiative);
      return state.setIn(["characters", action.characterName, "initiative"], numberOrEmpty(nextVal));
    case UPDATE_CHARACTER_STATUS_EFFECT:
      keyPath = ["characters", action.characterName, "statusEffects", action.statusEffect];
      return state.setIn(keyPath, action.checked);
    default:
      return state;
  }
}

export default trackerReducer;
