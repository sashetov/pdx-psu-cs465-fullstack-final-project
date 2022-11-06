import React, { useState, useRef } from 'react';

const Board = ({}) =>  {
  //Hooks
  const [turn, setTurn] = useState(0);
  const [boardState, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  //Variables and constants
  let mark = '';
  let winner = '';
  const reference = useRef(null);

  //Functions
  const move = (event, index) => {
    const newBoard = [...boardState];
    const curr = turn === 0 ? 'X' : 'O';
    if(newBoard[index] === '') {
      newBoard[index] = curr;
      event.target.innerHTML = curr;
    }
    
    setBoard(newBoard);
    console.log(boardState);
    setTurn(turn === 0 ? 1 : 0);
  }
  

  return (
    <div ref={reference} className="container-sm w-50">
        <div className="row">
          <div className="col cell text-center" id="0">
            <button className="btn my-0" onClick={(event) => {move(event, 0)}}></button>
          </div>
          <div className="col cell text-center" id="1">
            <button className="btn" onClick={(event) => {move(event, 1)}}></button>
          </div>
          <div className="col cell text-center" id="2">
            <button className="btn" onClick={(event) => {move(event, 2)}}></button>
          </div>
        </div>
        <div className="row text-center">
          <div className="col cell text-center" id="3">
            <button className="btn" onClick={(event) => {move(event, 3)}}></button>
          </div>
          <div className="col cell text-center" id="4">
            <button className="btn" onClick={(event) => {move(event, 4)}}></button>
          </div>
          <div className="col cell text-center" id="5">
            <button className="btn" onClick={(event) => {move(event, 5)}}></button>
          </div>
        </div>
        <div className="row">
          <div className="col cell text-center" id="6">
            <button className="btn" onClick={(event) => {move(event, 6)}}></button>
          </div>
          <div className="col cell text-center" id="7">
            <button className="btn" onClick={(event) => {move(event, 7)}}></button>
          </div>
          <div className="col cell text-center" id="8">
            <button className="btn" onClick={(event) => {move(event, 8)}}></button>
          </div>
        </div>
        
    </div>
  );
  
}

export default Board;