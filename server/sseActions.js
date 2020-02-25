const {
  INITIALIZE_SSE_SUCCESS,
  INITIALIZE_SSE_FAILURE,
  SSE_UPDATE_CHARACTER_EXPERIENCE,
  SSE_UPDATE_CHARACTER_INITIATIVE,
  SSE_UPDATE_CHARACTER_HEALTH,
  SSE_UPDATE_CHARACTER_STATUS_EFFECT,
  SSE_CREATE_ACTIVE_MONSTER,
  SSE_UPDATE_MONSTER_INITIATIVE,
  SSE_UPDATE_MONSTER_HEALTH,
  SSE_UPDATE_MONSTER_STATUS_EFFECT,
  SSE_DELETE_ACTIVE_MONSTER,
  SSE_SET_ACTIVE_MONSTERS,
} = require('../utils/constants').sseActionTypes;

module.exports.initializeSSESuccess = function(roomCode) {
  return {
    type: INITIALIZE_SSE_SUCCESS,
    roomCode,
  }
}

module.exports.initializeSSEFailure = function() {
  return {
    type: INITIALIZE_SSE_FAILURE,
  }
}

module.exports.updateCharacterExperience = function(characterName, experience) {
  return {
    type: SSE_UPDATE_CHARACTER_EXPERIENCE,
    characterName,
    experience,
  }
}

module.exports.updateCharacterInitiative = function(characterName, initiative) {
  return {
    type: SSE_UPDATE_CHARACTER_INITIATIVE,
    characterName,
    initiative,
  }
}

module.exports.updateCharacterHealth = function(characterName, currentHealth) {
  return {
    type: SSE_UPDATE_CHARACTER_HEALTH,
    characterName,
    currentHealth
  }
}

module.exports.updateCharacterStatusEffect = function(characterName, statusEffect, checked) {
  return {
    type: SSE_UPDATE_CHARACTER_STATUS_EFFECT,
    characterName,
    statusEffect,
    checked,
  }
}

module.exports.createMonster = function(monsterName, standeeNumber, elite, scenarioLevel) {
  return {
    type: SSE_CREATE_ACTIVE_MONSTER,
    standeeNumber,
    monsterName,
    elite,
    scenarioLevel,
  }
}

module.exports.updateMonsterInitiative = function(monsterName, initiative) {
  return {
    type: SSE_UPDATE_MONSTER_INITIATIVE,
    monsterName,
    initiative,
  }
}

module.exports.updateMonsterHealth = function(monsterName, standeeNumber, currentHealth) {
  return {
    type: SSE_UPDATE_MONSTER_HEALTH,
    standeeNumber,
    monsterName,
    currentHealth
  }
}

module.exports.updateMonsterStatusEffect = function(monsterName, standeeNumber, statusEffect, checked) {
  return {
    type: SSE_UPDATE_MONSTER_STATUS_EFFECT,
    monsterName,
    standeeNumber,
    statusEffect,
    checked,
  }
}

module.exports.deleteActiveMonster = function(monsterName, standeeNumber) {
  return {
    type: SSE_DELETE_ACTIVE_MONSTER,
    monsterName,
    standeeNumber,
  }
}

module.exports.setActiveMonsters = function(monsterName, active) {
  return {
    type: SSE_SET_ACTIVE_MONSTERS,
    monsterName, 
    active,
  }
}
