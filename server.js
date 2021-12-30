require('./models/db.js');

const express = require('express');

//exported controller here
const employeeController = require('./controller/employeeController.js');

//initiated server here by express
var app = express();

//initiated port to server with listen function (http://127.0.0.1/3000)
app.listen(3000, () => {
    console.log("Server Loding Success on Port : 3000");
});

//response type from api
app.use(express.json())

//we can use /api to listen all controller methods in (http://127.0.0.1/3000/api)
//here using controller methods in base url with simple (/) -> (http://127.0.0.1/3000/)
app.use('/', employeeController);

