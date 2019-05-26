const router = require('express').Router();
const api = require('./api');
const sseActionTypes = require('../utils/constants').sseActionTypes;
const createNewMonster = require('../utils/monster').createNewMonster;
const validateRoomCode = require('./lib').validateRoomCode;

router.post('/session', (req, res) => {
  api.postSession(req).then((body) => {
    res.send(body);
  });
});

router.get('/session/:roomCode', (req, res) => {
  api.getTrackerState(req).then((body) => {
    res.send(body);
  });
});

router.get('/session/:roomCode/sse', (req, res) => {
  if (!validateRoomCode(req.params.roomCode)) {
    throw new Error("Received roomCode is not valid");
  }
  let sseStore = req.app.locals.sseStore;
  sseStore.sub(res, req.params.roomCode);
  sseStore.pub(sseActionTypes.INITIALIZE_SSE_SUCCESS, {roomCode: req.params.roomCode}, req.params.roomCode);
});

router.put('/session/:roomCode/character/:characterName/initiative', (req, res) => {
  const keyString = `characters.${req.params.characterName}.initiative`;
  const sseData = {characterName: req.params.characterName, initiative: req.body.initiative};
  api.updateTrackerField(req, keyString, req.body.initiative, sseActionTypes.SSE_UPDATE_CHARACTER_INITIATIVE, sseData).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/character/:characterName/health', (req, res) => {
  const keyString = `characters.${req.params.characterName}.health`;
  const sseData = {characterName: req.params.characterName, currentHealth: req.body.health};
  api.updateTrackerField(req, keyString, req.body.health, sseActionTypes.SSE_UPDATE_CHARACTER_HEALTH, sseData).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/character/:characterName/experience', (req, res) => {
  const keyString = `characters.${req.params.characterName}.experience`;
  const sseData = {characterName: req.params.characterName, experience: req.body.experience};
  api.updateTrackerField(req, keyString, req.body.experience, sseActionTypes.SSE_UPDATE_CHARACTER_EXPERIENCE, sseData).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/character/:characterName/statuseffect/:statusEffect', (req, res) => {
  const keyString = `characters.${req.params.characterName}.statusEffects.${req.params.statusEffect}`;
  const sseData = {characterName: req.params.characterName, statusEffect: req.params.statusEffect, checked: req.body.checked};
  api.updateTrackerField(req, keyString, req.body.checked, sseActionTypes.SSE_UPDATE_CHARACTER_STATUS_EFFECT, sseData).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/monster/:monsterName/initiative', (req, res) => {
  const keyString = `monsters.${req.params.monsterName}.initiative`;
  const sseData = {monsterName: req.params.monsterName, initiative: req.body.initiative};
  api.updateTrackerField(req, keyString, req.body.initiative, sseActionTypes.SSE_UPDATE_MONSTER_INITIATIVE, sseData).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/monster/:monsterName/active/:standeeNumber/health', (req, res) => {
  const keyString = `monsters.${req.params.monsterName}.active.${req.params.standeeNumber}.currentHealth`;
  const sseData = {monsterName: req.params.monsterName, standeeNumber: req.params.standeeNumber, currentHealth: req.body.health};
  api.updateTrackerField(req, keyString, req.body.health, sseActionTypes.SSE_UPDATE_MONSTER_HEALTH, sseData).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/monster/:monsterName/active/:standeeNumber/statuseffect/:statusEffect', (req, res) => {
  const keyString = `monsters.${req.params.monsterName}.active.${req.params.standeeNumber}.statusEffects.${req.params.statusEffect}`;
  const sseData = {monsterName: req.params.monsterName, standeeNumber: req.params.standeeNumber, statusEffect: req.params.statusEffect, checked: req.body.checked};
  api.updateTrackerField(req, keyString, req.body.checked, sseActionTypes.SSE_UPDATE_MONSTER_STATUS_EFFECT, sseData).then(() => {
    res.status(200);
    res.send({});
  });
});

router.post('/session/:roomCode/monster/:monsterName/', (req, res) => {
  const monsterName = req.params.monsterName;
  const standeeNumber = req.body.standeeNumber;
  const elite = req.body.elite;
  const scenarioLevel = req.body.scenarioLevel;
  const keyString = `monsters.${monsterName}.active.${standeeNumber}`;
  const sseData = {monsterName, standeeNumber, elite, scenarioLevel};
  api.updateTrackerField(req, keyString, createNewMonster(monsterName, elite, scenarioLevel), sseActionTypes.SSE_CREATE_ACTIVE_MONSTER, sseData, {upsert: true}).then(() => {
    res.status(200);
    res.send({});
  });
});

router.delete('/session/:roomCode/monster/:monsterName/active/:standeeNumber', (req, res) => {
  const keyString = `monsters.${req.params.monsterName}.active.${req.params.standeeNumber}`;
  const sseData = {monsterName: req.params.monsterName, standeeNumber: req.params.standeeNumber};
  api.deleteTrackerField(req, keyString, sseActionTypes.SSE_DELETE_ACTIVE_MONSTER, sseData).then(() => {
    res.status(200);
    res.send({});
  });
});

module.exports = router;
