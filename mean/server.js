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


// PLAYER PLACES BATTLESHIPS
	// GAME BOARDS
	// have numbered battleships (1-5)

	var isFirstPlayersTurn = true;
	// PLAYER READY TO START?
	var player1 = {
		ready: false,
		ships: [],
		shots: [],
		socketID: ""
	}

	var player2 = {
		ready: false,
		ships: [],
		shots: [],
		socketID: ""
	}


// SOCKETS
	var io = require('socket.io').listen(server);

		io.sockets.on('connection', function (socket){
			console.log('starting socket connection w/ socketID: ' + socket.id);
			if (player1.ready && !(player2.ready)){
				player1.socketID = socket.id;
			} 

			if (player2.ready) {
				player2.socketID = socket.id;
			}


// if player1 has set their board and player2 hasn't... then 
	// we know player1's new connection is going through
	// we set player1 to new socket

	// then we set bool for "waiting for player 2" to true
	// if "waiting for player 2" && new socket, set new socket to player2



			// USER PRESSES "READY BUTTON"
				socket.on("startButtonPressed", function (gameBoard) {
					console.log('game started')
					console.log(gameBoard);
					console.log('here is the socket id!!!: ' + socket.id);

					if (!player1.ready) {
						player1.ready = true;
						player1.ships = gameBoard;
					} else if (player1.ready) {
						player2.ready = true;
						player2.ships = gameBoard;
					}

					if (player1.ready && player2.ready) { 
						// START GAME
						socket.emit('otherPlayerStarts');
						socket.broadcast.emit('thisPlayerStarts');

					} else {
					// 	// NOTIFY NOT-READY PLAYER THAT OTHER PLAYER IS READY TO START
						socket.broadcast.emit('waitingOnThisPlayer');
					// 	// NOTIFY READY PLAYER THAT WAITING ON OTHER PLAYER
						socket.emit('waitingOnOtherPlayer');
					}
				});

			// GAMEPLAY LOGIC:

				// 1. USER SELECTS COORDINATES TO ATTACK
					socket.on('gameBoardPressed', function (enemyBoardSpace){
						if (isFirstPlayersTurn && player1.socketID == socket.id || !isFirstPlayersTurn && player2.socketID == socket.id ){
							// player can go
							console.log('space pressed')
							console.log(enemyBoardSpace)
							console.log('here is the socket id!!!: ' + socket.id);
							var player,
								shipWasHit = false,
								won = false;

							if (isFirstPlayersTurn) {
								thisPlayer = player1;
								enemyPlayer = player2;
							} else {
								thisPlayer = player2;
								enemyPlayer = player1;
							}

							for (var ship in enemyPlayer.ships){
								for (var i in ship) {
									if (ship[i] == enemyBoardSpace){
										// player shot was a hit
										shipWasHit = true;
										// remove from array
										
										ship[i] = ship[ship.length-1];
										ship.pop();

										if (!ship.length){
											// player sunk a boat!!
											enemyPlayer.ships[i] = enemyPlayerShips[enemyPlayerShips.length - 1];
											enemyPlayer.ships.pop();

											if (!enemyPlayer.ships.length) {
												won = true;
											}

											if (won) { // no boats left, current player won
												// logic for player wins
											}
										}
									}
								}
							}


							if (shipWasHit){
								// emit back that was hit
								socket.emit('playerShotShip', enemyBoardSpace);
								// broadcast that was hit	
								socket.broadcast('thisPlayersShipWasHit');
							} else {
								// emit back that was miss
								socket.emit('playerShotMissed', enemyBoardSpace);
								// broadcast that was miss	
								socket.broadcast.emit('enemyMissedShot');
							}

							// at end of player's turn set isFirstPlayersTurn properly
							isFirstPlayersTurn = isFirstPlayersTurn? false : true;
						}
					});
					

							// socket.emit sends to user who triggered
							// socket.broadcast.emit sends to other user(s)
							// io.emit sends to both(all)

			// socket.on("swift", function(data) {
			//   	console.log("a vote for swift");
			//   	socket.broadcast.emit("update_swift");
			// });
		});

