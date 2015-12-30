var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    // accesses the var we export in app.js
    var FB = req.app.get('FB');
    
    // runs the FB Graph API call and handles the response
    FB.api('corebrewery', { fields: ['id', 'name'] }, function (res) {
      if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
      }
      console.log(res.id);
      console.log(res.name);
    });
    
        
    res.render('index', { title: 'Express' });
});

module.exports = router;
