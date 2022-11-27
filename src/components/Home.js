import React from 'react';
import Banner from './Banner';
import Board from './Board';

const Home = ({
  socket,
  newGame,
  first_player,
  second_player,
  gameFinished,
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
      />
    </div>
  );
};

export default Home;
