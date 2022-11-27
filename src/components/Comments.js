import React from 'react';

// Form in Connect Page
function Comments() {
  console.log('in Comments');

  let url = new URL('http://localhost:8080/comments');
  fetch(url).then((response) => console.log(response.body));

  return (
    <div className="container mx-auto my-auto text-center form">
      <p>Testing</p>
    </div>
  );
}

export default Comments;
