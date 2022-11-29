import React from 'react';

// Form in Connect Page
function Form() {
  // Handles form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // Name and Email Entered
    if (
      event.target.name.value.length > 0 &&
      event.target.email.value.length > 0
    ) {
      console.log('---- Form Submission Acceptable ----');
      console.log('Name: ' + event.target.name.value);
      console.log('Email: ' + event.target.email.value);

      // Comment filled
      if (event.target.comments.value.length > 0) {
        console.log(`Comments: ${event.target.comments.value}`);

        const url = 'http://localhost:8080/comments';
        const data = {
          name: event.target.name.value,
          email: event.target.email.value,
          comments: event.target.comments.value,
        };

        // Handles POST to /comments
        const postData = async (url, data) => {
          try {
            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'same-origin',
              referrerPolicy: 'no-referrer',
              redirect: 'follow',
              body: JSON.stringify(data),
            });
            console.log(response.json());
          } catch (error) {
            console.error(error);
          }
        };

        postData(url, data);

        // Comment empty
      } else {
        console.log('Comments: N/A');
      }
      window.alert(`Thank you for connecting ${event.target.name.value}!`);
    }
    // Empty Name or Email
    else {
      console.warn('You must enter your name and email to submit!');
      window.alert('Please enter a valid name and email!');
    }
  };

  return (
    <div className="container mx-auto my-auto text-center">
      <form
        className="connect_form form w-50 mx-auto mt-5 p-3"
        onSubmit={handleSubmit}
        aria-label="connect form"
        data-testid="connect_form"
      >
        <h1
          className="mt-2 mb-4 connect_header"
          data-testid="connect_header"
          aria-label="connect header"
        >
          Let's Connect!
        </h1>
        <div className="form-group mx-auto my-2">
          <label
            className="py-2 name_label"
            htmlFor="name"
            aria-label="name label"
            data-testid="name-label"
          >
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-label="name field"
            data-testid="name"
          />
        </div>
        <div className="form-group mx-auto my-2">
          <label
            className="py-2"
            htmlFor="email"
            data-testid="email-label"
            aria-label="email label"
          >
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-label="email field"
            data-testid="email"
          />
        </div>
        <div className="form-group mx-auto my-2">
          <label
            className="py-2"
            htmlFor="comments"
            data-testid="comments-label"
            aria-label="comments label"
          >
            Comments
          </label>
          <textarea
            className="form-control"
            id="comments"
            rows="4"
            aria-label="comments field"
            data-testid="comments"
          ></textarea>
        </div>
        <div className="row form-group mx-auto mb-2">
          <input
            className="col btn btn-primary my-2 px-5"
            type="submit"
            name="submit"
            value="Submit"
            aria-label="submit"
            data-testid="submit"
          />
          <input
            className="col btn btn-secondary mx-1 my-2 px-5"
            type="reset"
            name="reset"
            value="Reset"
            aria-label="reset"
            data-testid="reset"
          />
        </div>
      </form>
    </div>
  );
}

export default Form;
