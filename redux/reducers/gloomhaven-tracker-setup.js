import {fromJS, Set} from "immutable";
import {
  SCENARIO_LEVEL_UPDATED,
  SCENARIO_NUMBER_UPDATED,
  UPDATE_CHARACTERS,
  UPDATE_MONSTERS
} from "../actionTypes/gloomhaven-tracker-setup";
import {FETCH_TRACKER_STATE, FETCH_TRACKER_STATE_SUCCESS} from "../actionTypes/gloomhaven-tracker";

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
      return state.set("scenarioLevel", action.scenarioLevel);
    case FETCH_TRACKER_STATE_SUCCESS:
      return state.set("scenarioLevel", action.scenarioLevel);
    default:
      return state;
  }
}

export default trackerSetupReducer;