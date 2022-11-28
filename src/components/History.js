import React, { useEffect, useRef, useState } from 'react';

const History = ({socket}) => {
  const [history, setHistory] = useState([]);
  const target = useRef(null);

  useEffect(() => {
    target.current.scrollIntoView({ behavior: 'smooth' });
  });

  socket.on('chat_done', (data) => {
    let newHistory = [...history];
    newHistory.push({"value": `${data.data.from.trim()}: ${data.data.message.trim()}`});
    setHistory(newHistory);
    console.log(history);
  })

  const chatHistory = history.map((item) => 
    <li>{item.value}</li>
  )

  return (
    <div className="history" aria-label="chat-history">
      <ul>
        {chatHistory}
      </ul>
      <div ref={target} />
    </div>

  );

};

export default History;