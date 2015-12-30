var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
    
    // accesses the vars exported in app.js
    var FB = req.app.get('FB');
    var Step = req.app.get('Step');
    
    Step(
        function getPageData() {
            var self = this;
            
            // runs the FB Graph API call 
            // receives the JSON file as a reponse
            FB.api('corebrewery', { fields: ['id', 'name', 'mission'] }, function (jsonRes) {
                if(!jsonRes || jsonRes.error) {                    
                    self(new Error('Error with JSON data returned from FB..'));                    
                } else {
                    self(null, jsonRes);
                }
                console.log('==========================');
                console.log("inside API Call(jsonRes.id): " + jsonRes.id);
                console.log("inside API Call(jsonRes.name): " + jsonRes.name);
                console.log("inside API Call(jsonRes.mission:): ");
                console.log(jsonRes.mission);
                console.log(' ');
                console.log("inside API Call(jsonRes): ");
                console.log(jsonRes);
                console.log(' ');
                console.log('==========================');  
       
            });
            
        }, 
        // processes the JSON data from FB
        // renders it to the template
        function processData(err, jsonData) {
            res.render('index', { title: 'Connect to FB API', name: jsonData.name, mission: jsonData.mission });
        }
    );
    
});

module.exports = router;
