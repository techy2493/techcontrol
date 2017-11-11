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

var state = 0;


function controller(os) {
    this.initialize = function(webserver){
        
        this.webserver = webserver;
        
        this.state = 0;
        
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
        console.log(state)
        if (state != 0){
            console.log('Server is running! Can\'t Start Now!')
            return;
        }
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
            if (data.toString().search('Crash: Restarting')  != -1 ){
                console.log('Crash detected. Restarting.')
                server.kill();
                server.start();
            }
            console.log(server.pid);
        });

        state = 1;
        console.log(state)
        
    }

    this.stop =function(){
        console.log(state)
        if (state != 1){
            console.log('Server is not running! Can\'t Stop Now!')
            return;
        }
        switch(config['Type']){
            case 'ServUO':{
                console.log('Server Shutdown Requested. Saving First!')
                server.stdin.write('shutdown\n');
            }
        }
        
        state = 0;
    }
    

    this.restart = function(){
        console.log(state)
        if (state != 1){
            console.log('Server is not running! Can\'t Restart Now!')
            return;
        }
        switch(config['Type']){
            case 'ServUO':{
                console.log('Server Restart Requested. Saving First!')
                server.stdin.write('shutdown\n');
                state = 0;
                this.start();
            }
        }
    }

    this.update = function(){
        switch (updateStrategy){
            case GIT: {
                child_process.execSync('git pull --depth=1 ', {cwd:config['StartDir']} )
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