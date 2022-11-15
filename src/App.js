import React, { useEffect, useState } from 'react';
import Container from './components/Container';
import { SocketProvider } from './components/socket';
class App extends React.Component {
  
  render() {
    return (
      <SocketProvider>
        <Container />
      </SocketProvider>
    )
  }
}

export default App;
