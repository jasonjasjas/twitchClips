var express = require('express');
var router = express.Router();

//Controller modules
var follows_controller = require('../controllers/followsController');
var user_controller = require('../controllers/userController');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/userForm');
});

//Clips Routes

//GET request for searching user's following
router.get('/follows', follows_controller.search_user_form);

//POST request for searching user's following
router.post('/follows', follows_controller.search_user);

//GET request for searching users
router.get('/userForm', user_controller.userForm);

//POST request for searching users
router.post('/userForm', user_controller.getUserID);

//GET request for showing clips of given users
router.get('/user/:id', user_controller.showClips);




module.exports = router;
