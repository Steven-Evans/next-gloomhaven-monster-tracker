const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const config = require('./server/config');
const apiRoutes = require('./server/routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.use('/api', apiRoutes);

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  MongoClient.connect(config.database.url, {useNewUrlParser: true}).then((client) => {
    console.log("> Connected successfully to mongod database");

    server.locals.db = client.db('gloomhavenTracker');

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  }).catch((err) => {
    console.error(err);
  });
})
.catch((err) => {
  console.error(err);
  process.exit(1);
});
