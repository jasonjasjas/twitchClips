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
    getClips(req.params.id,req.query.startdate,req.query.enddate,function(dataObject){
        if(!dataObject.hasOwnProperty('data')){
            res.render('user', {title: req.params.id, error: JSON.parse(body).message + ' ' + JSON.parse(body).error, startdate:req.query.startdate, enddate:req.query.enddate});
            return;
        } else if(dataObject.data.length == 0){
            getUserName(req, res, next, req.params.id);
            return;
        }else{
            res.render('user', {title: dataObject.data[0].broadcaster_name, clips: dataObject.data, startdate:req.query.startdate, enddate:req.query.enddate, cursor: dataObject.pagination.cursor, id:req.params.id});
        }
    });


    

};

function getClips(id,startdate,enddate,callback,cursor){
    var url = 'https://api.twitch.tv/helix/clips?first=100&broadcaster_id='+ id;
    if(enddate){
        url += '&ended_at=' + enddate + 'T23:59:59Z';
    }
    if(startdate){
        url += '&started_at=' + startdate + 'T00:00:00Z';
    }
    if(cursor){
        url += '&after=' + cursor;
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
            callback(JSON.parse(body));
        }
    );
}


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