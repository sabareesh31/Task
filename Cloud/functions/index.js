require('dotenv').config();
const functions = require("firebase-functions");
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const Router = require('./Router/router');

app.use(cors());

// const PORT = 8085;
// app.listen(PORT, () => {
//   console.log(`Running this page ${PORT}.`)
// });

app.use('/api', Router)

exports.apps = functions
  .region('asia-southeast1')
  .https.onRequest(app);