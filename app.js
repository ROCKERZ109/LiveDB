const express = require('express');
const dbConnection = require('./pilot');
const passengers = require('./passenger');
const app = express();

app.use(express.json());

const server = require('http').createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({server:server});
wss.on('connection',function connection(ws){
    ws.send('Welcome new Client');
    ws.on('message',function incoming(message){
        ws.send('Got ur message its:'+ message);
    });
});

app.get('/',(req,res)=>res.send('Hello World'));
server.listen(3001,()=>console.log('Listening on port:3001'));




app.get('/pilots', async (req, res) => {
  let data = await dbConnection();
  let ress = await data.find({}).toArray();
  res.send(ress);
});







app.get('/passengers', async (req, res) => {
  let data = await passengers();
  let ress = await data.find({}).toArray();
  res.send(ress);
});





app.get('/pilots/UserInfo', async (req, res) => {
  let data = await dbConnection();
  let result = await data.find({ phone: parseInt(req.query['phone']) }).toArray();
  console.log(result);
  res.send(result);
});






app.get('/passengers/getUserInfo', async (req, res) => {
  let data = await passengers();
  let result = await data.find({ phone: parseInt(req.query['phone']) }).toArray();
  console.log(result);
  console.log('entered I have');
  res.send(result);
});






app.post('/pilots/pushNewUser', async (req, res) => {

  let data = await dbConnection();
  let ress = await data.insertOne(req.body);
  if (ress.acknowledged) {
    res.send('User Pushed');

  }
  else {
    res.send('maja ni aaya');

  }

});
app.post('/passengers/pushNewUser', async (req, res) => {

  let data = await passengers();
  let ress = await data.insertOne(req.body);
  if (ress.acknowledged) {
    res.send('User Pushed');

  }
  else {
    res.send('maja ni aaya');

  }

});

app.listen(5000);
module.exports = app;