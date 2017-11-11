//TODO: make an actual session and validate.
var express = require('express');
var cookie = require('cookie-parser');



function control() {
    this.command = function (req, res, controller) {
        console.log(req.body);
         switch(req.body['action']){
            case 'start':
                console.log('Starting!');
                controller.start();
                break;
            case 'stop':
                console.log('Stopping!');
                controller.stop();
                break;
            case 'restart':
                console.log('Restarting!');
                controller.restart();
                break;
            case 'update':
                console.log('Not implimented Yet!');
                break;
         }
    }
}


module.exports = new control;