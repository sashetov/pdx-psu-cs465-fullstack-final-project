const http = require('http'),
  express = require('express'),
  app = express(),
  socketIo = require('socket.io');
const fs = require('fs');
const server = http.Server(app).listen(8080);
const io = socketIo(server);
const sockets = {}; // this will store all the sockets
let players = {}; // this will store the players objects
let games = []; // this will store the games objects
let comments = []; // this will store the comments objects
// we need to serve static css and js files for react:
app.use(express.static(__dirname + '/../build/'));
app.use(express.static(__dirname + '/../node_modules/'));
// use json for POST
app.use(express.json());
app.get('/', (req, res) => {
  /*
  this route will serve the static index.html file that loads up the react app
  */
  const stream = fs.createReadStream(__dirname + '/../build/index.html');
  stream.pipe(res);
});
app.get('/join', (req, res) => {
  /*
  this route will allow you to join a game
  you will need to provide two parameters in the URL as a GET request:
  socket_id=
  playerName=
  where socket_id is the socket's id
  and playerName is the player's name
  the route will send back a 400 response with an error message if either of
  these params are missing
  on success you will get a responses sent back with 200 status and data
  that looks like these:
  {playerName: 'player1', symbol: 'X', gameId: 0}
  {playerName: 'player2', symbol: '0', gameId: 0}
  */
  let params = Object.keys(req.query);
  if (params.indexOf('playerName') === -1) { // Bad request
    res.status(400).send({
      status: 'error',
      message: 'missing player name parameter'
    });
  }
  if (params.indexOf('socket_id') === -1) { // Bad request
    res.status(400).send({
      status: 'error',
      message: 'missing socket id parameter'
    });
  }
  let socket_id = req.query.socket_id;
  let playerName = req.query.playerName;
  let player = players[socket_id];
  let gameId = player['gameId'];
  if (gameId && games[gameId].winner == null) {
    // rejoin previous unfinished game
    res.json(players[socket_id]);
  } else {
    // create new game since old one is finished or never started
    players[socket_id].playerName = playerName; //set name
    // go through each of the games and try to find an empty slot or start
    // a new game:
    for (let i = 0; i < games.length; i += 1) {
      let game = games[i];
      if (game['player2'] === null) {
        // add second player to started game
        game['player2'] = socket_id;
        game['winner'] = null; // set game to "in play" from "invalid" state
        players[socket_id]['symbol'] = 'O'; // player 2 is always 0
        gameId = i;
        // set gameId so client knows its ok to proceed
        players[socket_id]['gameId'] = gameId;
        let player1_socket = sockets[game['player1']];
        let player2_socket = sockets[game['player2']];
        // since its player 2 that means the game is ready and we need to
        // notify both clients that they have an opponent
        // we want to emit data on both sockets but with slightly different
        // messages, including information on whether its your turn or not
        // and also that the opponent is available
        let data1 = {
          status: 'ok',
          msg: 'you have an opponent',
          data: {
            // first player goes first
            isYourTurn: true,
            opponentName: players[player2_socket.id].playerName
          },
        };
        let data2 = {
          status: 'ok',
          msg: 'you have an opponent',
          data: {
            // second player does not go first
            isYourTurn: false,
            opponentName: players[player1_socket.id].playerName
          },
        };
        player1_socket.emit('opponentAvailable', data1);
        player2_socket.emit('opponentAvailable', data2);
      }
      if (gameId !== null) break;
    }
    if (gameId === null) {
      // initialize new game, for the first player only, since the opponent is
      // not yet available
      // we create a placeholder in each game for a winner id
      // winner id's are as follows:
      //   0 means player 1 won
      //   1 means player 2 won
      //   2 means there is a draw
      //   null means the game is still in play
      //   -1 means error because game doesn't have both players yet
      // we also create a placeholder for who is the next player
      //   0 means player 1
      //   1 means player 2
      //  we always start with player 1
      games.push({
        player1: socket_id,
        player2: null,
        winner: -1, // doesn't have both players yet
        state: ['', '', '', '', '', '', '', '', ''], // board state
        nextPlayer: 0
      });
      gameId = games.length - 1;
      players[socket_id]['symbol'] = 'X'; // player 1 is always X
      // set gameId so client knows its ok to proceed:
      players[socket_id]['gameId'] = gameId;
    }
    res.json(players[socket_id]);
  }
});
// POST to this URL to save comments
// the correct parameters you need as application/json data are:
//  name, email, comments
// if any of those parameters are missing a 400 error will be returned
// the data gets stored in the comments
app.post('/comments', (req, res) => {
  let data = req.body;
  let keys = Object.keys(data);
  if( keys.indexOf("name") === -1 ) {
    res.status(400).send({
      status: 'error',
      message: 'missing name parameter'
    });
  }
  if( keys.indexOf("email") === -1 ) {
    res.status(400).send({
      status: 'error',
      message: 'missing email parameter'
    });
  }
  if( keys.indexOf("comments") === -1 ) {
    res.status(400).send({
      status: 'error',
      message: 'missing email parameter'
    });
  }
  comments.push(data);
  res.json(comments);
});
app.get('/comments', (req, res) => {
  res.json(comments);
});
let checkBoardForWinner = (gameId) => {
  /*
  this function gates a gameId , gets the game, if it exists and then
  checks all the positions in the board state to see if there is a winner,
  a draw or if the game is still in play
  state is an array of strings with length 9
  for example:
  ['', '', '', '', '', '', '', '', '']
  [   ]
  [   ]
  [   ]
  and 
  ['X', '', '', '', 'O', '', '', '', '']
  to
  [X  ]
  [ O ]
  [   ]
  , etc
  Returns status code for winner of a particular gameId game:
    -1 means error because game doesn't have both players yet
    0 means player 1 won
    1 means player 2 won
    2 means game is over and was a draw
    null means game is still in play
  */
  let game = games[gameId];
  let state = game['state'];
  if (game['winner'] !== null) return game['winner']; // its already been won
  else if (game['player1'] === null || game['player2'] === null) return -1;
  let playerMap = {
    X: null,
    O: null,
  };
  let winner = null; // still in play
  if (players[game['player1']].symbol === 'X') {
    playerMap['X'] = 0;
    playerMap['O'] = 1;
  } else if (players[game['player1']].symbol === 'O') {
    playerMap['O'] = 0;
    playerMap['X'] = 1;
  }
  let symbols = ['X', 'O'];
  for (let i = 0; i < symbols.length; i += 1) {
    let s = symbols[i];
    if (
      (state[0] === s && state[1] === s && state[2] === s) || //check rows
      (state[3] === s && state[4] === s && state[5] === s) || //check rows
      (state[6] === s && state[7] === s && state[8] === s) || //check rows
      (state[0] === s && state[3] === s && state[6] === s) || //check columns
      (state[1] === s && state[4] === s && state[7] === s) || //check columns
      (state[2] === s && state[5] === s && state[8] === s) || //check columns
      (state[0] === s && state[4] === s && state[8] === s) || //check diagonals
      (state[2] === s && state[4] === s && state[6] === s) //check diagonals
    ) {
      winner = playerMap[s];
      break;
    }
  }
  if (
    winner === null &&
    state[0] !== '' &&
    state[1] !== '' &&
    state[2] !== '' &&
    state[3] !== '' &&
    state[4] !== '' &&
    state[5] !== '' &&
    state[6] !== '' &&
    state[7] !== '' &&
    state[8] !== ''
  )
    winner = 2; // draw
  return winner;
};
io.sockets.on('connection', (socket) => {
  // here we set up the socket on the server side and the relevant listeners
  // and emits.
  // there are two listeners: chat, move
  // and when the processing of either is done, we emit: chat_done and
  // move_done, respectively
  // there are 6 possible errors:
  const ERR_GAME_NOT_STARTED = 1,
    ERR_BAD_MOVE_ID = 2,
    ERR_NO_OPPONENT_YET_OR_GAME_OVER = 3,
    ERR_SLOT_TAKEN = 4,
    ERR_MOVE_OUT_OF_TURN = 5,
    ERR_CHAT_MSG_NOT_PROVIDED = 6;
  // which we return as status codes to the client, along with an informative
  // error message
  let id = socket.id;
  sockets[socket.id] = socket;
  // instantiate empty player object for this socket:
  players[socket.id] = {
    playerName: null, // not yet known, has to be set by GET to /join
    symbol: null,
    gameId: null,
  };
  socket.on('move', (data) => { // move listener
    data.socket_id = id;
    // handle a couple of error condtions before actually making move
    // errors are only sent back on the current socket
    // success notifications are sent on both sockets for that game
    if (players[id].gameId === null) {
      let data = {
        status: 'error',
        msg: 'player attempting to move without being in a game, join this player to a game with GET to /join',
        errorCode: ERR_GAME_NOT_STARTED,
        data: null,
      };
      socket.emit('move_done', data);
    } else {
      let gameId = players[id].gameId,
        game = games[gameId],
        moveId = parseInt(data.move_id);
      // check that moveId is not invalid (not a num or out of range)
      if (!Number.isInteger(moveId) || moveId < 0 || moveId > 8) {
        let data = {
          status: 'error',
          errorCode: ERR_BAD_MOVE_ID,
          msg: 'you did not provide a valid move id, you need to provide data that looks like {move_id: move_id}, where move_id is an interger that corresponds to an index in the board array',
          data: null,
        };
        socket.emit('move_done', data);
      } else if (!game || game['winner'] === -1) {
        // error: game not fully initiallized yet
        let data = {
          status: 'error',
          msg: 'player attempting to play in a game that is not fully initialized or is over. you either dont have an opponent yet or the game is over',
          errorCode: ERR_NO_OPPONENT_YET_OR_GAME_OVER,
          data: null,
        };
        socket.emit('move_done', data);
      } else if (
        game['state'][moveId] !== undefined &&
        game['state'][moveId] !== ''
      ) {
        // error: slot moved into already
        let data = {
          status: 'error',
          errorCode: ERR_SLOT_TAKEN,
          msg: 'player attempting to move to a slot in the game that already has a symbol in it',
          data: null,
        };
        socket.emit('move_done', data);
      } else {
        let currPlayer = null;
        let otherPlayer = null;
        let winner = null;
        if (game['player1'] === id) {
          currPlayer = 0;
          otherPlayer = 1;
        } else {
          currPlayer = 1;
          otherPlayer = 0;
        }
        if (currPlayer !== game['nextPlayer']) {
          // don't play out of turn...
          let data = {
            status: 'error',
            errorCode: ERR_MOVE_OUT_OF_TURN,
            msg: 'player attempting to play out of turn',
            data: null,
          };
          socket.emit('move_done', data);
        } else {
          // WE GOT TO THE SUCCESS CONDITION - SEND ON BOTH SOCKETS
          game['state'][moveId] = players[id]['symbol']; // do the move
          game['nextPlayer'] = otherPlayer; // switch next player turn
          winner = checkBoardForWinner(gameId);
          let data = {
            status: 'success',
            msg: `player moved to position ${moveId}`,
            data: {
              boardState: game['state'],
              gameWinner: winner,
            },
            played: {
              moved: players[id]['symbol'],
              indexOf: moveId,
            },
          };
          // SEND ON BOTH SOCKETS
          let player1_socket = sockets[game['player1']];
          let player2_socket = sockets[game['player2']];
          player1_socket.emit('move_done', data);
          player2_socket.emit('move_done', data);
          if (winner === 0 || winner === 1 || winner === 2) {
            // game is over, can delete game
            delete games[gameId];
          }
        }
      }
    }
  });
  socket.on('chat', (data) => {
    // chat socket listener
    data.socket_id = id;
    let gameId = players[id].gameId,
      game = games[gameId];
    // again, handle some errors first and send error notification
    // only on current socket,
    // on success send notification on both sockets
    if (players[id].gameId === null) {
      // attempting to chat without having joined a game, send back error
      let data = {
        status: 'error',
        msg: 'player attempting to chat without being in a game, join this player to a game with GET to /join',
        errorCode: ERR_GAME_NOT_STARTED,
        data: null,
      };
      socket.emit('chat_done', data);
    } else if (!game || game['winner'] === -1) {
      // error: game not fully initiallized yet/game over
      let data = {
        status: 'error',
        msg: 'player attempting to play in a game that is not fully initialized or is over. you either dont have an opponent yet or the game is over',
        errorCode: ERR_NO_OPPONENT_YET_OR_GAME_OVER,
        data: null,
      };
      socket.emit('chat_done', data);
    } else if (Object.keys(data).indexOf('message') === -1) {
      // bad parameters sent, no message provided
      let data = {
        status: 'error',
        msg: 'chat message not provided, you need to provide it in the data for the socket under the key "message"',
        errorCode: ERR_CHAT_MSG_NOT_PROVIDED,
        data: null,
      };
      socket.emit('chat_done', data);
    } else {
      // SUCCESS CONDITION REACHED
      let otherPlayerSocket = null;
      let player1_socket = sockets[game['player1']];
      let player2_socket = sockets[game['player2']];
      if (player1_socket.id === id) {
        otherPlayerSocket = player2_socket;
      } else {
        otherPlayerSocket = player1_socket;
      }
      let playerName = players[id].playerName;
      let otherPlayerName = players[otherPlayerSocket.id].playerName;
      // SEND NOTIFICATION TO BOTH SOCKETS
      let dataPlayer = {
        status: 'ok',
        msg: 'sent message successfully to player',
        data: {
          message: data.message,
          from: `${playerName}`,
          to: `${otherPlayerName}`,
        },
      };
      let dataOther = {
        status: 'ok',
        msg: 'you have a message',
        data: {
          message: data.message,
          from: `${playerName}`,
          to: `${otherPlayerName}`,
        },
      };
      socket.emit('chat_done', dataPlayer);
      otherPlayerSocket.emit('chat_done', dataOther);
    }
  });
  socket.on('disconnect', () => {
    // disconnect handler
    // deletes the socket and player of current player
    // TODO: wipe associated game as well
    delete sockets[socket.id];
    delete players[socket.id];
    socket.emit('client_disconnect', id);
  });
});
let closeServer = () => {
  // this function is used by mocha to stop the server during testing
  server.close();
  io.close();
};
module.exports = {server,closeServer} // exports for mocha mostly
