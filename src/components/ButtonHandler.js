import React, { useRef, useState } from 'react';
import Form from './Form';
import HowToPlay from './HowToPlay';
import About from './About';
import Buttons from './Buttons';
import Container from './Container';
import Home from './Home';

// Handles button clicks and rendering of appropriate pages
function ButtonHandler({ socket }) {
  // Hooks
  const [show, setShow] = useState(null); // variable for which page to render
  const linked = useRef(false); // variable for whether a button is clicked
  const newGame = useRef(true); // variable for whether this a new game or the game has already started
  const first_player = useRef(''); // variable for the name of the first player
  const second_player = useRef(''); // variable for the name of the second player
  const gameFinished = useRef(false); // variable for whether the game has finished (controls whether chat component is shown)

  // handles click of Home button
  const handleHome = () => {
    linked.current = true;

    // Game hasn't started
    if (newGame.current === true) {
      setShow(
        <Container
          socket={socket}
          newGame={newGame}
          first_player={first_player}
          second_player={second_player}
          gameFinished={gameFinished}
        />
      );
    }
    // In a game
    else {
      setShow(
        <Home
          socket={socket}
          newGame={newGame}
          first_player={first_player}
          second_player={second_player}
          gameFinished={gameFinished}
        />
      );
    }
  };

  // handles click of About button
  const handleAbout = () => {
    linked.current = true;
    setShow(<About />);
  };

  // handles click of HowToPlay button
  const handleHowToPlay = () => {
    linked.current = true;
    setShow(<HowToPlay />);
  };

  // handles click of Connect button
  const handleConnect = () => {
    linked.current = true;
    setShow(<Form />);
  };

  // render pages
  if (linked.current === true) {
    return (
      <div>
        <Buttons
          handleAbout={handleAbout}
          handleHowToPlay={handleHowToPlay}
          handleConnect={handleConnect}
          handleHome={handleHome}
        />
        <>{show}</>
      </div>
    );
  } else {
    return (
      <div>
        <Buttons
          handleAbout={handleAbout}
          handleHowToPlay={handleHowToPlay}
          handleConnect={handleConnect}
          handleHome={handleHome}
        />
        <Container
          socket={socket}
          first_player={first_player}
          second_player={second_player}
          newGame={newGame}
          gameFinished={gameFinished}
        />
      </div>
    );
  }
}

export default ButtonHandler;
