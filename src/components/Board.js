import React, { useEffect, useRef, useState } from 'react';

const Board = ({ socket }) => {
  //Hooks
  //const [turn, setTurn] = useState(0);
  const [boardState, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const index = useRef(-1);
  const tracker = useRef(false);
  const turn = useRef(0);
  //useEffect does after render
  useEffect(() => {
    const exampleHandler = (data) => {
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

  //Variables and constants
  const reference = useRef(null);

  //Functions

  // Sends the server which square was clicked. Server determines validity.
  const move = (event, index) => {
    socket.emit('move', { move_id: index });
  };
  // Handles status and errorCode from server and marks the correct square
  socket.on('move_done', (data) => {
    const newBoard = [...boardState];
    const curr = turn.current === 0 ? 'X' : 'O';
    console.log('From Server' + JSON.stringify(data));

    // TODO: you need to handle errors here....
    if (data.status === 'error') {
      console.log('client error:' + data.msg);
      tracker.current = false;
    } else if (data.status === 'success') {
      newBoard[index.current] = curr;

      tracker.current = true;
      setBoard(newBoard);
      //setTurn(turn === 0 ? 1 : 0);

      console.log('move was successful');
      console.log(newBoard);
    } else {
      tracker.current = false;
      console.log('unknown error occured w/ client side move_done');
      console.log('client error:' + data.msg);
    }
  });

  return (
    <div ref={reference} className="container-sm w-50">
      <div className="row">
        <div
          className="col cell text-center"
          id="0"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              const curr = turn === 0 ? 'X' : 'O';
              index.current = event.target.id;
              move(event, event.target.id);
              if (tracker.current === true) {
                event.target.innerHTML = curr;
                turn.current = turn.current === 0 ? 1 : 0;
              }
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
              const curr = turn === 0 ? 'X' : 'O';
              index.current = event.target.id;
              move(event, event.target.id);
              if (tracker.current === true) {
                event.target.innerHTML = curr;
                turn.current = turn.current === 0 ? 1 : 0;
              }
            }
          }}
        ></div>
        <div
          className="col cell text-center"
          id="2"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              const curr = turn.current === 0 ? 'X' : 'O';
              index.current = event.target.id;
              move(event, event.target.id);
              if (tracker.current === true) {
                event.target.innerHTML = curr;
                turn.current = turn.current === 0 ? 1 : 0;
              }
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
              const curr = turn === 0 ? 'X' : 'O';
              index.current = event.target.id;
              move(event, event.target.id);
              if (tracker.current === true) {
                event.target.innerHTML = curr;
                turn.current = turn.current === 0 ? 1 : 0;
              }
            }
          }}
        ></div>
        <div
          className="col cell text-center"
          id="4"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              const curr = turn === 0 ? 'X' : 'O';
              index.current = event.target.id;
              move(event, event.target.id);
              if (tracker.current === true) {
                event.target.innerHTML = curr;
                turn.current = turn.current === 0 ? 1 : 0;
              }
            }
          }}
        ></div>
        <div
          className="col cell text-center"
          id="5"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              const curr = turn === 0 ? 'X' : 'O';
              index.current = event.target.id;
              move(event, event.target.id);
              if (tracker.current === true) {
                event.target.innerHTML = curr;
                turn.current = turn.current === 0 ? 1 : 0;
              }
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
              const curr = turn === 0 ? 'X' : 'O';
              index.current = event.target.id;
              move(event, event.target.id);
              if (tracker.current === true) {
                event.target.innerHTML = curr;
                turn.current = turn.current === 0 ? 1 : 0;
              }
            }
          }}
        ></div>
        <div
          className="col cell text-center"
          id="7"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              const curr = turn === 0 ? 'X' : 'O';
              index.current = event.target.id;
              move(event, event.target.id);
              if (tracker.current === true) {
                event.target.innerHTML = curr;
                turn.current = turn.current === 0 ? 1 : 0;
              }
            }
          }}
        ></div>
        <div
          className="col cell text-center"
          id="8"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              const curr = turn === 0 ? 'X' : 'O';
              index.current = event.target.id;
              move(event, event.target.id);
              if (tracker.current === true) {
                event.target.innerHTML = curr;
                turn.current = turn.current === 0 ? 1 : 0;
              }
            }
          }}
        ></div>
      </div>
    </div>
  );
};

export default Board;
