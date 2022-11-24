import React from 'react';

function HowToPlay() {
  console.log('in How To');

  return (
    <div className="container mx-auto text-center">
      <h1 className="display-1">How to Play Tic-Tac-Toe</h1>
      <p>This game is played with two players</p>
      <p>The first player enter their name to connect will be 'Player 1'</p>
      <p>The second player to enter their name to connect will be 'Player 2'</p>
      <p>The first player may need to wait until there is a second player</p>
      <p>
        Player 1 is assigned the symbol 'X' and Player 2 is assigned the symbol
        'O'
      </p>
      <p>Once there are two players, the game screen will load the 3x3 board</p>
      <p>The game is played by clicking on a square of the board</p>
      <p>
        If the move is valid, the chosen square will be marked by the player's
        symbol
      </p>
      <p>
        Whoever is the first to connect 3 of their symbols horizontally,
        vertically, or diagonally wins the game
      </p>
      <p>
        The game will end in a tie if all squares are filled but no one has
        connected 3 of their symbols
      </p>
    </div>
  );
}

export default HowToPlay;
