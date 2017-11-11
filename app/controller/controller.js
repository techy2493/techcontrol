const os = require('os');

var controller = null;
// Determine what OS


// Initialize Controller for that OS

switch (os.platform()){
case 'aix':
    notSupportedPlatform();
    break;
case 'darwin':
    notSupportedPlatform();
    break;
case 'freebsd':
    notSupportedPlatform();
    break;
case 'linux':
    initializeLinux();
    break;
case 'openbsd':
    notSupportedPlatform();
    break;
case 'sunos':
    notSupportedPlatform();
    break;
case 'win32':
    initializeWindows();
    break;
default:
    notSupportedPlatform();
    break;
}

function notSupportedPlatform(){
    console.log('Not Supported Control Platform. Controller Not Initialized.')
}

function initializeWindows(){
    console.log('Initializing Windows Controller');
    controller = require('./windowscontroller.js')
}

function initializeLinux(){
    console.log('Initializing Linux Controller');
    controller = require('./linuxcontroller.js')
}

module.exports = controller;