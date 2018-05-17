var express = require('express');
var uuid = require('uuid');
var kbogameinfo = require("./Getgame");

var async = require('async');

var app = express();
var id = uuid.v4();
var port = 3000;

app.get('/', function (req, res) {
  res.send(id)
});

app.get('/kboinfo/:gamedate/:team', function (req, res) {
  var date = req.params.gamedate;
  var team = req.params.team;
  //res.send(date+"|"+team);
  kbogameinfo.getGame(date,'LG').then(function(endData){
    console.log(" ----------- ");
    console.log(endData);
    console.log(" ----------- ");

    res.header("content-type","application/json; charset=UTF-8");
    res.end(endData);
  }).catch(function(reason) {

    res.end("error:"+ reason);
  });

});

app.listen(port, function () {
  console.log('Example app listening on port: ' + port);
});
