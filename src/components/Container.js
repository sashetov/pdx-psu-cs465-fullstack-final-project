import React, { useEffect, useState, useContext } from 'react';
import Banner from './Banner';
import Board from './Board';
import openSocket from 'socket.io-client';

import Splash from './Splash';
//import { SocketContext } from './socket';

function App() {
  const [socket, setSocket] = useState(null);
  const [first, setFirst] = useState(true);
 
  useEffect(() => {
    const newSocket = openSocket("http://localhost:5000:8080");
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);
  
  let url = new URL('http://localhost:8080/join'), params = { playerName:"Test", socket_id: "21" }; //socket_id:socket.id
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));


  function handleSubmit(event) {
    event.preventDefault();
    let { value } = event.target;
    console.log("Socket: " + socket.connected);
    fetch(url).then((response) => {
      console.log(response.json());
    })
  }

  const splash = (
    <form
      id="player"
      class="form w-50 mx-auto mt-5 p-3"
      method="get"
      onSubmit={event => {handleSubmit(event)}}
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