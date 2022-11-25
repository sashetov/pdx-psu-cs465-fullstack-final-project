import React from 'react';

// TODO: Implement contact form
function Form() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle submit here
  };

  return (
    <div className="container mx-auto my-auto text-center form">
      <form
        class="form w-50 mx-auto mt-5 p-3"
        method="GET"
        action="/formSubmit"
      >
        <h1 class="h1 mt-2 mb-4">Let's Connect!</h1>
        <div class="form-group mx-auto my-2">
          <label class="py-2" for="name">
            Name
          </label>
          <input type="text" class="form-control" id="name" required />
        </div>
        <div class="form-group mx-auto my-2">
          <label class="py-2" for="email">
            Email
          </label>
          <input type="email" class="form-control" id="email" required />
        </div>
        <div class="form-group mx-auto my-2">
          <label class="py-2" for="comments">
            Comments
          </label>
          <textarea class="form-control" id="comments" rows="4"></textarea>
        </div>
        <div class="row form-group mx-auto mb-2">
          <input
            class="col btn btn-primary my-2 px-5"
            type="submit"
            name="submit"
            value="Submit"
            onClick={handleSubmit}
          />
          <input
            class="col btn btn-secondary mx-1 my-2 px-5"
            type="reset"
            name="reset"
            value="Reset"
          />
        </div>
      </form>
    </div>
  );
}

export default Form;
