import React from 'react';

// Renders "About" page
function About() {
  return (
    <div className="container mx-auto text-center">
      <h1
        className="about display-1"
        data-testid="about"
        araia-label="about heading"
      >
        About
      </h1>
      <p data-testid="p1">
        This is a CS465/565 Final Project by Ariel, Cera, and Alex
      </p>
      <p data-testid="p2">
        We wanted to implement a game using Node.js, React.js, Express.js, and
        Socket.io
      </p>
      <p data-testid="p3">We decided on a Tic-Tac-Toe game</p>
      <p data-testid="p4">Our project code can be found in: </p>
      <p>
        <a
          href="https://github.com/gleason9113/465final"
          target="_blank"
          rel="noreferrer"
          data-testid="link-project"
          araia-label="github link code"
        >
          Project
        </a>
      </p>
      <p>More about each of us can be found in:</p>
      <p>
        <a
          href="https://github.com/C3ra906"
          target="_blank"
          rel="noreferrer"
          data-testid="cera-git"
          araia-label="github link cera"
        >
          Cera's Github
        </a>
      </p>
      <p>
        <a
          href="https://github.com/sashetov"
          target="_blank"
          rel="noreferrer"
          data-testid="alex-git"
          araia-label="github link alex"
        >
          Alex's Github
        </a>
      </p>
      <p>
        <a
          href="https://github.com/gleason9113"
          target="_blank"
          rel="noreferrer"
          data-testid="ariel-git"
          araia-label="github link ariel"
        >
          Ariel's Github
        </a>
      </p>
    </div>
  );
}

export default About;
