const router = require('express').Router();
const api = require('./api');
const createNewMonster = require('../utils/monster').createNewMonster;
const validateRoomCode = require('./lib').validateRoomCode;
const sseReduxActions = require('./sseActions');

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
  const sseAction = sseReduxActions.initializeSSESuccess(req.params.roomCode);
  sseStore.pub(sseAction.type, sseAction, req.params.roomCode);
});

router.put('/session/:roomCode/character/:characterName/initiative', (req, res) => {
  const keyString = `characters.${req.params.characterName}.initiative`;
  const sseAction = sseReduxActions.updateCharacterInitiative(req.params.characterName, req.body.initiative);
  api.updateTrackerField(req, keyString, req.body.initiative, sseAction).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/character/:characterName/health', (req, res) => {
  const keyString = `characters.${req.params.characterName}.health`;
  const sseAction = sseReduxActions.updateCharacterHealth(req.params.characterName, req.body.health);
  api.updateTrackerField(req, keyString, req.body.health, sseAction).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/character/:characterName/experience', (req, res) => {
  const keyString = `characters.${req.params.characterName}.experience`;
  const sseAction = sseReduxActions.updateCharacterExperience(req.params.characterName, req.body.experience);
  api.updateTrackerField(req, keyString, req.body.experience, sseAction).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/character/:characterName/statuseffect/:statusEffect', (req, res) => {
  const keyString = `characters.${req.params.characterName}.statusEffects.${req.params.statusEffect}`;
  const sseAction = sseReduxActions.updateCharacterStatusEffect(req.params.characterName, req.params.statusEffect, req.body.checked);
  api.updateTrackerField(req, keyString, req.body.checked, sseAction).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/monster/:monsterName/initiative', (req, res) => {
  const keyString = `monsters.${req.params.monsterName}.initiative`;
  const sseAction = sseReduxActions.updateMonsterInitiative(req.params.monsterName, req.body.initiative);
  api.updateTrackerField(req, keyString, req.body.initiative, sseAction).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/monster/:monsterName/active/:standeeNumber/health', (req, res) => {
  const keyString = `monsters.${req.params.monsterName}.active.${req.params.standeeNumber}.currentHealth`;
  const sseAction = sseReduxActions.updateMonsterHealth(req.params.monsterName, req.params.standeeNumber, req.body.health);
  api.updateTrackerField(req, keyString, req.body.health, sseAction).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/monster/:monsterName/active/:standeeNumber/statuseffect/:statusEffect', (req, res) => {
  const keyString = `monsters.${req.params.monsterName}.active.${req.params.standeeNumber}.statusEffects.${req.params.statusEffect}`;
  const sseAction = sseReduxActions.updateMonsterStatusEffect(req.params.monsterName, req.params.standeeNumber, req.params.statusEffect, req.body.checked);
  api.updateTrackerField(req, keyString, req.body.checked, sseAction).then(() => {
    res.status(200);
    res.send({});
  });
});

router.put('/session/:roomCode/monster/:monsterName/active', (req, res) => {
  const keyString = `monsters.${req.params.monsterName}.active`;
  const sseAction = sseReduxActions.setActiveMonsters(req.params.monsterName, req.body.active);
  api.updateTrackerField(req, keyString, req.body.active, sseAction).then(() => {
    res.status(200);
    res.send({});
  })
});

router.post('/session/:roomCode/monster/:monsterName/', (req, res) => {
  const monsterName = req.params.monsterName;
  const standeeNumber = req.body.standeeNumber;
  const elite = req.body.elite;
  const scenarioLevel = req.body.scenarioLevel;
  const numCharacters = req.body.numCharacters;
  const keyString = `monsters.${monsterName}.active.${standeeNumber}`;
  const sseAction = sseReduxActions.createMonster(monsterName, standeeNumber, elite, scenarioLevel);
  api.updateTrackerField(req, keyString, createNewMonster(monsterName, elite, scenarioLevel, numCharacters), sseAction, {upsert: true}).then(() => {
    res.status(200);
    res.send({});
  });
});

router.delete('/session/:roomCode/monster/:monsterName/active/:standeeNumber', (req, res) => {
  const keyString = `monsters.${req.params.monsterName}.active.${req.params.standeeNumber}`;
  const sseAction = sseReduxActions.deleteActiveMonster(req.params.monsterName, req.params.standeeNumber);
  api.deleteTrackerField(req, keyString, sseAction).then(() => {
    res.status(200);
    res.send({});
  });
});

module.exports = router;
