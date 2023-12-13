import React from 'react';
import Banner from './Banner';
import Board from './Board';

// Renders Home page
const Home = ({
  socket,
  newGame,
  first_player,
  second_player,
  gameFinished,
  board_update,
}) => {
  return (
    <div>
      <Banner />
      <Board
        socket={socket}
        first_player={first_player}
        second_player={second_player}
        newGame={newGame}
        gameFinished={gameFinished}
        board_update={board_update}
      />
    </div>
  );
};

export default Home;
