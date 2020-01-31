import {fromJS, Set} from "immutable";
import {
  SCENARIO_LEVEL_UPDATED,
  SCENARIO_NUMBER_UPDATED,
  UPDATE_CHARACTERS,
  UPDATE_MONSTERS
} from "../actionTypes/gloomhaven-tracker-setup";
import {FETCH_TRACKER_STATE_SUCCESS} from "../actionTypes/gloomhaven-tracker";

// State
export const initialState = fromJS({
  characterClasses: Set(),
  monsterClasses: Set(),
  scenarioNumber: "",
  scenarioLevel: "",
  inputErrors: {
    charactersChanged: false,
    monsterSelectionChanged: false,
    scenarioLevelChanged: false,
  },
});

// Selectors
export const selectSetup = (state) => state.get('setup');

export const selectCharacterClasses = (state) => selectSetup(state).get('characterClasses');

export const selectMonsterClasses = (state) => selectSetup(state).get('monsterClasses');

export const selectScenarioNumber = (state) => selectSetup(state).get('scenarioNumber');

export const selectScenarioLevel = (state) => selectSetup(state).get('scenarioLevel');

export const selectInputErrors = (state) => selectSetup(state).get('inputErrors');

export const selectCharacterClassesError = (state) => selectCharacterClasses(state).isEmpty() && selectInputErrors(state).get('charactersChanged');

export const selectMonsterError = (state) => !(selectMonsterClasses(state).isEmpty() ^ selectScenarioNumber(state) === "") && selectInputErrors(state).get('monsterSelectionChanged');

export const selectScenarioLevelError = (state) => selectScenarioLevel(state) === "" && selectInputErrors(state).get('scenarioLevelChanged');

export const selectSubmitClean = (state) => selectCharacterClasses(state).isEmpty() || !(selectMonsterClasses(state).isEmpty() ^ selectScenarioNumber(state) === "") || selectScenarioLevel(state) === "";

// Reducer
function trackerSetupReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CHARACTERS:
      return state.set("characterClasses", Set(action.characterClasses))
        .setIn(["inputErrors", "charactersChanged"], true);
    case UPDATE_MONSTERS:
      return state
        .set("monsterClasses", Set(action.monsterClasses))
        .set("scenarioNumber", "")
        .setIn(["inputErrors", "monsterSelectionChanged"], true);
    case SCENARIO_NUMBER_UPDATED:
      return state
        .set("scenarioNumber", action.scenarioNumber)
        .set("monsterClasses", Set())
        .setIn(["inputErrors", "monsterSelectionChanged"], true);
    case SCENARIO_LEVEL_UPDATED:
      return state.set("scenarioLevel", action.scenarioLevel)
        .setIn(["inputErrors", "scenarioLevelChanged"], true);
    case FETCH_TRACKER_STATE_SUCCESS:
      return state.set("scenarioLevel", action.scenarioLevel);
    default:
      return state;
  }
}

export default trackerSetupReducer;