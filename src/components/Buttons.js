import React from 'react';
import Container from './Container';

// set up buttons to navigate bewtween pages? Or we can do navbar. still thinking
function Buttons({ howTo, about, connect, socket }) {
  /// const [updater, setUpdate] = useState(0);

  console.log('in Buttons');

  // handles click of About button
  const handleAbout = (event) => {
    console.log('In handleAbout');

    event.preventDefault();
    about.current = true;
    howTo.current = false;
    connect.current = false;
    return <Container socket={socket} />;
  };

  const handleHowToPlay = (event) => {
    console.log('In handleHowToPlay');
    event.preventDefault();
    howTo.current = true;
    about.current = false;
    connect.current = false;
    return <Container socket={socket} />;
  };

  // handles click of Connect button
  const handleConnect = (event) => {
    console.log('In handleConnect');
    event.preventDefault();
    connect.current = true;
    howTo.current = false;
    about.current = false;
    return <Container socket={socket} />;
  };

  console.log('Exiting Buttons');

  return (
    <div className="nav-container mx-auto my-auto text-center">
      <button
        className="nav-btn"
        id="about"
        type="button"
        onClick={handleAbout}
      >
        About
      </button>
      <button
        className="nav-btn"
        id="connect"
        type="button"
        onClick={handleConnect}
      >
        Connect
      </button>
      <button
        className="nav-btn"
        id="how"
        type="button"
        onClick={handleHowToPlay}
      >
        How To Play
      </button>
    </div>
  );
}

export default Buttons;
