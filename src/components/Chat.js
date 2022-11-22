import React from 'react';
import Title from './Title';
import History from './History';
import Message from './Message';

function Chat({socket}) {
  return (
    <div className="container mx-auto text-center chat">
      <Title />
      <History socket={socket}/>
      <Message socket={socket}/>
    </div>
  );
}

export default Chat;
