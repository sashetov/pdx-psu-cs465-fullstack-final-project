import { render } from '@testing-library/react';
import React, { useEffect, useRef, useState } from 'react';

function Message({ socket }) {
  const [ message, setMessage ] = useState(null);

  let handleSubmit = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
    socket.emit('chat_msg', message);
    console.log("Sending: " + message);
  //  setMessage('');
  };

  let handleChange = (e) => {
    setMessage(e.target.value);
  }
  const MsgWindow = (
    <form
        className='send-message-form msg'
        onSubmit={handleSubmit}>
          <input 
            onChange={handleChange}
            value={message}
            placeholder='Type here...'
            type="text" />
        </form>
  )
  
  return (
    <div>
      { MsgWindow }
    </div>
    
  );
}

export default Message;