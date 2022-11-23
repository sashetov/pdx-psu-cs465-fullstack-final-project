import React, { useEffect, useRef, useState } from "react";

const Board = ({ socket }) => {
  //Hooks
  const [turn, setTurn] = useState(0);
  const [boardState, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  let block = useRef(true);

  //useEffect does after render
  useEffect(() => {
    const exampleHandler = (data) => {
      console.log(data);
    };

    console.log("socket:", socket);
    window.socket = socket;

    socket.on("client_disconnect", exampleHandler);
    //socket emits status, msg, data
    //status: error or success

    return () => {
      socket.off("move_done", exampleHandler);
      socket.off("client_disconnect", exampleHandler);
    };
  }, [socket]);

  //Variables and constants
  const reference = useRef(null);

  //Functions
  const allow_move = (data) => {
    if (data.status === "error") {
      block.current = true;
      console.log("client error:" + data.msg);
    } else if (data.status === "success") {
      console.log("move was successful");
      block.current = false;
      //console.log(data.msg);
    } else {
      console.log("unknown error occured w/ allow_move");
      block.current = true;
      //console.log(data.status);
      console.log(data.msg);
    }
    console.log(`current value of block: ` + block.current);
  };

  const two_player = (data) => {
    if (data.status === "ok") {
      console.log("another player has joined");
      block.current = false;
    } else {
      console.log("You are alone :( ");
      block.current = true;
    }
  };

  const move = (event, index) => {
    const newBoard = [...boardState];
    const curr = turn === 0 ? "X" : "O";
    socket.on("opponentAvailable", two_player); //status ok
    socket.on("move_done", allow_move);
    console.log(`currently block is:` + block.current);
    if (block.current === false) {
      if (newBoard[index] === "") {
        newBoard[index] = curr;
        event.target.innerHTML = curr;
        setTurn(turn === 0 ? 1 : 0);
        console.log(`Marked ${index}`);
      }
      console.log(`we weren't blocked but alas the board wasn't empty`);
    } else {
      console.log("we were blocked from making a move");
    }
    setBoard(newBoard);
    console.log(newBoard);
    socket.emit("move", { boardState: newBoard });
    //block.current = false;
  };

  socket.on("move_done", (data) => {
    console.log("From Server" + JSON.stringify(data));
  });

  return (
    <div>
      <div ref={reference} className="container-sm w-50">
        <div className="row">
          <div
            className="col cell text-center"
            id="0"
            onClick={(event) => {
              // only mark and change turn when the square is empty
              if (boardState[event.target.id] === "") {
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
              if (boardState[event.target.id] === "") {
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
              if (boardState[event.target.id] === "") {
                move(event, event.target.id);
              }
            }}
            aria-label="cell 2"
          ></div>
          aria-label="cell 2"
        </div>
      </div>
      <div className="row text-center">
        <div
          className="col cell text-center"
          id="3"
          onClick={(event) => {
            // only mark and change turn when the square is empty
            if (boardState[event.target.id] === "") {
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
            if (boardState[event.target.id] === "") {
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
            if (boardState[event.target.id] === "") {
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
            if (boardState[event.target.id] === "") {
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
            if (boardState[event.target.id] === "") {
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
            if (boardState[event.target.id] === "") {
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
