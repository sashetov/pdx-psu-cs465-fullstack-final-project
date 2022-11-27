import React, { useEffect, useRef, useState } from 'react';

const Board = ({ socket, first_player, second_player, newGame }) => {
  // Hooks
  const [boardState, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [update, setUpdate] = useState(0);

  // Variables and constants
  const reference = useRef(null);
  const markSquare = useRef(false);
  const errorCode = useRef(-1);
  const winner = useRef(-2);
  const button = useRef();

  // useEffect works after render
  useEffect(() => {
    console.log('socket:', socket);
    window.socket = socket;
  }, [socket]);

  // Functions
  newGame.current = false;

  // Sends the server which square was clicked. Server determines validity.
  const move = (index) => {
    // Sends server location player wants to mark
    let win = -2;
    setUpdate(update + 1);
    setMessage('');

    socket.emit('move', { move_id: index });

    // Captures status message and errorCode from server
    socket.on('move_done', (data) => {
      setUpdate(update + 1);
      console.log('From Server' + JSON.stringify(data));

      let state = [...boardState];

      // Receives status and errorCode from the server for use on client side
      if (data.status === 'error') {
        errorCode.current = data.errorCode;
        markSquare.current = false;
      } else if (data.status === 'success') {
        errorCode.current = 7; //success
        markSquare.current = true;
        win = data.data.gameWinner;
        state = [...data.data.boardState];
      } else {
        console.log('unknown error occured w/ client side move_done');
        errorCode.current = -1;
        markSquare.current = false;
      }
      mark(state, win);
    });
  };

  // Marks the square if appropriate and updates boardState
  const mark = (state, win) => {
    // Marking square allowed
    if (markSquare.current === true) {
      //re-render
      console.log('The move is valid');
      setUpdate(update + 1);
    }
    // Marking square not allowed
    else {
      console.log('The move is invalid');
      setUpdate(update + 1);
    }

    // Updates the board
    setBoard([...state]);
    console.log('Updated board:');
    console.log(state);

    // Determine user message to display
    message_picker();

    // Checks to see if a player won
    if (win !== -2 && win !== null) {
      if (win === -1) {
        winner.current = -1;
        console.log(
          'Error: One of the players is missing. Please join the game.'
        );
      } else if (win === 0) {
        winner.current = 0;
        console.log(`${first_player.current} won!`); // TODO: get player names to display
      } else if (win === 1) {
        winner.current = 1;
        console.log(`${second_player.current} won!`); // TODO: get player names to display
      } else if (win === 2) {
        winner.current = 2;
        console.log('Tied. Gameover');
      }

      winner_determined();
      // TODO: ASk to replay or go back to previous screen
    }

    errorCode.current = -1; // reset errorCode
    markSquare.current = false; // reset markSquare
  };

  // User messages after a move
  const message_picker = () => {
    console.log('in message');
    if (errorCode.current === 1) {
      setMessage(`You are not in a game. Please join.`);
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
  };

  // Updates user message if a game is over
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
  };

  // Handles Reset Button Click
  const handleReset = (event) => {
    event.preventDefault();

    // Reset all variables and states managed on front-end
    const empty_board = ['', '', '', '', '', '', '', '', ''];
    const restart = 'Please reset the game with same players and same game id';
    reference.curret = null;
    markSquare.current = false;
    errorCode.current = -1;
    winner.current = -2;
    newGame.current = true;

    setBoard([...empty_board]);
    setMessage(``);
    setUpdate(0);

    console.log('everything reset');
    console.log(
      `message: ${message} board: ${boardState} reference: ${reference.current} markSquare: ${markSquare.current} errorCode: ${errorCode.current} winner: ${winner.current}`
    );

    // Ask back-end to restart the game
    socket.emit('restart', restart);
  };

  // Buttons
  const reset_button = (
    <button
      className="col reset-button"
      id="reset_game"
      type="button"
      onClick={handleReset}
    >
      Reset Game
    </button>
  );

  const replay_button = (
    <button
      className="col reset-button"
      id="play_again"
      type="button"
      onClick={handleReset}
    >
      Play Again
    </button>
  );

  if (winner.current === 0 || winner.current === 1 || winner.current === 2) {
    button.current = replay_button;
  } else {
    button.current = reset_button;
  }

  // renders the board
  return (
    <div ref={reference} className="container-sm w-50">
      <div className="row">
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
      <div className="row text-center">
        <div
          className="col cell text-center"
          id="3"
          onClick={(event) => {
            // Allow clicking unless the game is over
            if (winner.current === -2) {
              move(event.target.id);
            }
          }}
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
        >
          {boardState[5]}
        </div>
      </div>
      <div className="row">
        <div
          className="col cell text-center"
          id="6"
          onClick={(event) => {
            // Allow clicking unless the game is over
            if (winner.current === -2) {
              move(event.target.id);
            }
          }}
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
      <div className="row">{button.current}</div>
    </div>
  );
};

export default Board;
