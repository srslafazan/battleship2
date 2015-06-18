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
			
			// USER PRESSES "READY BUTTON"
				socket.on("startButtonPressed", function (data) {
					console.log('start button was pressed!');
					
					// SET PLAYER GAMEBOARD FROM SELECTION

					if (true) { // IF OTHER USER IS READY
						
						// START GAME
							// 1. DETERMINE PLAYER1/PLAYER2 BASED ON WHO PICKED FIRST
							// 2. SEND GAME-START MESSAGES TO PLAYERS AND CHANGE PLAYER VIEWS

					} else {
						// NOTIFY NOT-READY PLAYER THAT OTHER PLAYER IS READY TO START
						// NOTIFY READY PLAYER THAT WAITING ON OTHER PLAYER
					}
				});

			// GAMEPLAY LOGIC:

				// 1. USER SELECTS COORDINATES TO ATTACK
					socket.on('gameBoardPressed', function (data){

						if (true) { // IF A BATTLESHIP WAS HIT, WE CHANGE MARKER AT BOARD POSITION TO HIT BATTLESHIP MARKER

							// ENSURE VESSEL TYPE IS SHOWN TO PLAYER THAT HIT IT
							
							if (false) { // IF VESSEL-TYPE HAS NO MORE PORTIONS REMAINING ON PLAYERBOARD
								// 1. SHOW PLAYERS THAT BATTLESHIP WAS SUNK

								// 2. CHECK IF ANY REMAINING BATTLESHIPS, HANDLE WIN LOGIC:
							}
						

						} else {

							// ELSE, SAY MISS

						}

						// CHANGE TO NEXT PLAYER'S TURN
					});
					


			// socket.on("swift", function(data) {
			//   	console.log("a vote for swift");
			//   	socket.broadcast.emit("update_swift");
			// });
		});


// PLAYER PLACES BATTLESHIPS
	// GAME BOARDS
	// have numbered battleships (1-5)

	var player1board = [
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
	];

	var player2board = [
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
	];

	// PLAYER READY TO START?

	var player1ready = false;

	var player2ready = false;