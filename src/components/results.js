// check for winner - just moved here as a function
function results(index, curr, newBoard) {
  let winner = '';

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
      //socket.emit('move', { boardState: newBoard });
      //setTurn(turn === 0 ? 1 : 0);
    }
  } else {
    console.log(`Player ${curr} won!`);
    // end game here
  }

  return winner;
}
