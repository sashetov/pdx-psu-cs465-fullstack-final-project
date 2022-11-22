import React, { useEffect, useRef, useState } from 'react';

const Board = ({ socket }) => {
  // Hooks
  const [boardState, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [update, setUpdate] = useState(0);

  // Variables and constants
  const reference = useRef(null);
  const markSquare = useRef(false);
  const errorCode = useRef(-1);
  const winner = useRef(-2);

  // useEffect works after render
  useEffect(() => {
    console.log('in useEffect');

    console.log('socket:', socket);
    window.socket = socket;
  }, [socket]);

  // Functions

  // Sends the server which square was clicked. Server determines validity.
  const move = (index) => {
    // Sends server location player wants to mark
    let win = -2;
    setMessage('');
    console.log(`In move():`);
    console.log('socket:');
    console.log(socket);

    socket.emit('move', { move_id: index });

    // Captures status message and errorCode from server
    socket.on('move_done', (data) => {
      console.log('In move_done');
      console.log('From Server' + JSON.stringify(data));

      let state = [...boardState];

      // Receives status and errorCode from the server for use on client side
      if (data.status === 'error') {
        console.log('client received from server an error:' + data.msg);
        errorCode.current = data.errorCode;
        markSquare.current = false;
      } else if (data.status === 'success') {
        console.log('move is allowed');
        errorCode.current = 7; //success
        markSquare.current = true;
        win = data.data.gameWinner;
        console.log(`new board state: `);
        state = [...data.data.boardState];
        console.log(state);
      } else {
        console.log('unknown error occured w/ client side move_done');
        console.log('client received from server an error:' + data.msg);
        errorCode.current = -1;
        markSquare.current = false;
      }

      console.log(`Exiting move_done and calling mark`);

      mark(state, win);
    });
  };

  // Marks the square if appropriate and updates boardState
  const mark = (state, win) => {
    console.log(`In mark():`);
    console.log(`client side errorCode set to ${errorCode.current}`);
    console.log(`markSquare set to ${markSquare.current}`);

    // Marking square allowed
    if (markSquare.current === true) {
      //re-render
      setUpdate(update + 1);
    }
    // Marking square not allowed
    else {
      console.log('The move was disallowed. No state changes');
    }
    setBoard(newBoard);
    console.log(newBoard); 
    socket.emit('move', { move_id: index });
    setTurn(turn === 0 ? 1 : 0);
  }


    // Updates the board
    setBoard([...state]);
    console.log('Updated board:');
    console.log(state);

    console.log(`Exiting mark and calling message_picker`);

    message_picker();

    console.log('back in mark');

    // Checks to see if a player won
    // TODO: Currently not working because it can't read null can we set it to -2 for null?
    if (win !== -2) {
      console.log('game winner has a value: ' + win);
      if (win === -1) {
        winner.current = -1;
        console.log(
          'Error: One of the players is missing. Please join the game.'
        );
      } else if (win === 0) {
        winner.current = 0;
        console.log('First Player won!'); // TODO: get player names to display
      } else if (win === 1) {
        winner.current = 1;
        console.log('Second Player won!'); // TODO: get player names to display
      } else if (win === 2) {
        winner.current = 2;
        console.log('Tied. Gameover');
      }

      console.log('exiting mark and calling winner_determined');

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
      console.log(`errorCode is : ${errorCode.current}`);
      setMessage(`You are not in a game. Please join.`);
    } else if (errorCode.current === 2) {
      console.log(`errorCode is : ${errorCode.current}`);
      setMessage(`Invalid move id`);
    } else if (errorCode.current === 3) {
      console.log(`errorCode is : ${errorCode.current}`);
      setMessage(`You do not have an opponent. Please wait.`);
    } else if (errorCode.current === 4) {
      console.log(`errorCode is : ${errorCode.current}`);
      setMessage(`That square is taken! Please try another square.`);
    } else if (errorCode.current === 5) {
      console.log(`errorCode is : ${errorCode.current}`);
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
    console.log('in winner determined');

    if (winner.current === -1) {
      setMessage('Error: One of the players is missing. Please join the game.');
    } else if (winner.current === 0) {
      setMessage('First Player won!'); // TODO: get player names to display
    } else if (winner.current === 1) {
      setMessage('Second Player won!'); // TODO: get player names to display
    } else if (winner.current === 2) {
      setMessage('Tied. Gameover');
    } else {
      //setMessage(``);
    }
  };

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
    </div>
  );
};

export default Board;
