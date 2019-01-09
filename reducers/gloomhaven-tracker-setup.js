import { Set, fromJS } from "immutable";
import { createSelector } from "reselect";

// Constants
export const CHARACTER_SELECTED = "gloomhaven-tracker-setup/CHARACTER_SELECTED";
export const CHARACTER_DESELECTED = "gloomhaven-tracker-setup/CHARACTER_DESELECTED";
export const MONSTER_SELECTED = "gloomhaven-tracker-setup/MONSTER_SELECTED";
export const MONSTER_DESELECTED = "gloomhaven-tracker-setup/MONSTER_DESELECTED";
export const SCENARIO_SELECTED = "gloomhaven-tracker-setup/SCENARIO_SELECTED";

// State
export const initialState = fromJS({
  characterClasses: Set(),
  monsterClasses: Set(),
  scenario: 0,
});

// Selectors
export const selectSetup = (state) => state.get('setup');

export const selectCharacterClasses = () =>
  createSelector(selectSetup, (setupState) => setupState.get('characterClasses').toArray());

export const selectMonsterClasses = () =>
  createSelector(selectSetup, (setupState) => setupState.get('monsterClasses').toArray());

export const selectScenario = () =>
  createSelector(selectSetup, (setupState) => setupState.get('scenario'));

// Actions
export function characterSelected(characterClass) {
  return {
    type: CHARACTER_SELECTED,
    characterClass,
  }
}

export function characterDeselected(characterClass) {
  return {
    type: CHARACTER_DESELECTED,
    characterClass,
  }
}

export function monsterSelected(monsterClass) {
  return {
    type: MONSTER_SELECTED,
    monsterClass,
  }
}

export function monsterDeselected(monsterClass) {
  return {
    type: MONSTER_DESELECTED,
    monsterClass,
  }
}

export function scenarioSelected(scenario) {
  return {
    type: SCENARIO_SELECTED,
    scenario,
  }
}

// Reducer
function trackerSetupReducer(state = initialState, action) {
  switch (action.type) {
    case CHARACTER_SELECTED:
      return state.set("characterClasses", state.action.characterClasses.union(action.characterClass));
    case CHARACTER_DESELECTED:
      return state.set("characterClasses", state.action.characterClasses.delete(action.characterClass));
    case MONSTER_SELECTED:
      return state
        .set("monsterClasses", state.action.monsterClasses.union(action.monsterClass))
        .set("scenario", 0);
    case MONSTER_DESELECTED:
      return state.set("monsterClasses", state.action.monsterClasses.delete(action.monsterClass));
    case SCENARIO_SELECTED:
      return state
        .set("scenario", action.scenario)
        .set("monsterClasses", Set());
    default:
      return state;
  }
}

export default trackerSetupReducer;