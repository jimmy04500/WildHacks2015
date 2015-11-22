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

<!-- //testing counter for classes -->
var cs225_count = 0;
var cs241_count = 0;
var cs374_count = 0;
var cs225_rating = 0;
var cs241_rating = 0;
var cs374_rating = 0;

//end of test
var id = 1;
var online = 0;
var random_color = getRandomColor();
io.on('connection', function(socket){
	var my_id = id ;
	var rand_color = random_color;
	io.emit('user connected', ('Anon#' + my_id).fontcolor(rand_color) + ' is connected');

	//count # of people online
		online = online + 1;
		io.emit('one more user', online);

	socket.on('chat message', function(msg){
		var test = "Anon#"+ my_id;
		var test_it = test.fontcolor(rand_color);
		if (msg.toString().toLowerCase() == "cat") {
			msg = "https://cdn1.vox-cdn.com/thumbor/vgHtNlYCemvKR2WljMqRfF5tkwo=/0x32:1024x608/1050x591/cdn0.vox-cdn.com/uploads/chorus_image/image/45329786/GrouponCat.0.jpg";
			io.emit('image message', msg);
		}
		else {
			io.emit('chat message', test_it + ": " + msg);
		}
	});

	socket.on('disconnect', function() {
		var test = "Anon#"+ my_id;
		var test_it = test.fontcolor(rand_color);
		io.emit('user disconnect', test_it + " has disconnected");
		online--;
		io.emit('one less user', online);
	});
	//testing for cs

	//end of cs test

	id++;
	random_color = getRandomColor();
});

http.listen(port, function(){
	console.log('listening on ' + port);
});
