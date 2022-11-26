import React, { useEffect, useState, useContext } from 'react';
import ButtonHandler from './components/ButtonHandler';
import { SocketContext } from './components/socket';

function App() {
  const socket = useContext(SocketContext);
  return <ButtonHandler socket={socket} />;
}

export default App;
