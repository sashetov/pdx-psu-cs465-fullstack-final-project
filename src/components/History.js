import React, { useEffect, useRef, useState } from 'react';

function History({socket}) {
  const [history, setHistory] = useState([]);

  socket.on('msg_sent', (data) => {
    let newHistory = [...history];
    newHistory.push(data);
    setHistory(newHistory);
  })

  return (
    <div>
      {history}
    </div>
  )

}