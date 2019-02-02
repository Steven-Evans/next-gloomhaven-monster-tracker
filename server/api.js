const router = require('express').Router();
const roomCodeBijection = require('./lib').roomCodeBijection;


router.get('/roomcode', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const roomCodeDocument = await db.collection('nextRoomCode').findOne({});
    const roomCode = roomCodeDocument ? roomCodeDocument.roomCode : roomCodeBijection('aaaa');
    const replacementCode = roomCodeBijection(roomCode);
    db.collection('nextRoomCode').updateOne(
      {},
      { $set: { roomCode: replacementCode }},
      { upsert: true},
    );
    res.end(roomCode);
  } catch (err) {
    console.error(err);
  }
});

router.get('/test', (req, res) => {
  console.log('/test is hit');
  res.send('test');
});

module.exports = router;
