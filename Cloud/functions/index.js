require('dotenv').config();
const functions = require("firebase-functions");
const express =require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const Router=require('./Router/router');

app.use(cors());



app.use('/api',Router)

exports.apps=functions
.region('asia-southeast1')
.https.onRequest(app);


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = functions
// .region('asia-southeast1')
// .https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase    'Singapore' !");
//   console.log("Hi Firebase");
// });







// exports.webhookAsia = functions
//     .region('asia-southeast1')
//     .https.onRequest((req, res) => {
//             res.send("Hello");
//     }); 