const router = require('express').Router();
const api = require('./api');
const actionTypes = require('../utils/constants').actionTypes;
const validateRoomCode = require('./lib').validateRoomCode;

router.post('/session', (req, res) => {
  api.postSession(req).then((body) => {
    res.send(body);
  });
});

router.get('/session/:roomCode', function(req, res){
  // req.params.roomCode?
  if (!validateRoomCode(req.params.roomCode)) {
    throw new Error("Received roomCode is not valid");
  }
  let sseStore = req.app.locals.sseStore;
  sseStore.sub(res, req.params.roomCode);
  sseStore.pub(actionTypes.INITIALIZE_SSE_SUCCESS, {}, req.params.roomCode);
});

module.exports = router;
