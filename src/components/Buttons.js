import React from 'react';

// set up buttons to navigate bewtween pages? Or we can do navbar. still thinking
function Buttons({ handleAbout, handleConnect, handleHowToPlay }) {
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
