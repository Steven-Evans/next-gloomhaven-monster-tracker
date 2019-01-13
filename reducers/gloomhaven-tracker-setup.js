import { Set, fromJS } from "immutable";
import { createSelector } from "reselect";

// Constants
export const CHARACTERS_CHANGED = "gloomhaven-tracker-setup/CHARACTERS_CHANGED";
export const MONSTERS_CHANGED = "gloomhaven-tracker-setup/MONSTERS_CHANGED";
export const SCENARIO_SELECTED = "gloomhaven-tracker-setup/SCENARIO_SELECTED";

// State
export const initialState = fromJS({
  characterClasses: Set(),
  monsterClasses: Set(),
  scenarioNumber: 0,
});

// Selectors
export const selectSetup = (state) => state.get('setup');

export const selectCharacterClasses = () =>
  createSelector(selectSetup, (setupState) => setupState.get('characterClasses').toArray());

export const selectMonsterClasses = () =>
  createSelector(selectSetup, (setupState) => setupState.get('monsterClasses').toArray());

export const selectScenarioNumber = () =>
  createSelector(selectSetup, (setupState) => setupState.get('scenarioNumber'));

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

export function scenarioNumberSelected(scenario) {
  return {
    type: SCENARIO_SELECTED,
    scenario,
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
    case SCENARIO_SELECTED:
      return state
        .set("scenarioNumber", action.scenario)
        .set("monsterClasses", Set());
    default:
      return state;
  }
}

export default trackerSetupReducer;