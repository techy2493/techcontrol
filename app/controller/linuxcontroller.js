var child_process = require('child_process')
var stream = require('stream')
var updateStrategy = null;
var updateString = null;
var config = null;

const spawn = require('child_process').spawn
const GIT = 'git';
const SRCDS = 'srcds';

var server = null;
var webserver = null;

function controller(os) {
    this.initialize = function(webserver){
        
        this.webserver = webserver;

        //Load Controller Config File
        var fs = require('fs')
        config = JSON.parse(fs.readFileSync('./controller.json', 'utf8'))
        console.log(config);
        

        switch(config['Type']){
            case 'ServUO':{
                updateStrategy = GIT
                startDir = config['']
                if (!fs.existsSync(config['StartDir'])){
                    this.install();
                }
                if (config['UpdatePath']){
                    udpateString = 'git'
                }
            }

        }
    }

    this.start = function(){
        server = spawn(config['Type'] + '.exe', [], { stdio: ['pipe','pipe','pipe','pipe'], cwd: config['StartDir'] });
        server.stdout.on('data', (data) => {
            console.log(data.toString())
            if (data.toString().search('Enter the Ultima Online directory:')  != -1 ){
                console.log('Error, please set UO Directory Override in Data.cs')
                server.kill();
            }
            if (data.toString().search('you want to create the owner account now? (y/n)')  != -1 ){
                console.log(data.toString().search('the owner account now'));
                console.log('Error, make an owner account first!')
                server.kill();
            }
            console.log(server.pid);
        });
        
    }

    this.stop =function(){
        switch(config['Type']){
            case 'ServUO':{
                console.log('Server Shutdown Requested. Saving First!')
                server.stdin.write('shutdown\n');
            }
        }
    }
    

    this.restart = function(){
        switch(config['Type']){
            case 'ServUO':{
                console.log('Server Restart Requested. Saving First!')
                server.stdin.write('shutdown\n');
                this.start();
            }
        }
    }

    this.update = function(){
        switch (updateStrategy){
            case GIT: {
                child_process.execSync('git pull --depth=1 --branch=' + config['GitBranch'] + ' ' + config['GitRepo'], {cwd:config['StartDir']} )
            }
        }
    }

    this.install= function(){
        switch (updateStrategy){
            case GIT: {
                child_process.execSync('git clone --depth=1 --branch=' + config['GitBranch'] + ' ' + config['GitRepo'] + ' ' + config['StartDir'])
            }
        }
    }
}

module.exports = new controller;