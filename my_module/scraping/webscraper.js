var request = require("request");
var cheerio = require("cheerio");
var url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02888;


request(url, (error, response, body) => {
  if (!error) {
    var $ = cheerio.load(body),
    var temperature = $("[data-variable='temperature'] .wx-value").html();
    console.log("It’s " + temperature + " degrees Fahrenheit.");
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
