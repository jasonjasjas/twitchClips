const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const request = require('request');
var async = require('async');
//Search for users
exports.search_user_form = function(req, res, next) {
    console.log('get');
    res.render('follows', {followers: undefined });
};

exports.search_user = function(req, res, next) {

    /*async.series({
        one: function(callback){
            getUserId(userID,request,req,res,callback);
            
        },
        followers: function(callback){
            getFollowers(userID,request,req,res,callback);
        }
    },function(err,resuls){
        res.render('follows', { title: 'Clips' });
    });*/
    getFollowers(request,req,res,next);
};

function getFollowers(request,req,res,next){
    var userID;
    //Get twitch ID of user
    request(
        {
            url : 'https://api.twitch.tv/helix/users?login=' + req.body.username,
            headers:{
                'Client-ID':'ni8zt60r5kkkwzuzdbz7anxyutnpad'
            }
        },
        function (error, response, body) {
            if(error){return next(error); }
            console.log(JSON.parse(body));
            if(!JSON.parse(body).hasOwnProperty('data')){
                res.render('follows', {followers: undefined, username: req.body.username, error: JSON.parse(body).message});
                return;
            }
            if(JSON.parse(body).data.length == 0){
                res.render('follows', {followers: undefined, username: req.body.username, error: 'User not found'});
                return;
            }
            userID = JSON.parse(body).data[0].id;
            getFollowersData(request,req,res,next,userID)
        }
    );
    
}

function getFollowersData(request,req,res,next,userID,total,pagination,followers){
    //Get followers data using userID
    if(pagination == undefined){
        //First call
        var url = 'https://api.twitch.tv/helix/users/follows?first=100&from_id=' + userID;
    }else{
        var url = 'https://api.twitch.tv/helix/users/follows?first=100&from_id=' + userID + '&after=' + pagination;
    }

    request(
        {
            url : url,
            headers:{
                'Client-ID':'ni8zt60r5kkkwzuzdbz7anxyutnpad'
            }
        },
        function (error, response, body) {
            if(error){return next(error); }
            //console.log(body);
            var result = JSON.parse(body);
            
            if(followers == undefined){
                //First call
                followers = result.data;
            }else{
                followers = followers.concat(result.data);
            }
            console.log(result.total);
            if(result.total == 0){
                res.render('follows', { followers: undefined, username: req.body.username, error: 'User does not follow anyone'});
                return;
            }
            //console.log(result.pagination.cursor);
            if(result.data.length == 100){
                getFollowersData(request,req,res,next,userID,total,result.pagination.cursor,followers)
                return;
            }
            //Render data on the class call
            res.render('follows', {followers: followers, username: req.body.username });
        }
    );
    
}