const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const { default: axios } = require('axios')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const swapi = 'https://swapi.dev/api';
/**********************
 * Example get method *
 **********************/

app.get('/people', async function(req, res) {
  // const people = [{name: 'Yura'}, {name: 'Roman'}];
  try {
    const people = await axios.get(`${swapi}/people`)
    res.json({success: 'get call succeed!', url: req.url, people: people.data.results});
  } catch (err){
    res.json({error: true});
  }
});

app.get('/people/:id', async function(req, res) {
  try {
    const people = await axios.get(`${swapi}/people/${req.params.id}`);
    res.json({success: 'get call succeed!', url: req.url, people: [people.data]});
  } catch (err) {
    res.json({error: true})
  }
});

app.get('/starshiptest/:id', async function(req, res) {
  const starship = await axios.get(`${swapi}/starships/${req.params.id}`);
  res.json({success: 'get call succeed!', url: req.url, starship: starship.data});
});

/****************************
* Example post method *
****************************/

app.post('/people', function(req, res) {
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/item', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/item', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/item/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
