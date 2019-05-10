const roomCodeBijection = require('./lib').roomCodeBijection;
const createInitialSession = require('./lib').createInitialSession;

const postSession = async (req) => {
  const db = req.app.locals.db;
  try {
    req.body.roomCode = await createRoomCode(db);
    await createSession(db, req.body);
  } catch (err) {
    console.error(err);
  }
  return {roomCode: req.body.roomCode};
};

const getTrackerState = async (req) => {
  const db = req.app.locals.db;
  let state;
  try {
    state = await db.collection('sessions').findOne({roomCode: req.params.roomCode});
  } catch (err) {
    console.error(err);
  }
  return {scenarioLevel: state.scenarioLevel, characters: state.characters, monsters: state.monsters};
};

const createRoomCode = async (db) => {
  const roomCodeDocument = await db.collection('nextRoomCode').findOne({});
  const roomCode = roomCodeDocument ? roomCodeDocument.roomCode : roomCodeBijection('aaaa');
  const replacementCode = roomCodeBijection(roomCode);
  db.collection('nextRoomCode').updateOne(
    {},
    {$set: {roomCode: replacementCode}},
    {upsert: true},
  );
  return roomCode;
};

const createSession = async (db, body) => {
  if (!(body.characterClasses && (body.monsterClasses || body.scenarioNumber) && body.scenarioLevel)) {
    console.error(new Error("Characters, Monsters/Scenario, and Scenario Level not defined"));
  }
  body.scenarioLevel = parseInt(body.scenarioLevel);
  if (isNaN(body.scenarioLevel)) {
    console.error(new Error("Scenario Level is not a number"));
  }

  let session = createInitialSession(body);
  await db.collection('sessions').insertOne(session, {w:1});
};

const updateTrackerField = async (req, keyString, val, sseEventType, sseData, mongoOptions = {}) => {
  const db = req.app.locals.db;
  try {
    await db.collection('sessions').updateOne({roomCode: req.params.roomCode}, {$set: {[keyString]: val}}, mongoOptions, (mongoError) => {
      if (mongoError) throw mongoError;
      req.app.locals.sseStore.pub(sseEventType, sseData, req.params.roomCode);
    })
  } catch (err) {
    console.error(err);
  }
};

const deleteTrackerField = async (req, keyString, sseEventType, sseData, mongoOptions = {}) => {
  const db = req.app.locals.db;
  try {
    await db.collection('sessions').updateOne({roomCode: req.params.roomCode}, {$unset: {[keyString]: ""}}, mongoOptions, (mongoError) => {
      if (mongoError) throw mongoError;
      req.app.locals.sseStore.pub(sseEventType, sseData, req.params.roomCode);
    })
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  postSession,
  getTrackerState,
  updateTrackerField,
  deleteTrackerField,
};
