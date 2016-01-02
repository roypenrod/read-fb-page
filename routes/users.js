var express = require('express');
var router = express.Router();


/* GET root page */
router.get('/', function(req, res, next) {
    
    res.send('user data goes here');
    res.end();
    
});
           
module.exports = router;
