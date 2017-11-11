//TODO: make an actual session and validate.
var express = require('express');
var cookie = require('cookie-parser');



function login() {
    this.authenticate = function (req, res) {
        console.log(req.body);
        var users = {techy:"test"}
        if (users[req.body['user']]) {
            if (users[req.body['user']] = req.body['pass']){
                res.cookie("tcon_authenticated", true)
                res.cookie("tcon_sessionid", 1)
                res.cookie("tcon_user", req.body['user'])
                res.redirect('/authorized/console.html')
            }
        } else {
            res.redirect('login.html')
        }   
    }

}

module.exports = new login;