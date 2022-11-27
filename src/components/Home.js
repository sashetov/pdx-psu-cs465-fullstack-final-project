import React, { useRef, useState } from 'react';
import Banner from './Banner';
import Board from './Board';
import Chat from './Chat';

const Home = ({ socket, newGame, first_player, second_player }) => {
  return (
    <div>
      <Banner />
      <Board
        socket={socket}
        first_player={first_player}
        second_player={second_player}
        newGame={newGame}
      />
      <Chat socket={socket} />
    </div>
  );
};

export default Home;
