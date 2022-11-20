import React, { useEffect, useRef, useState } from 'react';

const Board = ({ socket }) => {
  // Hooks
  //const [turn, setTurn] = useState(0);
  const [boardState, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const markSquare = useRef(false);
  const errorCode = useRef(-1);

  // useEffect does after render
  useEffect(() => {
    const exampleHandler = (data) => {
      console.log(`Example Handler: `);
      console.log(data);
    };

    console.log('socket:', socket);
    window.socket = socket;

    socket.on('client_disconnect', exampleHandler);
    //socket emits status, msg, data
    //status: error or success

    return () => {
      socket.off('move_done', exampleHandler);
      socket.off('client_disconnect', exampleHandler);
    };
  }, [socket]);

  // Variables and constants
  const reference = useRef(null);

  // Functions

  // Sends the server which square was clicked. Server determines validity.
  const move = (event, index) => {
    // Sends server location player wants to mark

    console.log(`In move():`);
    console.log('socket:');
    console.log(socket);
    socket.emit('move', { move_id: index });

    // Captures status message and errorCode from server
    socket.on('move_done', (data) => {
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
      mark(event, index, state);
    });
  };

  // Marks the square if appropriate and updates boardState
  const mark = (event, index, newBoard) => {
    console.log(`In mark():`);
    console.log(event);

    console.log(`client side errorCode set to ${errorCode.current}`);
    console.log(`markSquare set to ${markSquare.current}`);
    console.log(newBoard);
    // Marking square allowed
    if (markSquare.current === true) {
      event.target.innerHTML = newBoard[index];
      console.log('Updated board:');
      console.log(newBoard);
    } else {
      console.log('The move was disallowed. No state changes');
    }
    setBoard(newBoard);
  };

  // renders the board
  return (
    <div ref={reference} className="container-sm w-50">
      <div className="row">
        <div
          className="col cell text-center"
          id="0"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 0"
        ></div>
        <div
          className="col cell text-center"
          id="1"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
        ></div>
        <div
          className="col cell text-center"
          id="2"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 2"
        ></div>
      </div>
      <div className="row text-center">
        <div
          className="col cell text-center"
          id="3"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
        ></div>
        <div
          className="col cell text-center"
          id="4"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
        ></div>
        <div
          className="col cell text-center"
          id="5"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
        ></div>
      </div>
      <div className="row">
        <div
          className="col cell text-center"
          id="6"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
        ></div>
        <div
          className="col cell text-center"
          id="7"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
        ></div>
        <div
          className="col cell text-center"
          id="8"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
        ></div>
      </div>
    </div>
  );
};

export default Board;
