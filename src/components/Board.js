import React, { useEffect, useRef, useState } from 'react';

const initialBoard = ['', '', '', '', '', '', '', '', ''];

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
  //Check board for a winning state.
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

  //Check board for a tie
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
    setBoard(initialBoard);
    console.log("Board reset: " + boardState);
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
        <div className="col cell text-center">
          <button
            className="btn my-0"
            id="0"
            onClick={(event) => {
              // only mark and change turn when the square is empty
            
              if (boardState[event.target.id] === '') {
                move(event, event.target.id);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center" >
          <button
            className="btn"
            id="1"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[event.target.id] === '') {
                move(event, event.target.id);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center">
          <button
            className="btn"
            id="2"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[event.target.id] === '') {
                move(event, event.target.id);
              }
            }}
          ></button>
        </div>
      </div>
      <div className="row text-center">
        <div className="col cell text-center" >
          <button
            className="btn"
            id="3"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[event.target.id] === '') {
                move(event, event.target.id);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center" >
          <button
            className="btn"
            id="4"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[event.target.id] === '') {
                move(event, event.target.id);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center" >
          <button
            className="btn"
            id="5"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[event.target.id] === '') {
                move(event, event.target.id);
              }
            }}
          ></button>
        </div>
      </div>
      <div className="row">
        <div className="col cell text-center">
          <button
            className="btn"
            id="6"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[event.target.id] === '') {
                move(event, event.target.id);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center">
          <button
            className="btn"
            id="7"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[event.target.id] === '') {
                move(event, event.target.id);
              }
            }}
          ></button>
        </div>
        <div className="col cell text-center">
          <button
            className="btn"
            id="8"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[event.target.id] === '') {
                move(event, event.target.id);
              }
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Board;

