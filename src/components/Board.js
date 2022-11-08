import React, { useEffect, useRef, useState } from 'react';
import React, { useEffect, useRef, useState } from 'react';

const Board = ({ socket }) =>  {
  //Hooks
  const [turn, setTurn] = useState(0);
  const [boardState, setBoard] = useState(['', '', '', '', '', '', '', '', '']);

  useEffect(() => {
    const exampleHandler = (data) => {
      console.log(data);
    };

    socket.on('move_done', exampleHandler);
    socket.on('client_disconnect', exampleHandler);

    return () => {
      socket.off('move_done', exampleHandler);
      socket.off('client_disconnect', exampleHandler);
    };
  }, [socket]);



  useEffect(() => {
    const exampleHandler = (data) => {
      console.log(data);
    };

    socket.on('move_done', exampleHandler);
    socket.on('client_disconnect', exampleHandler);

    return () => {
      socket.off('move_done', exampleHandler);
      socket.off('client_disconnect', exampleHandler);
    };
  }, [socket]);

  //Variables and constants
  //let mark = '';
  let winner = '';
  const reference = useRef(null);

  //Functions
  const move = (event, index) => {
    const newBoard = [...boardState];
    const curr = turn === 0 ? 'X' : 'O';
    if (newBoard[index] === '') {
      newBoard[index] = curr;
      event.target.innerHTML = curr;
    }

    setBoard(newBoard);
    console.log(newBoard);
    socket.emit('move', { boardState: boardState });
    // check for winner
    if (index === 0) {
      if (
        (newBoard[1] === curr && newBoard[2] === curr) ||
        (newBoard[3] === curr && newBoard[6] === curr) ||
        (newBoard[4] === curr && newBoard[8] === curr)
      ) {
        winner = curr;
      }
    } else if (index === 1) {
      if (
        (newBoard[0] === curr && newBoard[2] === curr) ||
        (newBoard[4] === curr && newBoard[7] === curr)
      ) {
        winner = curr;
      }
    } else if (index === 2) {
      if (
        (newBoard[0] === curr && newBoard[1] === curr) ||
        (newBoard[5] === curr && newBoard[8] === curr) ||
        (newBoard[4] === curr && newBoard[6] === curr)
      ) {
        winner = curr;
      }
    } else if (index === 3) {
      if (
        (newBoard[0] === curr && newBoard[6] === curr) ||
        (newBoard[4] === curr && newBoard[5] === curr)
      ) {
        winner = curr;
      }
    } else if (index === 4) {
      if (
        (newBoard[1] === curr && newBoard[7] === curr) ||
        (newBoard[3] === curr && newBoard[5] === curr) ||
        (newBoard[0] === curr && newBoard[8] === curr) ||
        (newBoard[2] === curr && newBoard[6] === curr)
      ) {
        winner = curr;
      }
    } else if (index === 5) {
      if (
        (newBoard[2] === curr && newBoard[8] === curr) ||
        (newBoard[3] === curr && newBoard[4] === curr)
      ) {
        winner = curr;
      }
    } else if (index === 6) {
      if (
        (newBoard[0] === curr && newBoard[3] === curr) ||
        (newBoard[7] === curr && newBoard[8] === curr) ||
        (newBoard[2] === curr && newBoard[4] === curr)
      ) {
        winner = curr;
      }
    } else if (index === 7) {
      if (
        (newBoard[1] === curr && newBoard[4] === curr) ||
        (newBoard[6] === curr && newBoard[8] === curr)
      ) {
        winner = curr;
      }
    } else if (index === 8) {
      if (
        (newBoard[2] === curr && newBoard[5] === curr) ||
        (newBoard[0] === curr && newBoard[4] === curr) ||
        (newBoard[6] === curr && newBoard[7] === curr)
      ) {
        winner = curr;
      }
    } else {
      console.log('Weird error happened. How did you get here?');
    }

    if (winner === '') {
      let counter = 0;
      // check if board is full
      newBoard.forEach((space) => {
        if (space !== '') {
          counter = counter + 1;
        }
      });

      // board is full
      if (counter === 9) {
        console.log(`Game over :( No one won.`);
        // end game here
      }
      // board is not full
      else {
        // continue game
      }
    } else {
      console.log(`Player ${curr} won!`);
      // end game here
    }
    setTurn(turn === 0 ? 1 : 0);
  };

  return (
    <div ref={reference} className="container-sm w-50">
      <div className="row">
        <div className="col cell text-center" id="0">
          <button
            className="btn my-0"
            onClick={(event) => {
              move(event, 0);
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="1">
          <button
            className="btn"
            onClick={(event) => {
              move(event, 1);
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="2">
          <button
            className="btn"
            onClick={(event) => {
              move(event, 2);
            }}
          ></button>
        </div>
      </div>
      <div className="row text-center">
        <div className="col cell text-center" id="3">
          <button
            className="btn"
            onClick={(event) => {
              move(event, 3);
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="4">
          <button
            className="btn"
            onClick={(event) => {
              move(event, 4);
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="5">
          <button
            className="btn"
            onClick={(event) => {
              move(event, 5);
            }}
          ></button>
        </div>
      </div>
      <div className="row">
        <div className="col cell text-center" id="6">
          <button
            className="btn"
            onClick={(event) => {
              move(event, 6);
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="7">
          <button
            className="btn"
            onClick={(event) => {
              move(event, 7);
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="8">
          <button
            className="btn"
            onClick={(event) => {
              move(event, 8);
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Board;
