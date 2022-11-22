import React, { createContext } from 'react';
import io from 'socket.io-client';
const url = 'http://localhost:8080';

const socket = io(url),
  SocketContext = createContext(socket);
socket.on('connect', () => console.log('connected to socket'));

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
