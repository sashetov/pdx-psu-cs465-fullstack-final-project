import React, { useEffect, useRef, useState } from 'react';

const Board = ({ socket }) => {
  //Hooks
  const [turn, setTurn] = useState(0);
  const [boardState, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [block, setBlock] = useState(true);

  useEffect(() => {
    const exampleHandler = (data) => {
      console.log(data);
    };

    console.log('socket:', socket);
    window.socket = socket;

    socket.on('client_disconnect', exampleHandler);
    //socket emits status, msg, data
    //status: error or success
    socket.on('move_done', allow_move);
    socket.on('opponentAvailable', two_player); //status ok
    return () => {
      socket.off('move_done', exampleHandler);
      socket.off('client_disconnect', exampleHandler);
    };
  }, [socket]);

  //Variables and constants
  const reference = useRef(null);

  //Functions
  const allow_move = (data) => {
    console.log(data);
    if (data.status === 'error') {
      setBlock(true);
      console.log(data.msg);
    } else if (data.status === 'success') {
      setBlock(false);
      console.log(data.msg);
    } else {
      console.log('unknown error occured w/ allow_move');
      console.log(data.status);
      console.log(data.msg);
    }
  };

  const two_player = (data) => {
    if (data.status === 'ok') {
      console.log('another player has joined');
      setBlock(false);
    }
  };

  const move = (event, index) => {
    const newBoard = [...boardState];
    const curr = turn === 0 ? 'X' : 'O';
    if (newBoard[index] === '') {
      newBoard[index] = curr;
      event.target.innerHTML = curr;
    }
    setBoard(newBoard);
    console.log(newBoard);
    socket.emit('move', { boardState: newBoard });
    setTurn(turn === 0 ? 1 : 0);
  };

  return (
    <div ref={reference} className="container-sm w-50">
      <div className="row">
        <div
          className="col cell text-center"
          id="0"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '' && block === false) {
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
            if (boardState[event.target.id] === '' && block === false) {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 1"
        ></div>
        <div
          className="col cell text-center"
          id="2"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '' && block === false) {
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
            if (boardState[event.target.id] === '' && block === false) {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 3"
        ></div>
        <div
          className="col cell text-center"
          id="4"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '' && block === false) {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 4"
        ></div>
        <div
          className="col cell text-center"
          id="5"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '' && block === false) {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 5"
        ></div>
      </div>
      <div className="row">
        <div
          className="col cell text-center"
          id="6"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '' && block === false) {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 6"
        ></div>
        <div
          className="col cell text-center"
          id="7"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '' && block === false) {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 7"
        ></div>
        <div
          className="col cell text-center"
          id="8"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '' && block === false) {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 8"
        ></div>
      </div>
    </div>
  );
};

export default Board;
