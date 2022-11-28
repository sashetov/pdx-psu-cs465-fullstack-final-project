import React, { useState } from 'react';

// Form in Connect Page
function Comments() {
  console.log('in Comments');
  const [comments, setComments] = useState(``);

  console.log('in publish');

  const url = 'http://localhost:8080/comments';

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      //console.log(JSON.stringify(data));
      data.forEach((commenter) => {
        setComments(
          comments + `${commenter.name} says ${commenter.comments} \n`
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  fetchData(url);

  return (
    <div className="container mx-auto my-auto text-center">
      <div>{`${comments}`}</div>
    </div>
  );
}

export default Comments;
