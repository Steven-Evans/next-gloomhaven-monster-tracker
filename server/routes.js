const router = require('express').Router();
const api = require('./api');

router.post('/session', (req, res) => {
  api.postSession(req).then(roomCode => {
    res.send(roomCode);
  });
});

router.get('/test', (req, res) => {
  console.log('/test is hit');
  res.send('test');
});

module.exports = router;
