import React, { useEffect, useRef, useState } from 'react';

const Board = ({ socket }) => {
  //Hooks
  const [turn, setTurn] = useState(0);
  const [boardState, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  let block = useRef(true);

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
  const allow_move = (data) => {
    if (data.status === 'error') {
      block.current = true;
      console.log('client error:' + data.msg);
    } else if (data.status === 'success') {
      console.log('move was successful');
      block.current = false;
      //console.log(data.msg);
    } else {
      console.log('unknown error occured w/ allow_move');
      block.current = true;
      //console.log(data.status);
      console.log(data.msg);
    }
    console.log(`current value of block: ` + block.current);
  };

  const two_player = (data) => {
    if (data.status === 'ok') {
      console.log('another player has joined');
      block.current = false;
    } else {
      console.log('You are alone :( ');
      block.current = true;
    }
  };

  const move = (event, index) => {
    socket.emit('move', { move_id: index });
  };

  socket.on('move_done', (data) => {
    console.log('From Server' + JSON.stringify(data));
    // TODO: you need to handle errors here....
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
