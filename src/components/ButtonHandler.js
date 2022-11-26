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
  const socket_id = useRef('');

  console.log('in Buttons');
  console.log(socket);
  // handles click of Home button
  const handleHome = (event) => {
    console.log('In handleHome');
    linked.current = true;
    socket_id.current = socket.id;
    setShow(<Container socket={socket} />);
    console.log(socket);
    console.log(`id: ${socket_id.current}`);
  };

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
          handleHome={handleHome}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Container socket={socket} socket_id={socket_id} />
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
