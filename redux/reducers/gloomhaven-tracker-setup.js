import { Set, fromJS } from "immutable";
import { createSelector } from "reselect";

// Constants
export const UPDATE_CHARACTERS = "gloomhaven-tracker-setup/UPDATE_CHARACTERS";
export const UPDATE_MONSTERS = "gloomhaven-tracker-setup/UPDATE_MONSTERS";
export const SCENARIO_NUMBER_UPDATED = "gloomhaven-tracker-setup/SCENARIO_NUMBER_UPDATED";
export const SCENARIO_LEVEL_UPDATED = "gloomhaven-tracker-setup/SCENARIO_LEVEL_UPDATED";
export const INITIALIZE_TRACKER = "gloomhaven-tracker-setup/INITIALIZE_TRACKER";

// State
export const initialState = fromJS({
  characterClasses: Set(),
  monsterClasses: Set(),
  scenarioNumber: "",
  scenarioLevel: "",
});

// Selectors
/*export const selectSetup = (state) => state.get('setup');

export const selectCharacterClasses = () =>
  createSelector(selectSetup, (setupState) => setupState.get('characterClasses').toArray());

export const selectMonsterClasses = () =>
  createSelector(selectSetup, (setupState) => setupState.get('monsterClasses').toArray());

export const selectScenarioNumber = () =>
  createSelector(selectSetup, (setupState) => setupState.get('scenarioNumber'));

export const selectScenarioLevel = () =>
  createSelector(selectSetup, (setupState) => setupState.get('scenarioLevel'));*/


export const selectSetup = (state) => state.get('setup');

export const selectCharacterClasses = (state) => selectSetup(state).get('characterClasses').toArray();

export const selectMonsterClasses = (state) => selectSetup(state).get('monsterClasses').toArray();

export const selectScenarioNumber = (state) => selectSetup(state).get('scenarioNumber');

export const selectScenarioLevel = (state) => selectSetup(state).get('scenarioLevel');

// Actions
export function charactersUpdated(characterClasses) {
  return {
    type: UPDATE_CHARACTERS,
    characterClasses,
  }
}

export function monstersUpdated(monsterClasses) {
  return {
    type: UPDATE_MONSTERS,
    monsterClasses,
  }
}

export function scenarioNumberUpdated(scenarioNumber) {
  return {
    type: SCENARIO_NUMBER_UPDATED,
    scenarioNumber,
  }
}

export function scenarioLevelUpdated(scenarioLevel) {
  return {
    type: SCENARIO_LEVEL_UPDATED,
    scenarioLevel,
  }
}

export function initializeTracker(body) {
  return {
    type: INITIALIZE_TRACKER,
    body,
  }
}

// Reducer
function trackerSetupReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CHARACTERS:
      return state.set("characterClasses", Set(action.characterClasses));
    case UPDATE_MONSTERS:
      return state
        .set("monsterClasses", Set(action.monsterClasses))
        .set("scenarioNumber", 0);
    case SCENARIO_NUMBER_UPDATED:
      return state
        .set("scenarioNumber", action.scenarioNumber)
        .set("monsterClasses", Set());
    case SCENARIO_LEVEL_UPDATED:
      return state
        .set("scenarioLevel", action.scenarioLevel);
    default:
      return state;
  }
}

export default trackerSetupReducer;