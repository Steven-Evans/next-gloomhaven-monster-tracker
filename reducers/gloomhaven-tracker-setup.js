import { Set, fromJS } from "immutable";
import { createSelector } from "reselect";

// Constants
export const CHARACTERS_CHANGED = "gloomhaven-tracker-setup/CHARACTERS_CHANGED";
export const MONSTERS_CHANGED = "gloomhaven-tracker-setup/MONSTERS_CHANGED";
export const SCENARIO_NUMBER_SELECTED = "gloomhaven-tracker-setup/SCENARIO_NUMBER_SELECTED";
export const SCENARIO_LEVEL_SELECTED = "gloomhaven-tracker-setup/SCENARIO_LEVEL_SELECTED";
export const INITIALIZE_TRACKER = "gloomhaven-tracker-setup/INITIALIZE_TRACKER";
export const INITIALIZE_TRACKER_SUCCESS = "gloomhaven-tracker-setup/INITIALIZE_TRACKER_SUCCESS";

// State
export const initialState = fromJS({
  characterClasses: Set(),
  monsterClasses: Set(),
  scenarioNumber: 0,
  scenarioLevel: 0,
});

// Selectors
export const selectSetup = (state) => state.get('setup');

export const selectCharacterClasses = () =>
  createSelector(selectSetup, (setupState) => setupState.get('characterClasses').toArray());

export const selectMonsterClasses = () =>
  createSelector(selectSetup, (setupState) => setupState.get('monsterClasses').toArray());

export const selectScenarioNumber = () =>
  createSelector(selectSetup, (setupState) => setupState.get('scenarioNumber'));

export const selectScenarioLevel = () =>
  createSelector(selectSetup, (setupState) => setupState.get('scenarioLevel'));

// Actions
export function charactersUpdated(characterClasses) {
  return {
    type: CHARACTERS_CHANGED,
    characterClasses,
  }
}

export function monstersUpdated(monsterClasses) {
  return {
    type: MONSTERS_CHANGED,
    monsterClasses,
  }
}

export function scenarioNumberSelected(scenarioNumber) {
  return {
    type: SCENARIO_NUMBER_SELECTED,
    scenarioNumber,
  }
}

export function scenarioLevelSelected(scenarioLevel) {
  return {
    type: SCENARIO_LEVEL_SELECTED,
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
    case CHARACTERS_CHANGED:
      return state.set("characterClasses", Set(action.characterClasses));
    case MONSTERS_CHANGED:
      return state
        .set("monsterClasses", Set(action.monsterClasses))
        .set("scenarioNumber", 0);
    case SCENARIO_NUMBER_SELECTED:
      return state
        .set("scenarioNumber", parseInt(action.scenarioNumber))
        .set("monsterClasses", Set());
    case SCENARIO_LEVEL_SELECTED:
      return state
        .set("scenarioLevel", parseInt(action.scenarioLevel));
    default:
      return state;
  }
}

export default trackerSetupReducer;