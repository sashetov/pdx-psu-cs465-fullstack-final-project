import React, { useEffect, useRef, useState } from 'react';
import Chat from './Chat';

// Renders the Tic-Tac-Toe board that interacts with a user
const Board = ({
  socket,
  first_player,
  second_player,
  newGame,
  gameFinished,
  board_update,
}) => {
  // Hooks
  const [boardState, setBoard] = useState(board_update.current); // holds the board state
  const [message, setMessage] = useState(''); // used for user message display
  const [update, setUpdate] = useState(0); // used to re-render the page
  const reference = useRef(null);
  const markSquare = useRef(false); // variable to hold whether move was allowed/disallowed
  const errorCode = useRef(-1); // variable to hold error code from the backend
  const winner = useRef(-2); // variable to hold who won from the backend
  const win = useRef(-2); // var to hold whether someone won or not
  newGame.current = false; // Already in a game

  // useEffect works after render
  useEffect(() => {
    win.current = -2; // -2 means no one has won or tied
    // Shows to console our current socket
    window.socket = socket;
    // Captures status message and errorCode from server
    socket.on('move_done', (data) => {
      let state = [...boardState];

      setUpdate(update + 1);

      // Displays on console the server emitted data
      console.log('From Server' + JSON.stringify(data));

      // Receives status and errorCode from the server for use on client side
      if (data.status === 'error') {
        errorCode.current = data.errorCode;
        markSquare.current = false;
      } else if (data.status === 'success') {
        errorCode.current = 7; //success
        markSquare.current = true;
        win.current = data.data.gameWinner;
        state = [...data.data.boardState];
      } else {
        console.log('unknown error occured w/ client side move_done'); //error not matching error codes have occurred
        errorCode.current = -1; //resets value to default
        markSquare.current = false; //resets value to default
      }

      mark(state, win);
    });
  }, [socket, boardState]);

  // Functions
  // Communicates to the backend server which square was clicked. Server determines validity of the move.
  const move = (index) => {
    setMessage(''); // Resets user message to nothing

    // Re-render the board
    setUpdate(update + 1);

    // Sends server index of the square clicked
    socket.emit('move', { move_id: index });
  };

  // Marks the square if appropriate and updates boardState
  const mark = (state, win) => {
    // Marking the square allowed
    if (markSquare.current === true) {
      console.log('The move is valid');

      setUpdate(update + 1);
    }
    // Marking square not allowed
    else {
      console.log('The move is invalid');
      setUpdate(update + 1);
    }

    // Updates the board on client side and displays in console
    setBoard([...state]);
    board_update.current = [...state];
    console.log('Updated board:');
    console.log(state);

    // Determines user message to display
    message_picker();

    // Checks to see if a player won and gives appropriate console message
    if (win.current !== -2 && win.current !== null) {
      // Server determined a player is missing
      if (win.current === -1) {
        winner.current = -1;
        console.log(
          'Error: One of the players is missing. Please join the game.'
        );
      } else if (win.current === 0) {
        winner.current = 0;
        console.log(`${first_player.current} won!`);
      } else if (win.current === 1) {
        winner.current = 1;
        console.log(`${second_player.current} won!`);
      } else if (win.current === 2) {
        winner.current = 2;
        console.log('Tied. Gameover');
      }

      setUpdate(update + 1);

      // Determine appropriate user message to display
      winner_determined();
    }

    errorCode.current = -1; // reset errorCode
    markSquare.current = false; // reset markSquare
  };

  // Determines appropriate user messages after a move
  const message_picker = () => {
    console.log('in message');
    if (errorCode.current === 1) {
      setMessage(`You are not in a game. Please join by refreshing the page.`);
    } else if (errorCode.current === 2) {
      setMessage(`Invalid move id`);
    } else if (errorCode.current === 3) {
      setMessage(`You do not have an opponent. Please wait.`);
    } else if (errorCode.current === 4) {
      setMessage(`That square is taken! Please try another square.`);
    } else if (errorCode.current === 5) {
      setMessage(`You can't play out of turn! Wait for your opponent to play.`);
    } else if (errorCode.current === 7) {
      setMessage(`Move was a success`);
    } else if (errorCode.current === -1) {
      setMessage(`Default error...hmm..something must be wrong`);
    } else {
      setMessage(``);
    }
    setUpdate(update + 1);
  };

  // Determines appropriate user messages after the game is over
  const winner_determined = () => {
    if (winner.current === -1) {
      setMessage('Error: One of the players is missing. Please join the game.');
    } else if (winner.current === 0) {
      setMessage(`${first_player.current} won!`);
    } else if (winner.current === 1) {
      setMessage(`${second_player.current} won!`);
    } else if (winner.current === 2) {
      setMessage('Tied. Gameover');
    } else {
      setMessage(``);
    }
    gameFinished.current = true;
    board_update.current = ['', '', '', '', '', '', '', '', ''];
    setUpdate(update + 1);
  };

  // renders the board
  return (
    <div ref={reference} className="container-sm w-50">
      <div className="row" aria-label="row-0">
        <div
          className="col cell text-center"
          id="0"
          onClick={(event) => {
            // Allow clicking unless the game is over
            if (winner.current === -2) {
              move(event.target.id);
            }
          }}
          aria-label="cell 0"
        >
          {boardState[0]}
        </div>
        <div
          className="col cell text-center"
          id="1"
          onClick={(event) => {
            // Allow clicking unless the game is over
            if (winner.current === -2) {
              move(event.target.id);
            }
          }}
          aria-label="cell 1"
        >
          {boardState[1]}
        </div>
        <div
          className="col cell text-center"
          id="2"
          onClick={(event) => {
            // Allow clicking unless the game is over
            if (winner.current === -2) {
              move(event.target.id);
            }
          }}
          aria-label="cell 2"
        >
          {boardState[2]}
        </div>
      </div>
      <div className="row text-center" aria-label="row-1">
        <div
          className="col cell text-center"
          id="3"
          onClick={(event) => {
            // Allow clicking unless the game is over
            if (winner.current === -2) {
              move(event.target.id);
            }
          }}
          aria-label="cell 3"
        >
          {boardState[3]}
        </div>
        <div
          className="col cell text-center"
          id="4"
          onClick={(event) => {
            // Allow clicking unless the game is over
            if (winner.current === -2) {
              move(event.target.id);
            }
          }}
          aria-label="cell 4"
        >
          {boardState[4]}
        </div>
        <div
          className="col cell text-center"
          id="5"
          onClick={(event) => {
            // Allow clicking unless the game is over
            if (winner.current === -2) {
              move(event.target.id);
            }
          }}
          aria-label="cell 5"
        >
          {boardState[5]}
        </div>
      </div>
      <div className="row" aria-label="row-2">
        <div
          className="col cell text-center"
          id="6"
          onClick={(event) => {
            // Allow clicking unless the game is over
            if (winner.current === -2) {
              move(event.target.id);
            }
          }}
          aria-label="cell 6"
        >
          {boardState[6]}
        </div>
        <div
          className="col cell text-center"
          id="7"
          onClick={(event) => {
            // Allow clicking unless the game is over
            if (winner.current === -2) {
              move(event.target.id);
            }
          }}
          aria-label="cell 7"
        >
          {boardState[7]}
        </div>
        <div
          className="col cell text-center"
          id="8"
          onClick={(event) => {
            // Allow clicking unless the game is over
            if (winner.current === -2) {
              move(event.target.id);
            }
          }}
          aria-label="cell 8"
        >
          {boardState[8]}
        </div>
      </div>
      <div className="row" style={{ margin: '20px' }}></div>
      <div className="row">
        <div
          className="col message text-center"
          id="user_message"
          aria-label="message board"
        >
          {message}
        </div>
      </div>
      {gameFinished.current === false ? <Chat socket={socket} /> : <></>}
    </div>
  );
};

export default Board;
