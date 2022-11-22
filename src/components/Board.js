import React, { useEffect, useRef, useState } from 'react';

const Board = ({ socket }) => {
  //Hooks
  const [turn, setTurn] = useState(0);
  const [boardState, setBoard] = useState(['', '', '', '', '', '', '', '', '']);

  useEffect(() => {
    const exampleHandler = (data) => {
      console.log(data);
    };
    console.log("socket:", socket);
    window.socket = socket;
    socket.on('move_done', exampleHandler);
    socket.on('client_disconnect', exampleHandler);

    return () => {
      socket.off('move_done', exampleHandler);
      socket.off('client_disconnect', exampleHandler);
    };
  }, [socket]);

  //Variables and constants
  const reference = useRef(null);

  //Functions

  const move = (event, index) => {
    socket.emit('move', { move_id: index});
  }

  socket.on('move_done', (data) => {
    console.log("From Server" + JSON.stringify(data));
    if(data.status === 'success'){
      setBoard(data.boardState);
    }
    // TODO: you need to handle errors here....
  })
 
  
  return (
    <div ref={reference} className="container-sm w-50">
      <div className="row">
        <div className="col cell text-center" 
            id="0" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
            aria-label="cell 0">     
        </div>
        <div className="col cell text-center" 
            id="1" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 1">    
        </div>
        <div className="col cell text-center" 
            id="2" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
            aria-label="cell 2">   
        </div>
      </div>
      <div className="row text-center">
      <div className="col cell text-center" 
            id="3" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 3">     
        </div>
        <div className="col cell text-center" 
            id="4" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 4">     
        </div>
        <div className="col cell text-center" 
            id="5" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 5">     
        </div>
      </div>
      <div className="row">
      <div className="col cell text-center" 
            id="6" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 6">     
        </div>
        <div className="col cell text-center" 
            id="7" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 7">     
        </div>
        <div className="col cell text-center" 
            id="8" 
            onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === '') {
              move(event, event.target.id);
            }
          }}
          aria-label="cell 8">     
        </div>
      </div>
    </div>
  );
};

export default Board;

