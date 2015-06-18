// MODULES
	var express = require('express'),
		path = require('path'),
		app = express(),
		bodyParser = require('body-parser');
		
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json()); 

	require('./config/mongoose.js');

// STATIC DIRECTORY
	app.use(express.static(path.join(__dirname, './client')));

// ROUTES
	require('./config/routes.js')(app);

// SERVER
	var port = process.env.PORT || 8000;

	var server = app.listen(port, function(){
		console.log('> LISTENING ON PORT *.8000');
	});

// SOCKETS
	var io = require('socket.io').listen(server);

		io.sockets.on('connection', function (socket){
			console.log('starting socket connection w/ socketID: ' + socket.id);
			
			socket.on("javascript", function(data) {
			 	console.log("a vote for javascript");
			 	socket.broadcast.emit("update_javascript");
			});
			socket.on("swift", function(data) {
			  	console.log("a vote for swift");
			  	socket.broadcast.emit("update_swift");
			});
		});