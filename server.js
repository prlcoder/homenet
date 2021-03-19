const express = require('express');
require('dotenv').config();
const port = process.env.port;
const serverAdd = process.env.serverAdd;
const mqttPort = process.env.mqttPort;
const mqttUser = process.env.mqttUser;
const mqttPass = process.env.mqttPass;
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://' + serverAdd + ':' + mqttPort, { username: mqttUser, password: mqttPass });

//Setup Static Folder
app.use(express.static(path.join(__dirname, 'homenet_web')));

//Device Setup
let lightSwitchDev = [
    'testdevice',
    'sonoff1',
    'sonoff2',
    'sonoff3',
    'sonoff4',
    'sonoff5',
    'sonoff6'
];
let lightSwitchStat = [
    'testdevice',
    'sonoff1on',
    'sonoff2on',
    'sonoff3',
    'sonoff4',
    'sonoff5',
    'sonoff6'
];

//Subsribe to mttq broker and topic
client.subscribe('stat/#');

//Setup MTQQ Listener and populate light state
client.on('message', function (topic, message, packet) {
    for (i = 1; i < lightSwitchDev.length; i++) {
        if (topic == 'stat/sonoff' + i + '/POWER') {
            lightSwitchStat[i] = lightSwitchDev[i] + message;
        }
    }
});

//When first Started request switch states
for (i = 1; i < lightSwitchDev.length; i++) {
    client.publish('cmnd/' + lightSwitchDev[i] + '/Power');
};

//Open Socket
io.on('connection', (socket) => {

    //Emit light status on user connect
    io.emit('lightstate', lightSwitchStat[1]);

    //send button state to users
    function emDev(dev){
        io.emit('lightstate', lightSwitchStat[dev]);
    };
    //Listen for input from app/web client
    socket.on('switch', function (data) {
        if (data == 'sonoff1') {
            client.publish('cmnd/' + data + '/Power', 'toggle');
            setTimeout(function () {
                emDev(1);
            }, 200);
        }
        else if (data == 'sonoff2') {
            client.publish('cmnd/' + data + '/Power', 'toggle');
            setTimeout(function () {
                emDev(2);
            }, 200);
        }
        else if (data == 'sonoff3') {
            client.publish('cmnd/' + data + '/Power', 'toggle');
            setTimeout(function () {
                emDev(3);
            }, 200);
        }
        else if (data == 'sonoff4') {
            client.publish('cmnd/' + data + '/Power', 'toggle');
            setTimeout(function () {
                emDev(4);
            }, 200);
        }
        else if (data == 'sonoff5') {
            client.publish('cmnd/' + data + '/Power', 'toggle');
            setTimeout(function () {
                emDev(5);
            }, 200);
        }
        else if (data == 'sonoff6') {
            client.publish('cmnd/' + data + '/Power', 'toggle');
            setTimeout(function () {
                emDev(6);
            }, 200);
        }
        else console.log('There was an error!!');
    });
});

//Start http server
http.listen(port, (err) => {
    if (err) {
        console.log('There was a problem', err);
        return;
    }
    console.log(`Server started on - Address: ${serverAdd} - Port: ${port}`);
})

