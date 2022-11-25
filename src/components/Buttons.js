import React from 'react';

// set up buttons to navigate bewtween pages? Or we can do navbar. still thinking
function Buttons() {
  return (
    <div class="btn-container " id="btn-container">
      <button
        class="nav-btn"
        id="about"
        type="button"
        action="/about"
        method="GET"
      >
        About
      </button>
      <button
        class="nav-btn"
        id="connect"
        type="button"
        action="/connect"
        method="GET"
      >
        Connect
      </button>
    </div>
  );
}

export default Buttons;
