import Router from 'next/router';
import { fromJS } from "immutable";
import { createSelector } from "reselect";
import { actionTypes } from "../utils/constants";
import { createNewMonster, transformMonsterNamesToState, monstersFromScenarioOrSelect } from "../utils/monster";
import { transformCharacterNamesToState } from "../utils/character";
import { INITIALIZE_TRACKER, selectScenarioLevel } from "./gloomhaven-tracker-setup";

// Constants
export const INITIALIZE_TRACKER_SUCCESS = "gloomhaven-tracker-setup/INITIALIZE_TRACKER_SUCCESS";
export const INITIALIZE_SSE = "gloomhaven-tracker/INITIALIZE_SSE";
export const UPDATE_CHARACTER_EXPERIENCE = "gloomhaven-tracker/UPDATE_CHARACTER_EXPERIENCE";
export const INCREMENT_CHARACTER_EXPERIENCE = "gloomhaven-tracker/INCREMENT_CHARACTER_EXPERIENCE";
export const DECREMENT_CHARACTER_EXPERIENCE = "gloomhaven-tracker/DECREMENT_CHARACTER_EXPERIENCE";
export const UPDATE_CHARACTER_EXPERIENCE_SUCCESS = "gloomhaven-tracker/UPDATE_CHARACTER_EXPERIENCE_SUCCESS";
export const UPDATE_CHARACTER_EXPERIENCE_FAILURE = "gloomhaven-tracker/UPDATE_CHARACTER_EXPERIENCE_FAILURE";
export const UPDATE_CHARACTER_HEALTH = "gloomhaven-tracker/UPDATE_CHARACTER_HEALTH";
export const INCREMENT_CHARACTER_HEALTH = "gloomhaven-tracker/INCREMENT_CHARACTER_HEALTH";
export const DECREMENT_CHARACTER_HEALTH = "gloomhaven-tracker/DECREMENT_CHARACTER_HEALTH";
export const UPDATE_CHARACTER_HEALTH_SUCCESS = "gloomhaven-tracker/UPDATE_CHARACTER_HEALTH_SUCCESS";
export const UPDATE_CHARACTER_HEALTH_FAILURE = "gloomhaven-tracker/UPDATE_CHARACTER_HEALTH_FAILURE";
export const UPDATE_CHARACTER_INITIATIVE = "gloomhaven-tracker/UPDATE_CHARACTER_INITIATIVE";
export const UPDATE_CHARACTER_INITIATIVE_SUCCESS = "gloomhaven-tracker/UPDATE_CHARACTER_INITIATIVE_SUCCESS";
export const UPDATE_CHARACTER_INITIATIVE_FAILURE = "gloomhaven-tracker/UPDATE_CHARACTER_INITIATIVE_FAILURE";
export const UPDATE_CHARACTER_STATUS_EFFECT = "gloomhaven-tracker/UPDATE_CHARACTER_STATUS_EFFECT";
export const UPDATE_CHARACTER_STATUS_EFFECT_SUCCESS = "gloomhaven-tracker/UPDATE_CHARACTER_STATUS_EFFECT_SUCCESS";
export const UPDATE_CHARACTER_STATUS_EFFECT_FAILURE = "gloomhaven-tracker/UPDATE_CHARACTER_STATUS_EFFECT_FAILURE";

export const CREATE_ACTIVE_MONSTER = "gloomhaven-tracker/CREATE_ACTIVE_MONSTER";
export const CREATE_ACTIVE_MONSTER_SUCCESS = "gloomhaven-tracker/CREATE_ACTIVE_MONSTER_SUCCESS";
export const CREATE_ACTIVE_MONSTER_FAILURE = "gloomhaven-tracker/CREATE_ACTIVE_MONSTER_FAILURE";
export const UPDATE_MONSTER_INITIATIVE = "gloomhaven-tracker/UPDATE_MONSTER_INITIATIVE";
export const UPDATE_MONSTER_INITIATIVE_SUCCESS = "gloomhaven-tracker/UPDATE_MONSTER_INITIATIVE_SUCCESS";
export const UPDATE_MONSTER_INITIATIVE_FAILURE = "gloomhaven-tracker/UPDATE_MONSTER_INITIATIVE_FAILURE";
export const UPDATE_MONSTER_HEALTH = "gloomhaven-tracker/UPDATE_MONSTER_HEALTH";
export const INCREMENT_MONSTER_HEALTH = "gloomhaven-tracker/INCREMENT_MONSTER_HEALTH";
export const DECREMENT_MONSTER_HEALTH = "gloomhaven-tracker/DECREMENT_MONSTER_HEALTH";
export const UPDATE_MONSTER_HEALTH_SUCCESS = "gloomhaven-tracker/UPDATE_MONSTER_HEALTH_SUCCESS";
export const UPDATE_MONSTER_HEALTH_FAILURE = "gloomhaven-tracker/UPDATE_MONSTER_HEALTH_FAILURE";
export const UPDATE_MONSTER_STATUS_EFFECT = "gloomhaven-tracker/UPDATE_MONSTER_STATUS_EFFECT";
export const UPDATE_MONSTER_STATUS_EFFECT_SUCCESS = "gloomhaven-tracker/UPDATE_MONSTER_STATUS_EFFECT_SUCCESS";
export const UPDATE_MONSTER_STATUS_EFFECT_FAILURE = "gloomhaven-tracker/UPDATE_MONSTER_STATUS_EFFECT_FAILURE";
export const DELETE_ACTIVE_MONSTER = "gloomhaven-tracker/DELETE_ACTIVE_MONSTER";
export const DELETE_ACTIVE_MONSTER_SUCCESS = "gloomhaven-tracker/DELETE_ACTIVE_MONSTER_SUCCESS";
export const DELETE_ACTIVE_MONSTER_FAILURE = "gloomhaven-tracker/DELETE_ACTIVE_MONSTER_FAILURE";
export const UPDATE_NEW_MONSTER_DIALOGUE = "gloomhaven-tracker/UPDATE_NEW_MONSTER_DIALOGUE";

