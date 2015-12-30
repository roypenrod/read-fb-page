var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
    
    // accesses the var exported in app.js
    var FB = req.app.get('FB');
            
    // runs the FB Graph API call and handles the response
    FB.api('corebrewery', { fields: ['id', 'name', 'mission'] }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }
        console.log('==========================');
        console.log("inside API Call(res.id): " + res.id);
        console.log("inside API Call(res.name): " + res.name);
        console.log("inside API Call(res.mission:): ");
        console.log(res.mission);
        console.log(' ');
        console.log("inside API Call(res): ");
        console.log(res);
        console.log(' ');
        console.log('==========================');            
       
    });
    
    
    console.log("----------------------------");   
    console.log("outside API Call(res): ");
    console.log(res);
    console.log("----------------------------");
    console.log("outside API Call (res.name): " + res.name);    
    res.render('index', { title: 'Connect to FB API', name: res.name, mission: res.mission });
    
});

module.exports = router;
