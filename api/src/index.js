const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const { connectDb } = require('./helpers/db.js');
const { host, port, db, authApiUrl } = require('./configuration/index.js');
const postSchema = new mongoose.Schema({
  name: String,
});
const Post = mongoose.model('Post', postSchema);

const startServer = () => {
  console.log('startServer API!!!');
  app.listen(port, () => {
    console.log(`Started api service on port ${port}.`);
    console.log(`On host ${host}`);
    console.log(`On DB ${db}`);

    const silence = new Post({ name: `Silence: [${Date.now()}]` });
    silence.save((err, post) => {
      if (err) {
        console.log(err);
      }

      console.log(post);
    });
  });
};

app.get('/', (req, res) => {
  res.json({ response: 'Root API url 2' });
});

app.get('/test', (req, res) => {
  res.send('Our API server is working correctly! Add volumes in project!');
});

app.get('/api/test-api-data', (req, res) => {
  res.json({ testWithApi: true });
});

app.get('/test-with-current-user', (req, res) => {
  console.log('authApiUrl', authApiUrl);
  axios
    .get(`${authApiUrl}/currentUser`)
    .then((response) => {
      res.json({ user: response.data, attemp: 2 });
    })
    .catch((err) => {
      res.json({ testwithcurrentuser: false });
    });
});

app.get('/find', (req, res) => {
  Post.find((err, posts) => {
    if (err) {
      res.send(err);
    }

    res.json(posts);
  });
});

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);