// State
export const initialState = fromJS({
  roomCode: "",
  newMonsterDialogue: {
    open: false,
    type: "",
  },
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

export const selectActiveMonster = (monsterName, standeeNumber) => (state) => selectMonster(monsterName)(state).active[standeeNumber];

export const selectNewMonsterDialogueOpen = (state) => selectTracker(state).getIn(['newMonsterDialogue', 'open']);

export const selectNewMonsterType = (state) => selectTracker(state).getIn(['newMonsterDialogue', 'type']);

export const selectMonsterByNewType = (state) => selectMonster(selectNewMonsterType(state))(state);

export const selectMonsterNames = () =>
  createSelector(selectTracker, (trackerState) => trackerState.get('monsters').keySeq());

export const selectClassesByInitiative = createSelector([selectCharacters, selectMonsters], (characters, monsters) => {
  return Object.entries(characters).concat(Object.entries(monsters)).sort((a, b) => {
    const difference = a[1].initiative - b[1].initiative;
    if (difference === 0) {
      if (!!a[1].active && !b[1].active) {
        return 1;
      } else if (!!b[1].active && !a[1].active) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return difference;
    }
  });
});

export const selectActiveStandees = createSelector(selectMonsterByNewType, (monster) => {
  return !!monster ? Object.keys(monster.active) : [];
});

export const makeSelectSortedActiveMonsters = (monsterName) => createSelector([selectMonster(monsterName)], (monster) => {
  return Object.entries(monster.active).filter(standee => standee[1].elite).concat(Object.entries(monster.active).filter(standee => !standee[1].elite));
});

// Actions
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
export function updateCharacterExperienceSuccess() {
  return {
    type: UPDATE_CHARACTER_EXPERIENCE_SUCCESS,
  }
}

export function updateCharacterExperienceFailure(error) {
  return {
    type: UPDATE_CHARACTER_EXPERIENCE_FAILURE,
    error,
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

export function updateCharacterHealthSuccess() {
  return {
    type: UPDATE_CHARACTER_HEALTH_SUCCESS,
  }
}

export function updateCharacterHealthFailure(error) {
  return {
    type: UPDATE_CHARACTER_HEALTH_FAILURE,
    error,
  }
}

export function updateCharacterInitiative(characterName, initiative) {
  return {
    type: UPDATE_CHARACTER_INITIATIVE,
    characterName,
    initiative,
  }
}

export function updateCharacterInitiativeSuccess() {
  return {
    type: UPDATE_CHARACTER_INITIATIVE_SUCCESS,
  }
}

export function updateCharacterInitiativeFailure(error) {
  return {
    type: UPDATE_CHARACTER_INITIATIVE_FAILURE,
    error,
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

export function updateCharacterStatusEffectSuccess() {
  return {
    type: UPDATE_CHARACTER_STATUS_EFFECT_SUCCESS,
  }
}

export function updateCharacterStatusEffectFailure(error) {
  return {
    type: UPDATE_CHARACTER_STATUS_EFFECT_FAILURE,
    error,
  }
}

export function createMonster(standeeNumber, monsterName, elite, scenarioLevel) {
  return {
    type: CREATE_ACTIVE_MONSTER,
    standeeNumber,
    monsterName,
    elite,
    scenarioLevel,
  }
}

export function createActiveMonsterSuccess() {
  return {
    type: CREATE_ACTIVE_MONSTER_SUCCESS,
  }
}

export function createActiveMonsterFailure(error) {
  return {
    type: CREATE_ACTIVE_MONSTER_FAILURE,
    error,
  }
}

export function updateMonsterInitiative(monsterName, initiative) {
  return {
    type: UPDATE_MONSTER_INITIATIVE,
    monsterName,
    initiative,
  }
}

export function updateMonsterInitiativeSuccess() {
  return {
    type: UPDATE_MONSTER_INITIATIVE_SUCCESS,
  }
}

export function updateMonsterInitiativeFailure(error) {
  return {
    type: UPDATE_MONSTER_INITIATIVE_FAILURE,
    error,
  }
}

export function updateMonsterHealth(standeeNumber, monsterName, currentHealth) {
  return {
    type: UPDATE_MONSTER_HEALTH,
    standeeNumber,
    monsterName,
    currentHealth
  }
}

export function incrementMonsterHealth(standeeNumber, monsterName) {
  return {
    type: INCREMENT_MONSTER_HEALTH,
    standeeNumber,
    monsterName,
  }
}

export function decrementMonsterHealth(standeeNumber, monsterName) {
  return {
    type: DECREMENT_MONSTER_HEALTH,
    standeeNumber,
    monsterName,
  }
}

export function updateMonsterHealthSuccess() {
  return {
    type: UPDATE_MONSTER_HEALTH_SUCCESS,
  }
}

export function updateMonsterHealthFailure(error) {
  return {
    type: UPDATE_MONSTER_HEALTH_FAILURE,
    error,
  }
}

export function updateMonsterStatusEffect(monsterName, standeeNumber, statusEffect, checked) {
  return {
    type: UPDATE_MONSTER_STATUS_EFFECT,
    monsterName,
    standeeNumber,
    statusEffect,
    checked,
  }
}

export function updateMonsterStatusEffectSuccess() {
  return {
    type: UPDATE_MONSTER_STATUS_EFFECT_SUCCESS,
  }
}

export function updateMonsterStatusEffectFailure(error) {
  return {
    type: UPDATE_MONSTER_STATUS_EFFECT_FAILURE,
    error,
  }
}

export function deleteActiveMonster(standeeNumber, monsterName) {
  return {
    type: DELETE_ACTIVE_MONSTER,
    standeeNumber,
    monsterName,
  }
}

export function deleteActiveMonsterSuccess() {
  return {
    type: DELETE_ACTIVE_MONSTER_SUCCESS,
  }
}

export function deleteActiveMonsterFailure(error) {
  return {
    type: DELETE_ACTIVE_MONSTER_FAILURE,
    error,
  }
}

export function updateNewMonsterDialogue(monsterType, open) {
  return {
    type: UPDATE_NEW_MONSTER_DIALOGUE,
    monsterType,
    open,
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
    case CREATE_ACTIVE_MONSTER:
      const newMonsterType = action.monsterType || state.getIn(['newMonsterDialogue', 'type']);
      keyPath = ["monsters", newMonsterType, "active", action.standeeNumber];
      return state
        .setIn(keyPath, createNewMonster(newMonsterType, action.standeeNumber, action.elite, action.scenarioLevel))
        .setIn(['newMonsterDialogue', 'open'], false);
    case UPDATE_MONSTER_INITIATIVE:
      nextVal = parseInt(action.initiative);
      return state.setIn(["monsters", action.monsterName, "initiative"], numberOrEmpty(nextVal));
    case UPDATE_MONSTER_HEALTH:
      nextVal = parseInt(action.currentHealth);
      return state.setIn(["monsters", action.monsterName, "active", action.standeeNumber, "currentHealth"], numberOrEmpty(nextVal));
    case INCREMENT_MONSTER_HEALTH:
      keyPath = ["monsters", action.monsterName, "active", action.standeeNumber, "currentHealth"];
      nextVal = parseInt(state.getIn(keyPath)) + 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case DECREMENT_MONSTER_HEALTH:
      keyPath = ["monsters", action.monsterName, "active", action.standeeNumber, "currentHealth"];
      nextVal = parseInt(state.getIn(keyPath)) - 1;
      return state.setIn(keyPath, numberOrEmpty(nextVal));
    case DELETE_ACTIVE_MONSTER:
      keyPath = ["monsters", action.monsterName, "active", action.standeeNumber];
      return state.deleteIn(keyPath);
    case UPDATE_MONSTER_STATUS_EFFECT:
      keyPath = ["monsters", action.monsterName, "active", action.standeeNumber, "statusEffects", action.statusEffect];
      return state.setIn(keyPath, action.checked);
    case UPDATE_NEW_MONSTER_DIALOGUE:
      return state
        .setIn(["newMonsterDialogue", "type"], action.monsterType)
        .setIn(["newMonsterDialogue", "open"], action.open);
    default:
      return state;
  }
}

export default trackerReducer;
