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
    
  
  /**
   * Action blueprints:
   *    `/fetchdata/new`
   */
   'search': function (req, res) {
    
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
   * Action blueprints:
   *    `/fetchdata/create`
   */
   create: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to FetchDataController)
   */
  _config: {}

  
};
