var express = require('express');
var router = express.Router();

var fbPageAlias = "corebrewery";

// takes the category list from FB's JSON format
// and returns it as an array of category names
function fbExtractCategoryFromList(fbCategoryList) {
    var returnArray = [];
    
    fbCategoryList.forEach(function (value, index, array) {
        returnArray.push(value.name);        
    });
    
    return returnArray;
}

// splits a string into an array 
// splits based on the separator substring
// returns an array of strings
function splitStringIntoArray(string, seperator) {
    var returnArray = string.split(seperator);
    
    // trims the whitespace from the beginning
    // and end of each string
    for (var i=0; i < returnArray.length; i++) {
        returnArray[i] = returnArray[i].trim();
    }
    
    return returnArray;
}



/* GET home page */
router.get('/', function(req, res, next) {
    
    
    // accesses the vars exported in app.js
    var FB = req.app.get('FB');
    var Step = req.app.get('Step');
    var CORE_MAIN_PHOTO_URL = req.app.get('CORE_MAIN_PHOTO_URL');
    
    // build the fields array here to make 
    // code more readable
    var fbApiFields = [
        'id',
        'name',
        'picture',
        'category_list',
        'company_overview',
        'mission',
        'products',
        'awards',
        'website',
        'link',
        'emails',
        'likes',
        'were_here_count',
        'location',
        'phone'
    ];
    
    Step(
        // retrieves the Page data from FB in JSON format
        function getPageData() {
            
            var self = this;
            
            // runs the FB Graph API call 
            // receives the JSON file as a reponse
            FB.api(fbPageAlias, { fields: fbApiFields }, function (jsonRes) {
                if(!jsonRes || jsonRes.error) {                    
                    self(new Error('Page Error: Problem with JSON data returned from FB.'));                    
                } else {
                    self(null, jsonRes);
                }
            });
            
        }, 
        // retrieves the list of uploaded Photos from FB in JSON format
        function getPhotoList(err, pageDataJSON) {
            
            var self = this;
            
            // runs the FB Graph API call 
            // receives the JSON file as a reponse            
            FB.api(fbPageAlias + '/photos?type=uploaded', function (jsonRes) {
                if(!jsonRes || jsonRes.error) {                    
                    self(new Error('PhotoID Error: Problem with JSON data returned from FB.'));                    
                } else {
                    self(null, pageDataJSON, jsonRes);
                }
//                console.log('==========================');
//                console.log(' ');
//                console.log(jsonRes);
//                console.log(' ');                
//                console.log('==========================');  
       
            });
        },
        // processes the JSON data from FB
        // renders it to the template
        function processData(err, pageDataJSON, photoIdJSON) {
            
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!');
            console.log(' ');
            console.log(pageDataJSON);
            console.log(' ');
            console.log(' 000000000000000000000000 ');
            console.log(' ');
            console.log(photoIdJSON);
            console.log(' ');                
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!');  
            
            // break out the category list into new var
            var category = fbExtractCategoryFromList (pageDataJSON.category_list);
            
            // splits the company overview into an array of strings
            var companyOverview = splitStringIntoArray(pageDataJSON.company_overview, '\n\n');            
            
            // splits the awards into an array of strings
            var awards = splitStringIntoArray(pageDataJSON.awards, '\n\n');
                        
            res.render('profile', { title: pageDataJSON.name + " -- Profile", 
                                    name: pageDataJSON.name,
                                    pictureURL: pageDataJSON.picture.data.url,
                                    category: category,
                                    companyOverview: companyOverview,
                                    mission: pageDataJSON.mission,
                                    products: pageDataJSON.products,
                                    awards: awards,
                                    mainPhotoURL: CORE_MAIN_PHOTO_URL,
                                    likes: pageDataJSON.likes,
                                    visits: pageDataJSON.were_here_count,
                                    websiteURL: pageDataJSON.website,
                                    fbURL: pageDataJSON.link,
                                    email: pageDataJSON.emails,
                                    phone: pageDataJSON.phone,
                                    streetAddress: pageDataJSON.location.street,
                                    city: pageDataJSON.location.city,
                                    state: pageDataJSON.location.state,
                                    zipCode: pageDataJSON.location.zip,
                                    reviewsURL: 'http://www.facebook.com/' + fbPageAlias + '/reviews'
                                });
        }
    );    
    
});

           
module.exports = router;
