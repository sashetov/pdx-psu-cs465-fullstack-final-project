import React, { useEffect, useRef, useState } from 'react';

const History = ({socket}) => {
  const [history, setHistory] = useState([]);

  socket.on('msg_sent', (data) => {
    let newHistory = [...history];
    newHistory.push(data);
    setHistory(newHistory);
    console.log(history);
  })

  return (
    <div>
      {history}
    </div>
  )

}

export default History;