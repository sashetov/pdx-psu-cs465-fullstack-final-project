import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Banner from './components/Banner';
import Board from './components/Board';
import Splash from './components/Splash';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io.connect(window.location.origin);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  // TODO add connection to Splash page when user first opens the domain
  return (
    <div>
      <Banner />
      {socket ? <Board socket={socket} /> : <div>Not Connected</div>}
    </div>
  );
}

export default App;
