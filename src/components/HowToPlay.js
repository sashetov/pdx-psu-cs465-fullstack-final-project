import React from 'react';

// Page to Explain how to play the game
function HowToPlay() {
  console.log('in How To');

  return (
    <div className="container mx-auto text-left">
      <h1 className="display-1 text-center">How to Play Tic-Tac-Toe</h1>
      <p>This game is played with two players</p>
      <p>Rules:</p>
      <ul>
        <li>The first player enter their name to connect will be 'Player 1'</li>
        <li>
          The second player to enter their name to connect will be 'Player 2'
        </li>
        <li>
          The first player may need to wait until there is a second player
        </li>
        <li>
          Player 1 is assigned the symbol 'X' and Player 2 is assigned the
          symbol 'O'
        </li>
        <li>
          Once there are two players, the game screen will load the 3x3 board
        </li>
        <li>The game is played by clicking on a square of the board</li>
        <li>
          If the move is valid, the chosen square will be marked by the player's
          symbol
        </li>
        <li>
          Whoever is the first to connect 3 of their symbols horizontally,
          vertically, or diagonally wins the game
        </li>
        <li>
          The game will end in a tie if all squares are filled but no one has
          connected 3 of their symbols
        </li>
      </ul>
    </div>
  );
}

export default HowToPlay;
