import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Banner from './components/Banner';
import Board from './components/Board';
//import Splash from './components/Splash';

function App() {
  const [socket, setSocket] = useState(null);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    const newSocket = io.connect(window.location.origin);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  function handleSubmit(event) {
    setFirst(false);
  }

  const splash = (
    <form
      id="player"
      class="form w-50 mx-auto mt-5 p-3"
      method="get"
      onSubmit={handleSubmit}
    >
      <div class="form-group mx-auto my-2">
        <label class="py-2" for="name">
          Please enter player name:
        </label>
        <input type="text" class="form-control" id="name" />
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

  return (
    <div>
      <Banner />
      {first ? (
        splash
      ) : socket ? (
        <Board socket={socket} />
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}
//
export default App;
