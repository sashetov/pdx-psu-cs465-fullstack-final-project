import socketio from "socket.io-client";
import React from 'react';

const url = ('http://localhost:8080');

export const socket = socketio.connect(url);
export const SocketContext = React.createContext();