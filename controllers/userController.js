const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const request = require('request');
var async = require('async');

//userForm GET
exports.userForm = function(req, res, next) {
    res.render('userForm', { });
};

//userForm POST
exports.getUserID = function(req, res, next) {
    request(
        {
            url : 'https://api.twitch.tv/helix/users?login=' + req.body.username,
            headers:{
                'Client-ID':'ni8zt60r5kkkwzuzdbz7anxyutnpad'
            }
        },
        function (error, response, body) {
            if(error){return next(error); }
            if(!JSON.parse(body).hasOwnProperty('data')){
                console.log(JSON.parse(body));
                res.render('userForm', {username: req.body.username, error: JSON.parse(body).message});
                return;
            }
            if(JSON.parse(body).data.length == 0){
                res.render('userForm', {username: req.body.username, error: 'User not found'});
                return;
            }
            var userID = JSON.parse(body).data[0].id;
            console.log(JSON.parse(body).data[0].login);
            res.redirect('/user/'+ userID);
        }
    );
};

//user/:id GET
exports.showClips = function(req, res, next) {
    var url = 'https://api.twitch.tv/helix/clips?first=100&broadcaster_id='+ req.params.id;
    if(req.query.enddate){
        url += '&ended_at=' + req.query.enddate + 'T23:59:59Z';
    }
    if(req.query.startdate){
        url += '&started_at=' + req.query.startdate + 'T00:00:00Z';
    }
    console.log(url);
    request(
        {
            url : url,
            headers:{
                'Client-ID':'ni8zt60r5kkkwzuzdbz7anxyutnpad'
            }
        },
        function (error, response, body) {
            if(error){return next(error); }
            //console.log(JSON.parse(body));
            if(!JSON.parse(body).hasOwnProperty('data')){
                console.log(JSON.parse(body));
                res.render('user', {title: req.params.id, error: JSON.parse(body).message + ' ' + JSON.parse(body).error, startdate:req.query.startdate, enddate:req.query.enddate});
                return;
            }
            if(JSON.parse(body).data.length == 0){
                getUserName(req, res, next, req.params.id);
                return;
            }
            dataObject = JSON.parse(body);
            //console.log(dataObject);
            res.render('user', {title: dataObject.data[0].broadcaster_name, clips: dataObject.data, startdate:req.query.startdate, enddate:req.query.enddate});
        }
    );

};


function getUserName(req, res, next, id){
    request(
        {
            url : 'https://api.twitch.tv/helix/users?id='+ req.params.id ,
            headers:{
                'Client-ID':'ni8zt60r5kkkwzuzdbz7anxyutnpad'
            }
        },
        function (error, response, body) {
            if(error){return next(error); }
            //console.log(JSON.parse(body));
            if(!JSON.parse(body).hasOwnProperty('data')){
                res.render('user', {title: req.params.id, error: JSON.parse(body).message});
                return;
            }
            res.render('user', {title: JSON.parse(body).data[0].login, error: 'User has no clips', startdate:req.query.startdate, enddate:req.query.enddate});
        }
    );
};