//TODO: make an actual session and validate.
var express = require('express');
var cookie = require('cookie-parser');
var _ = require('lodash')



function login() {
    this.authenticate = function (req, res) {
        //Load Controller Config File
        var fs = require('fs');
        users = JSON.parse(fs.readFileSync('./users.json', 'utf8'))['userlist'];
        var user = users.find(x=> x.username === req.body['user'])
        if (user && user.password === req.body['pass']) {
                res.cookie('tcon_authenticated', true)
                res.cookie('tcon_sessionid', 1)
                res.cookie('tcon_user', req.body['user'])
                res.redirect('/authorized/console.html')
        } else {
            res.redirect('login.html')
        }   
    }

}

module.exports = new login;