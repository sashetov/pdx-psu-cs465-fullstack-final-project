import React, { useEffect, useState, useRef } from 'react';

// Comments left by users using the form on Connect Page displays here
function Comments() {
  // Hook
  const [comments, setComments] = useState(``);
  const comment_received = useRef(false);
  let comment_holder = '';

  // Get data from /comments to display on the page
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      data.forEach((commenter) => {
        comment_holder =
          comment_holder + `\n${commenter.name} says ${commenter.comments} `;
      });
      setComments(comments + comment_holder);
      comment_received.current = true;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const url = 'http://localhost:8080/comments';
    fetchData(url);
  }, []);

  return (
    <div className="comments_container">
      <h1 className="comments_header" data-testid="comments">
        Comments
      </h1>
      <p className="comments_explain" data-testid="comments">
        You can leave us comments by filling out the form in the Connect page!
      </p>
      <div>
        <pre className="comments_display">
          {comment_received.current === false
            ? `No comments received`
            : `${comments}`}
        </pre>
      </div>
    </div>
  );
}

export default Comments;
