import React from 'react';

function About() {
  console.log('in About');

  return (
    <div className="container mx-auto text-center">
      <h1 className="display-1">About</h1>
      <p>This is a CS465/565 Final Project by Ariel, Cera, and Alex</p>
      <p>
        We wanted to implement a game using Node.js, React.js, Express.js, and
        Socket.io
      </p>
      <p>We decided on a Tic-Tac-Toe game</p>
      <p>More about each of us can be found in:</p>
      <p>Add links to each person's GitHub, website, or something</p>
    </div>
  );
}

export default About;
