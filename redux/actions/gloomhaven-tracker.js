import {
  CREATE_ACTIVE_MONSTER,
  CREATE_ACTIVE_MONSTER_FAILURE,
  CREATE_ACTIVE_MONSTER_SUCCESS,
  DECREMENT_CHARACTER_EXPERIENCE,
  DECREMENT_CHARACTER_HEALTH,
  DECREMENT_MONSTER_HEALTH,
  DELETE_ACTIVE_MONSTER,
  DELETE_ACTIVE_MONSTER_FAILURE,
  DELETE_ACTIVE_MONSTER_SUCCESS,
  FETCH_TRACKER_STATE,
  FETCH_TRACKER_STATE_FAILURE,
  FETCH_TRACKER_STATE_SUCCESS,
  INCREMENT_CHARACTER_EXPERIENCE,
  INCREMENT_CHARACTER_HEALTH,
  INCREMENT_MONSTER_HEALTH,
  INITIALIZE_SSE,
  SET_ROOM_CODE,
  UPDATE_CHARACTER_EXPERIENCE,
  UPDATE_CHARACTER_EXPERIENCE_FAILURE,
  UPDATE_CHARACTER_EXPERIENCE_SUCCESS,
  UPDATE_CHARACTER_HEALTH,
  UPDATE_CHARACTER_HEALTH_FAILURE,
  UPDATE_CHARACTER_HEALTH_SUCCESS,
  UPDATE_CHARACTER_INITIATIVE,
  UPDATE_CHARACTER_INITIATIVE_FAILURE,
  UPDATE_CHARACTER_INITIATIVE_SUCCESS,
  UPDATE_CHARACTER_STATUS_EFFECT,
  UPDATE_CHARACTER_STATUS_EFFECT_FAILURE,
  UPDATE_CHARACTER_STATUS_EFFECT_SUCCESS,
  UPDATE_MONSTER_HEALTH,
  UPDATE_MONSTER_HEALTH_FAILURE,
  UPDATE_MONSTER_HEALTH_SUCCESS,
  UPDATE_MONSTER_INITIATIVE,
  UPDATE_MONSTER_INITIATIVE_FAILURE,
  UPDATE_MONSTER_INITIATIVE_SUCCESS,
  UPDATE_MONSTER_STATUS_EFFECT,
  UPDATE_MONSTER_STATUS_EFFECT_FAILURE,
  UPDATE_MONSTER_STATUS_EFFECT_SUCCESS,
  UPDATE_NEW_MONSTER_DIALOGUE,
  OPEN_OOZE_SPLITTING_DIALOGUE,
  CLOSE_OOZE_SPLITTING_DIALOGUE,
  CHOOSE_OOZE_SPLIT_STANDEE,
  SET_ACTIVE_OOZES_SUCCESS,
  SET_ACTIVE_OOZES_FAILURE,
} from "../actionTypes/gloomhaven-tracker";
import {INITIALIZE_TRACKER_SUCCESS} from "../actionTypes/gloomhaven-tracker-setup";

export function initializeTrackerSuccess(roomCode) {
  return {
    type: INITIALIZE_TRACKER_SUCCESS,
    roomCode,
  }
}

export function setRoomCode(roomCode) {
  return {
    type: SET_ROOM_CODE,
    roomCode,
  }
}

export function fetchTrackerState(roomCode) {
  return {
    type: FETCH_TRACKER_STATE,
    roomCode,
  }
}

export function fetchTrackerStateSuccess({characters, monsters, scenarioLevel}) {
  return {
    type: FETCH_TRACKER_STATE_SUCCESS,
    characters,
    monsters,
    scenarioLevel,
  }
}

export function fetchTrackerStateFailure(error) {
  return {
    type: FETCH_TRACKER_STATE_FAILURE,
    error,
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

export function openOozeDialogue(oozeSplits) {
  return {
    type: OPEN_OOZE_SPLITTING_DIALOGUE,
    oozeSplits,
  }
}

export function closeOozeDialogue() {
  return {
    type: CLOSE_OOZE_SPLITTING_DIALOGUE,
  }
}

export function chooseOozeSplitStandee(originalStandee, newStandee, elite, scenarioLevel) {
  return {
    type: CHOOSE_OOZE_SPLIT_STANDEE,
    originalStandee,
    newStandee,
    elite,
    scenarioLevel,
  }
}

export function setActiveOozesSuccess() {
  return {
    type: SET_ACTIVE_OOZES_SUCCESS,
  }
}

export function setActiveOozesFailure(error) {
  return {
    type: SET_ACTIVE_OOZES_FAILURE,
    error,
  }
}
