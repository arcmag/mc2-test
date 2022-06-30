const express = require('express');
const app = express();
const { connectDb } = require('./helpers/db.js');
const { host, port, db, apiUrl } = require('./configuration/index.js');
const axios = require('axios');

const startServer = () => {
  console.log('startServer');
  app.listen(port, () => {
    console.log(`Started auth service on port ${port}.`);
    console.log(`On host ${host}`);
    console.log(`On DB ${db}`);
  });
};

app.get('/test', (req, res) => {
  res.send('Our AUTH server is working correctly!');
});

app.get('/test-api-request', (req, res) => {
  
  axios.get(`${apiUrl}/test-api-data`)
  .then((response) => {
    res.json(response.data);
  }).catch(err => {
    res.json({error: err});
  });
});

app.get('/api/currentUser', (req, res) => {

  res.json({id: 1, email: 'current-user@mail.ru'});
});

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);
