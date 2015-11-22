var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

function getRandomColor() {
 	var letters = '0123456789ABCDEF'.split('');
 	var color = '#';
	for (var i = 0; i < 6; i++ ) {
    	color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
app.get('/', function(req, res){
	 res.sendFile(__dirname + '/index.html');
});
var id = 1;
var random_color = getRandomColor();
io.on('connection', function(socket){
	var my_id = id ;
	var rand_color = random_color;
	io.emit('user connected', ('Anon#' + my_id).fontcolor(rand_color) + ' is connected')
	socket.on('chat message', function(msg){
		var test = "Anon#"+ my_id;
		var test_it = test.fontcolor(rand_color);
		io.emit('chat message', test_it + ": " + msg);
	});
	socket.on('disconnect', function() {
		var test = "Anon#"+ my_id;
		var test_it = test.fontcolor(rand_color);
		io.emit('user disconnect', test_it + " has disconnected");
	});
	id++;
	random_color = getRandomColor();
});

http.listen(port, function(){
	console.log('listening on ' + port);
});
