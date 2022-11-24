import { render } from '@testing-library/react';
import React, { useEffect, useRef, useState } from 'react';
import Banner from './Banner';
import Board from './Board';
import Waiting from './Waiting';
import Chat from './Chat';
import Buttons from './Buttons';
import Form from './Form';
import HowToPlay from './HowToPlay';
import About from './About';

const Container = ({ socket }) => {
  const [joined, setJoined] = useState(false);
  const [toRender, setToRender] = useState(null);

  // To be passed to Buttons component:
  const howTo = useRef(false);
  const about = useRef(false);
  const connect = useRef(false);
  console.log('in Container');

  function Linked() {
    console.log('in Link');
    console.log('current values of howTo, about, connect:');
    console.log(`${howTo.current} ${about.current} ${connect.current}`);

    if (howTo.current === true) {
      console.log('howTo If statement');
      //reset value
      howTo.current = false;
      return (
        <>
          <Banner />
          <HowToPlay />
          <Buttons
            howTo={howTo}
            about={about}
            connect={connect}
            socket={socket}
          />
        </>
      );
    } else if (about.current === true) {
      console.log('about If statement');
      //reset value
      about.current = false;
      return (
        <>
          <Banner />
          <About />
          <Buttons
            howTo={howTo}
            about={about}
            connect={connect}
            socket={socket}
          />
        </>
      );
    } else if (connect.current === true) {
      //reset value
      console.log('connect If statement');
      connect.current = false;
      return (
        <>
          <Banner />
          <Form />
          <Buttons
            howTo={howTo}
            about={about}
            connect={connect}
            socket={socket}
          />
        </>
      );
    } else if (!joined) {
      console.log('Waiting for player');
      return (
        <>
          <Banner />
          {splash}
          <Buttons
            howTo={howTo}
            about={about}
            connect={connect}
            socket={socket}
          />
        </>
      );
    } else if (joined) {
      console.log('Else stetement');
      return (
        <>
          <Banner />
          {toRender}
          <Chat socket={socket} />
          <Buttons
            howTo={howTo}
            about={about}
            connect={connect}
            socket={socket}
          />
        </>
      );
    } else {
    }
  }

  //setUpdater(updater + 1);y

  function handleSubmit(event) {
    event.preventDefault();
    let id = socket.id;
    let url = new URL('http://localhost:8080/join'),
      params = { playerName: event.target[0].value, socket_id: id }; //socket_id:socket.id
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    fetch(url).then((response) => {
      console.log(response.json());
    });
    setJoined(true);
    setToRender(Waiting);
  }

  socket.on('opponentAvailable', (data) => {
    if (data.status === 'ok') {
      setToRender(<Board socket={socket} />);
    }
  });

  const splash = (
    <form
      id="player"
      class="form w-50 mx-auto mt-5 p-3"
      method="get"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <div class="form-group mx-auto my-2">
        <label class="py-2" for="name">
          Please enter player name:
        </label>
        <input type="text" class="form-control" id="name" name="name" />
      </div>
      <div class="row form-group mx-auto mb-2">
        <input
          class="col btn btn-primary my-2 px-5"
          type="submit"
          name="submit"
          value="Play"
        />
        <input
          class="col btn btn-secondary mx-1 my-2 px-5"
          type="reset"
          name="reset"
          value="Reset"
        />
      </div>
    </form>
  );

  const show = Linked();
  return <div>{show}</div>;
};

export default Container;
