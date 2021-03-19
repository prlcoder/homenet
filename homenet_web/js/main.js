

$(function () {

    var socket = io();

    socket.on('lightstate', function (data) {
        console.log('data is: ' + data)
        if (data == 'sonoff1ON') {
            $('#light_button1').css('background-color', 'red');
        }
        else if (data == 'sonoff1OFF'){
            $('#light_button1').css('background-color', 'white');
        }
        else if (data == 'sonoff2ON'){
            $('#light_button2').css('background-color', 'red');
        }
        else if (data == 'sonoff2OFF'){
            $('#light_button2').css('background-color', 'white');
        }
        else if (data == 'sonoff3ON'){
            $('#light_button3').css('background-color', 'red');
        }
        else if (data == 'sonoff3OFF'){
            $('#light_button3').css('background-color', 'white');
        }
        else if (data == 'sonoff4ON'){
            $('#light_button4').css('background-color', 'red');
        }
        else if (data == 'sonoff4OFF'){
            $('#light_button4').css('background-color', 'white');
        }
        else if (data == 'sonoff5ON'){
            $('#light_button5').css('background-color', 'red');
        }
        else if (data == 'sonoff5OFF'){
            $('#light_button5').css('background-color', 'white');
        }
        else if (data == 'sonoff6ON'){
            $('#light_button6').css('background-color', 'red');
        }
        else if (data == 'sonoff6OFF'){
            $('#light_button6').css('background-color', 'white');
        }
        else console.log('error - no data match');
    });


    $("#light_button1").click(function () {
        if (socket.connected == true) {
            socket.emit("switch", "sonoff1");
        }
        else console.log("Error - No connection to server!");
    });

    $("#light_button2").click(function () {
        if (socket.connected == true) {
            socket.emit("switch", "sonoff2");
        }
        else console.log("Error - No connection to server!");
    });

    $("#light_button3").click(function () {
        if (socket.connected == true) {
            socket.emit("button3pressed", 1);
        }
        else console.log("Error - No connection to server!");
    });

    $("#light_button4").click(function () {
        if (socket.connected == true) {
            socket.emit("button4pressed", 1);
        }
        else console.log("Error - No connection to server!");
    });

    $("#light_button5").click(function () {
        if (socket.connected == true) {
            socket.emit("button5pressed", 1);
        }
        else console.log("Error - No connection to server!");
    });

    $("#light_button6").click(function () {
        if (socket.connected == true) {
            socket.emit("button6pressed", 1);
        }
        else console.log("Error - No connection to server!");
    });

    $("#light_alloff").click(function () {
        if (socket.connected == true) {
            socket.emit("buttonalloffpressed", 1);
        }
        else console.log("Error - No connection to server!");
    });
});