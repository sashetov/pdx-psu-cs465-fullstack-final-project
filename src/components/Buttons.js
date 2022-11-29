import React from 'react';

// Buttons for navigating between different pages
function Buttons({
  handleAbout,
  handleConnect,
  handleHowToPlay,
  handleHome,
  handleComments,
}) {
  return (
    <div className="nav-container">
      <button
        className="nav-btn"
        id="home"
        type="button"
        onClick={handleHome}
        data-testid="home_button"
      >
        Home
      </button>
      <button
        className="nav-btn"
        id="about"
        type="button"
        onClick={handleAbout}
        data-testid="about_button"
      >
        About
      </button>
      <button
        className="nav-btn"
        id="connect"
        type="button"
        onClick={handleConnect}
        data-testid="connect_button"
      >
        Connect
      </button>
      <button
        className="nav-btn"
        id="how"
        type="button"
        onClick={handleHowToPlay}
        data-testid="howToPlay_button"
      >
        How To Play
      </button>
      <button
        className="nav-btn"
        id="comments"
        type="button"
        onClick={handleComments}
        data-testid="comment_button"
      >
        Comments
      </button>
    </div>
  );
}

export default Buttons;
