import React, { useRef, useState } from 'react';
import Form from './Form';
import HowToPlay from './HowToPlay';
import About from './About';
import Buttons from './Buttons';

// set up buttons to navigate bewtween pages? Or we can do navbar. still thinking
function ButtonHandler({ linked }) {
  const [show, setShow] = useState(null);
  console.log('in Buttons');

  // handles click of About button
  const handleAbout = (event) => {
    console.log('In handleAbout');
    linked.current = true;
    setShow(<About />);
  };

  const handleHowToPlay = (event) => {
    console.log('In handleHowToPlay');
    linked.current = true;
    setShow(<HowToPlay />);
  };

  // handles click of Connect button
  const handleConnect = (event) => {
    console.log('In handleConnect');
    linked.current = true;
    setShow(<Form />);
  };

  console.log('Exiting Buttons');

  if (linked.current === true) {
    return (
      <div>
        <>{show}</>
        <Buttons
          handleAbout={handleAbout}
          handleHowToPlay={handleHowToPlay}
          handleConnect={handleConnect}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Buttons
          handleAbout={handleAbout}
          handleHowToPlay={handleHowToPlay}
          handleConnect={handleConnect}
        />
      </div>
    );
  }
}

export default ButtonHandler;
