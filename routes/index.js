var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
    
    // accesses the vars exported in app.js
    var FB = req.app.get('FB');
    var Step = req.app.get('Step');
    
    // build the fields array here to make 
    // code more readable
    var fbApiFields = [
        'id',
        'name',
        'mission',
        'about',
        'can_checkin',
        'can_post', 
        'category',
        'category_list',
        'company_overview',
        'cover',
        'display_subtext',
        'emails',
        'founded',
        'is_community_page',
        'is_published',
        'is_unclaimed',
        'is_verified',
        'link',
        'location',
        'place_type',
        'verification_status',
        'website',
        'likes',
        'picture',
        'products'
        
    ];
    
    Step(
        function getPageData() {
            var self = this;
            
            // runs the FB Graph API call 
            // receives the JSON file as a reponse
            FB.api('corebrewery', { fields: fbApiFields }, function (jsonRes) {
                if(!jsonRes || jsonRes.error) {                    
                    self(new Error('Error with JSON data returned from FB.'));                    
                } else {
                    self(null, jsonRes);
                }
                console.log('==========================');
                console.log(' ');
                console.log(jsonRes);
                console.log(' ');                
                console.log('==========================');  
       
            });
            
        }, 
        // processes the JSON data from FB
        // renders it to the template
        function processData(err, jsonData) {
            res.render('index', { title: 'Connect to FB API', 
                                 name: jsonData.name, 
                                 mission: jsonData.mission, 
                                 about: jsonData.about, 
                                 canCheckIn: jsonData.can_checkin, 
                                 canPost: jsonData.can_post, 
                                 category: jsonData.category, 
                                 categoryList: jsonData.category_list,
                                 companyOverview: jsonData.company_overview,
                                 cover: jsonData.cover,
                                 displaySubtext: jsonData.display_subtext,
                                 email: jsonData.emails[0],
                                 founded: jsonData.founded,
                                 isCommunityPage: jsonData.is_community_page,
                                 isPublished: jsonData.is_published,
                                 isUnclaimed: jsonData.is_unclaimed,
                                 isVerified: jsonData.is_verified,
                                 link: jsonData.link,
                                 location: jsonData.location,
                                 placeType: jsonData.place_type,
                                 verificationStatus: jsonData.verification_status,
                                 website: jsonData.website,
                                 pictureURL: jsonData.picture.data.url,
                                 products: jsonData.products
                                });
        }
    );
    
});

module.exports = router;
