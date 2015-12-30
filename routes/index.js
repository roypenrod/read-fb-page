var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
    
    // accesses the vars exported in app.js
    var FB = req.app.get('FB');
                
    // runs the FB Graph API call and handles the response
    FB.api('corebrewery', { fields: ['id', 'name', 'mission'] }, function (jsonRes) {
        if(!jsonRes || jsonRes.error) {
            console.log(!jsonRes ? 'error occurred' : jsonRes.error);
            return;
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
        
        req.app.set('jsonRes', jsonRes);
       
    });
    
    var jsonData = req.app.get('jsonRes');
    
    console.log("----------------------------");   
    console.log("outside API Call(jsonData): ");
    console.log(jsonData);
    console.log("----------------------------");
    console.log("outside API Call (res.name): " + jsonData.name);    
    res.render('index', { title: 'Connect to FB API', name: jsonData.name, mission: jsonData.mission });
    
});

module.exports = router;
