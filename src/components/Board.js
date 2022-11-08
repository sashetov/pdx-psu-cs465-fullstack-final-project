import React, { useEffect, useRef, useState } from 'react';

const Board = ({ socket }) => {
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

  //Variables and constants
  //let mark = ''; // not yet used, removed so eslint would stop complaining
  let winner = '';
  const reference = useRef(null);

  //Functions
  const checkWinner = () => {
    const board = [...boardState];
    for (let i = 0; i < 9; i += 3) {
      if (board[i] === board[i+1] === board[i+2]) {
        winner = board[i];
      }
    }
    for(let i = 0; i < 3; i++) {
      if (board[i] === board[i+3] === board[i+6]) {
        winner = board[i];
      }
    }
    if(board[0] === board[4] === board[8] || board[2] === board[4] === board[6]) {
      winner = board[4];
    }
    return winner;
  }

  const checkTie = () => {
    const board = [...boardState];
    let counter = 0;
    board.forEach((space) => {
      if (space !== '') {
        counter = counter + 1;
      }
    });
    return counter === 9;
  }

  const move = (event, index) => {
    const newBoard = [...boardState];
    const curr = turn === 0 ? 'X' : 'O';
    if (newBoard[index] === '') {
      newBoard[index] = curr;
      event.target.innerHTML = curr;
    }

    setBoard(newBoard);
    console.log(newBoard);
    // check for winner
   winner = checkWinner();
   if (winner !== '') {
    console.log(`${winner} won!`);
   } else if (checkTie() === true) {
    console.log(`Game over :( No one won.`);
   } else { 
    socket.emit('move', { boardState: newBoard });
    setTurn(turn === 0 ? 1 : 0);
   }

  };

  return (
    <div ref={reference} className="container-sm w-50">
      <div className="row">
        <div className="col cell text-center" id="0">
          <button
            className="btn my-0"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[0] === '') {
                move(event, 0);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="1">
          <button
            className="btn"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[1] === '') {
                move(event, 1);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="2">
          <button
            className="btn"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[2] === '') {
                move(event, 2);
              }
            }}
          ></button>
        </div>
      </div>
      <div className="row text-center">
        <div className="col cell text-center" id="3">
          <button
            className="btn"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[3] === '') {
                move(event, 3);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="4">
          <button
            className="btn"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[4] === '') {
                move(event, 4);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="5">
          <button
            className="btn"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[5] === '') {
                move(event, 5);
              }
            }}
          ></button>
        </div>
      </div>
      <div className="row">
        <div className="col cell text-center" id="6">
          <button
            className="btn"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[6] === '') {
                move(event, 6);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="7">
          <button
            className="btn"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[7] === '') {
                move(event, 7);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center" id="8">
          <button
            className="btn"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[8] === '') {
                move(event, 8);
              }
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Board;

/*
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
        socket.emit('move', { boardState: newBoard });
        setTurn(turn === 0 ? 1 : 0);
      }
      */