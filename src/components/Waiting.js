import React from 'react';
import Cog from './Cog';
 

function Waiting() {
  return (
    <div className="container mx-auto text-center waiting">
      <div>
        <h1 className="display-1">Waiting for opponent...</h1>
      </div> 
      <Cog /> 
    </div>
  );
}

export default Waiting;