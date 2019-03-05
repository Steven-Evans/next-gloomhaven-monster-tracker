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
  return { roomCode: req.body.roomCode };
};

const createRoomCode = async (db) => {
  const roomCodeDocument = await db.collection('nextRoomCode').findOne({});
  const roomCode = roomCodeDocument ? roomCodeDocument.roomCode : roomCodeBijection('aaaa');
  const replacementCode = roomCodeBijection(roomCode);
  db.collection('nextRoomCode').updateOne(
    {},
    { $set: { roomCode: replacementCode }},
    { upsert: true},
  );
  return roomCode;
};

const createSession = async (db, body) => {
  if (!(body.characterClasses && (body.monsterClasses || body.scenarioNumber))) {
    console.error(new Error("Characters and Monsters/Scenario not defined"));
  }
  let session = createInitialSession(body);
  await db.collection('sessions').insertOne(session, {w:1});
};

module.exports = {
  postSession,
};
