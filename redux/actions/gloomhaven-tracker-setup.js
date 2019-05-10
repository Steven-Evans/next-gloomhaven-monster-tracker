import {
  INITIALIZE_TRACKER,
  SCENARIO_LEVEL_UPDATED,
  SCENARIO_NUMBER_UPDATED, UPDATE_CHARACTERS, UPDATE_MONSTERS
} from "../actionTypes/gloomhaven-tracker-setup";

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
