var express = require('express');
var app = express();
var serveStatic = require('serve-static');
var cookie = require('cookie-parser');
var body = require ('body-parser')

var path = require('path');

var publicpath = path.join(__dirname, '../../pages/public'); 
var authorizedpath = path.join(__dirname, '../../pages/authorized'); 

var controller = null;

//Serve static files from pages.

function webserver(){
    this.initialize = function(controller) {
        this.controller = controller;
        app.use(cookie());
        app.use(body.json());
        app.use(body.urlencoded({ extended: true }));
        app.use(serveStatic(publicpath));

        //Pickup routes from secondary modules
        var authenticateRoutes = require('./authenticate/routes.js')
        authenticateRoutes.configure(app);

        var controlRoutes = require('./control/routes.js')
        controlRoutes.configure(app, controller);

        listenport = 80;
        app.listen(listenport);

        console.log('Listening on port: ' + listenport);
        console.log('Serving to everyone: ' + publicpath);
        //console.log('Serving to authenticated users: ' + authorizedpath);

    }

}


module.exports = new webserver;