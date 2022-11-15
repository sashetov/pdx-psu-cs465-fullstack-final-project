import React from 'react';
class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }


  
  handleChange(event) {
    console.log(event.target);
  }

  
  

  render() {
    return (
      <div>
        <form
          id="player"
          class="form w-50 mx-auto mt-5 p-3"
          method="get"
          onSubmit={this.handleSubmit}
        >
          <div class="form-group mx-auto my-2">
            <label class="py-2" for="name">
              Please enter player name:
            </label>
            <input type="text" class="form-control" onChange={this.handleChange} id="name" />
          </div>
          <div class="row form-group mx-auto mb-2">
            <input
              class="col btn btn-primary my-2 px-5"
              type="submit"
              name="submit"
              value="Play"
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
}

export default Splash;
