import React, { useRef, useState } from 'react';
import Form from './Form';
import HowToPlay from './HowToPlay';
import About from './About';
import Buttons from './Buttons';
import Container from './Container';

// set up buttons to navigate bewtween pages? Or we can do navbar. still thinking
function ButtonHandler({ socket }) {
  const [show, setShow] = useState(null);
  const linked = useRef(false);

  // handles click of Home button
  const handleHome = () => {
    linked.current = true;
    setShow(<Container socket={socket} />);
  };

  // handles click of About button
  const handleAbout = () => {
    linked.current = true;
    setShow(<About />);
  };

  const handleHowToPlay = () => {
    linked.current = true;
    setShow(<HowToPlay />);
  };

  // handles click of Connect button
  const handleConnect = () => {
    linked.current = true;
    setShow(<Form />);
  };

  if (linked.current === true) {
    return (
      <div>
        <>{show}</>
        <Buttons
          handleAbout={handleAbout}
          handleHowToPlay={handleHowToPlay}
          handleConnect={handleConnect}
          handleHome={handleHome}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Container socket={socket} />
        <Buttons
          handleAbout={handleAbout}
          handleHowToPlay={handleHowToPlay}
          handleConnect={handleConnect}
          handleHome={handleHome}
        />
      </div>
    );
  }
}

export default ButtonHandler;
