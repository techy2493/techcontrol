webserver = require('./app/web/webserver.js')
controller = require('./app/controller/controller.js')


webserver.initialize(controller);


if (controller){
    controller.initialize(webserver);
} else{
    console.log('Unable to load controller.')
}
