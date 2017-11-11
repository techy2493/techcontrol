var login = require('./login.js')
var validate = require('./validate.js')
var authpath = '/authenticate'


module.exports = {
configure: function(app){
        app.post(authpath, function (req, res){
            login.authenticate(req, res);
        });

        app.get(authpath, function(req, res){
            validate.validate(req, res);
        })

    }

}