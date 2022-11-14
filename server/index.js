const http = require('http'),
  express = require('express'),
  app = express(),
  socketIo = require('socket.io');
const fs = require('fs');

const server = http.Server(app).listen(8080);
const io = socketIo(server);
const sockets = {};
let players = {};
let games = [];

app.use(express.static(__dirname + '/../build/'));
app.use(express.static(__dirname + '/../node_modules/'));

app.get('/', (req, res) => {
  const stream = fs.createReadStream(__dirname + '/../build/index.html');
  stream.pipe(res);
});

app.get('/join', (req, res) => {
  let params = Object.keys(req.query);
  if (params.indexOf('playerName') === -1) {
    res
      .status(400)
      .send({ status: 'error', message: 'missing player name parameter' }); // Bad request
  }
  if (params.indexOf('socket_id') === -1) {
    res
      .status(400)
      .send({ status: 'error', message: 'missing socket id parameter' }); // Bad request
  }
  let socket_id = req.query.socket_id;
  let playerName = req.query.playerName;
  console.log('players:', players);
  console.log('socket_id:', socket_id);
  let player = players[socket_id];
  console.log('player:', player);
  let gameId = player['gameId'];
  if (gameId && games[gameId].winner == null) {
    console.log(`rejoined game ${gameId}`);
    res.json(players[socket_id]); //rejoin previous unfinished game
  } else {
    // create new game since old one is finished or never started
    players[socket_id].playerName = playerName; //set name
    for (let i = 0; i < games.length; i += 1) {
      let game = games[i];
      if (game['player2'] === null) {
        // add second player to started game
        game['player2'] = socket_id;
        game['winner'] = null; // set game to "in play" from "invalid" state
        players[socket_id]['symbol'] = 'O'; // player 2 is always 0
        gameId = i;
        players[socket_id]['gameId'] = gameId; // set gameId so client knows its ok to proceed
        console.log('found game and joined');
      }
      if (gameId !== null) break;
    }
    if (gameId === null) {
      // initialize new game
      games.push({
        player1: socket_id,
        player2: null,
        winner: -1, // 0 means player1, 1 means player 2, 2 means draw, null means still in play, -1 means error because game doesn't have both players yet
        state: ['', '', '', '', '', '', '', '', ''], // board state
        nextPlayer: 0, // 0 means player 1, 1 means player 2 - we always start with player 1
      });
      gameId = games.length - 1;
      players[socket_id]['symbol'] = 'X'; // player 1 is always X
      players[socket_id]['gameId'] = gameId; // set gameId so client knows its ok to proceed
      console.log('started new game');
    }
    console.log('games: ', games);
    console.log('players: ', players);
    res.json(players[socket_id]);
  }
});

let checkBoardForWinner = (gameId) => {
  /*
  state looks like
  ['', '', '', '', '', '', '', '', '']
  for
  [   ]
  [   ]
  [   ]

  ['X', '', '', '', '', '', '', '', '']
  for
  [X  ]
  [   ]
  [   ]

  ['X', '', '', '', 'O', '', '', '', '']
  for
  [X  ]
  [ O ]
  [   ]
  etc
  
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
  console.log(game);
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
      (state[2] === s && state[3] === s && state[6] === s) || //check columns
      (state[0] === s && state[4] === s && state[8] === s) || //check diagonals
      (state[2] === s && state[4] === s && state[6] === s) //check diagonals
    ) {
      console.log('got a winner!', s, playerMap[s]);
      winner = playerMap[s];
      break;
    }
  }

  if (
    winner === null &&
    state[0] === '' &&
    state[1] === '' &&
    state[2] === '' &&
    state[3] === '' &&
    state[4] === '' &&
    state[5] === '' &&
    state[6] === '' &&
    state[7] === '' &&
    state[8] === ''
  )
    winner = 2; // draw

  return winner;
};

io.sockets.on('connection', (socket) => {
  let id = socket.id;

  sockets[socket.id] = socket;
  players[socket.id] = {
    playerName: null, // not yet known, has to be set by GET to /join
    symbol: null,
    gameId: null,
  };

  socket.on("isOpponentAvailable", (data)=>{
    let gameId = players[id].gameId, game = games[gameId];
    let yourTurn = null;
    if(game.nextPlayer === 0 && game['player1'] === id){
      yourTurn = true;
    }
    else if(game.nextPlayer === 1 && game['player2'] === id){ // will happen if you emmitted before the first move....
      yourTurn = true
    }
    else{
      yourTurn = false;
    }
    if(game.player1 !== null && game.player2 !==null){
      socket.emit('opponentAvailable', {
        status: 'ok',
        msg: 'you have an opponent',
        data: {
          isYourTurn: yourTurn
        },
      });
    }
  });

  socket.on('move', (data) => {
    console.log('id:', id);
    console.log('data:', data);
    data.socket_id = id;
    if (players[id].gameId === null) {
      // houston we have a problem
      socket.emit('move_done', {
        status: 'error',
        msg: 'player attempting to move without being in a game, join this player to a game with GET to /join',
        data: null,
      });
    } else {
      let gameId = players[id].gameId,
        game = games[gameId],
        moveId = parseInt(data.move_id);
      if (game['winner'] === -1) {
        // error: game not fully initiallized yet
        socket.emit('move_done', {
          status: 'error',
          msg: 'player attempting to play in a game that is not fully initialized yet',
          data: null,
        });
      } else if (game['state'][moveId] !== '') {
        // error: slot moved into already
        socket.emit('move_done', {
          status: 'error',
          msg: 'player attempting to move to a slot in the game that already has a symbol in it',
          data: null,
        });
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
          socket.emit('move_done', {
            status: 'error',
            msg: 'player attempting to play out of turn',
            data: null,
          });
        } else {
          game['state'][moveId] = players[id]['symbol']; // do the move
          game['nextPlayer'] = otherPlayer; // switch next player turn
          winner = checkBoardForWinner(gameId);
          socket.emit('move_done', {
            status: 'success',
            msg: `player moved to position ${moveId}`,
            data: {
              boardState: game['state'],
              gameWinner: winner,
            },
          });
          if (winner === 0 || winner === 1 || winner === 2) {
            // game is over, can delete game
            delete games[gameId];
          }
        }
      }
    }
  });

  socket.on('disconnect', () => {
    delete sockets[socket.id];
    delete players[socket.id];
    socket.emit('client_disconnect', id);
  });
});
