var control = require('./control.js')
var controlpath = '/control'


module.exports = {
configure: function(app, controller){
        app.post(controlpath, function (req, res){
            control.command(req, res, controller);
        });
    }

}