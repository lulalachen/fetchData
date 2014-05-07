/**
 * FetchDataController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  'new': function (req, res){
      console.log("finally~");
      res.charset = ('utf-8');
      console.log("step 2");
      //res.send("<!DOCTYPE html><head><title>Stock Information</title></head><nav class=\"navbar navbar-default\" role=\"navigation\"><div class=\"container-fluid\"><!-- Brand and toggle get grouped for better mobile display --><div class=\"navbar-header\"><button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\"><span class=\"sr-only\">Toggle navigation</span>        <span class=\"icon-bar\"></span>        <span class=\"icon-bar\"></span>        <span class=\"icon-bar\"></span>      </button>      <a class=\"navbar-brand\" href=\"#\">Lulala\'s Stock Data Loader</a>    </div>    <!-- Collect the nav links, forms, and other content for toggling -->    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">      <ul class=\"nav navbar-nav\">        <li><a href=\"http://www.cnyes.com/twstock/\">鉅亨網</a></li>      </ul>      <ul class=\"nav navbar-nav navbar-right\">        <li><a>Made by Lulalachen</a> </li></li></ul>    </div><!-- /.navbar-collapse -->  </div><!-- /.container-fluid --></nav>    <div id=\"pp\">  <form action=\"/search\" method=\"POST\" class=\"form-inline\" role=\"form\">    <p id=\"st\">Please Enter Stock Numbers Below </p> <input class=\"form-control\" type=\"text\" name=\"stockNumber\" placeholder=\"Stock Number (ex:4429)\" size=\"30\">    <input class=\"btn btn-default\" type=\"submit\" name=\"submit\" value=\"submit\">  </form></div><style>  #st{font-size: 30px;font-family: \'Droid Sans\', sans-serif}  #pp{position: relative;position: absolute; margin-top: 10px; margin-left: 30px}</style><!-- google font --><link href=\'http://fonts.googleapis.com/css?family=Droid+Sans\' rel=\'stylesheet\' type=\'text/css\'><!-- Latest compiled and minified CSS --><link rel=\"stylesheet\" href=\"//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css\"><!-- Optional theme --><link rel=\"stylesheet\" href=\"//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css\"><!-- Latest compiled and minified JavaScript --><script src=\"//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js\"></script>");
      
  },  
  /**
   * Action blueprints:
   *    `/fetchdata/new`
   */
   'search': function (req, res) {
      console.log("hello");
      var http = require("http");
      var cheerio = require("cheerio");
      var input = req.param('stockNumber');
      var url = "http://www.cnyes.com/twstock/finratio/" + input + ".htm";
      console.log("helloooo");
      function download(url, callback) {
      http.get(url, function(res) {
          var data = "";
          res.on('data', function (chunk) {
            data += chunk;
          });
          res.on("end", function() {
          callback(data);
          });
        }).on("error", function() {
          callback(null);
        });
      }
      download(url, function(data) {
        var output;
        if (data) {
          //console.log(data + "*");
          var $ = cheerio.load(data);
          //console.log($('div[class=tab]').html());
          res.write("<html><head><meta charset='UTF-8'/></head>");
          res.write("<body>");
          res.write($('.tab').html());
          res.write("</body></html>");
          console.log("done");
        }
        else console.log("error");  
      });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to FetchDataController)
   */
  _config: {}

  
};
