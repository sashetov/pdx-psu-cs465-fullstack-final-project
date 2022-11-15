import React, { useEffect, useState, useContext } from 'react';
import Container from './components/Container';
import { SocketContext } from './components/socket';


function App() {
  const socket = useContext(SocketContext);
  return (
    <Container socket={socket}/>
  );
}

export default App;
