import { render } from '@testing-library/react';
import React, { useEffect, useRef, useState } from 'react';
import Banner from './Banner';
import Board from './Board';
import Waiting from './Waiting';
import Chat from './Chat';

const Container = ({ socket }) => {
  const [joined, setJoined] = useState(false);
  const [toRender, setToRender] = useState(null);
  const player_name = useRef('');
  const first_player = useRef('');
  const second_player = useRef('');

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
    // Store player's name
    player_name.current = event.target[0].value;

    setJoined(true);
    setToRender(Waiting);
  }

  socket.on('opponentAvailable', (data) => {
    if (data.status === 'ok') {
      // Determine if you are the first player
      if (data.data.isYourTurn === true) {
        first_player.current = player_name.current;
        second_player.current = data.data.opponentName;
      }
      // Not the first player
      else {
        second_player.current = player_name.current;
        first_player.current = data.data.opponentName;
      }

      setToRender(
        <Board
          socket={socket}
          first_player={first_player}
          second_player={second_player}
        />
      );
    }
  });

  const splash = (
    <form
      id="player"
      class="form w-50 mx-auto mt-5 p-3"
      method="get"
      onSubmit={(event) => {
        // Player name entered
        console.log(event);
        if (event.target.name.value.length > 0) {
          handleSubmit(event);
        }
        // Player name not entered
        else {
          console.warn('You must enter your name to play!');
          window.alert('Please enter a name to join!');
        }
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

  if (!joined) {
    return (
      <div>
        <Banner />
        {splash}
      </div>
    );
  } else {
    return (
      <div>
        <Banner />
        {toRender}
        <Chat socket={socket} />
      </div>
    );
  }
};

export default Container;
