var request = require("request");
var cheerio = require("cheerio");


exports.getGame  = function(date, team, callback){
  var url = "https://www.koreabaseball.com/ws/Main.asmx/GetKboGameList";
  //var date = "20180513";
  var param = "leId=1&srId=0%2C1%2C3%2C4%2C5%2C7%2C9&date="+date;
  //입력값 date , team;
  return new Promise((resolve,reject) => {
    request.post({url:url, form: param}, function(error, response, body){
      if(!error){
        //console.log(body);
        var myteam = team;
        var obj = JSON.parse(body);
        var gameResult = {};
        //console.log(obj);
        //console.log(obj.game);
        var games = obj.game;
        for(var i = 0 ; i < games.length ; i++){
          var game = games[i];

          if(game.AWAY_NM === myteam || game.HOME_NM === myteam  ){
            gameResult.G_DT_TXT = game.G_DT_TXT;
            gameResult.GAME_STATE_SC = game.GAME_STATE_SC;
            gameResult.G_TM = game.G_TM;
            gameResult.S_NM = game.S_NM;
            gameResult.AWAY_NM = game.AWAY_NM;
            gameResult.HOME_NM = game.HOME_NM;
            gameResult.CANCEL_SC_ID = game.CANCEL_SC_ID;
            gameResult.CANCEL_SC_NM = game.CANCEL_SC_NM;
            gameResult.T_SCORE_CN = game.T_SCORE_CN;
            gameResult.B_SCORE_CN = game.B_SCORE_CN;
            console.log( gameResult );
          }
        }
        return resolve(JSON.stringify(gameResult));


      } else {
        var errReturn = {error:"We’ve encountered an error: "};
        console.log("We’ve encountered an error: " + error);
        return reject(errReturn);
      }
    });
  });;
}

/*
request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);
    var temperature = $("ul.game-list > li.on");
    console.log(body);
    console.log(temperature);
    //console.log("It’s " + temperature + " degrees Fahrenheit.");
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
*/
