import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import Board from './Board';
import Splash from './Splash';
import { socket } from './socket';
 
//
export default class Container extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      gameId: null,
      gameData: null,
      connected: false,
      playerName: null,
      joined:  false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    socket.on("connected", data => {
      console.log("Connected:  " + socket.connected);
      this.setState({ connected: true });
      console.log(data);
    });
  }

  handleChange (event) {
    event.preventDefault();
   // this.setState({playerName:"Test"});
    console.log(this.state);
  }
  handleSubmit(event) {
    event.preventDefault();
    const { value } = event.target;
    this.setState({playerName:value});
    console.log(event.target.name);
    console.log("Is this firing?"); 
  }

  render() {
    return (
      <div>
        <Banner />
        {this.state.connected ? 
            <Board socket={socket} />
          : <div>
              <form
                id="player"
                class="form w-50 mx-auto mt-5 p-3"
                method="get"
                onSubmit={this.handleSubmit}>
                <div class="form-group mx-auto my-2">
                  <label class="py-2" for="name">
                    Please enter player name:
                  </label>
                  <input type="text" class="form-control" onChange={this.handleChange} id="name" />
                </div>
                <div class="row form-group mx-auto mb-2">
                  <button
                    class="col btn btn-primary my-2 px-5"
                    type="submit"
                    name="submit"
                    value="Play"
                  />
                  <button
                    class="col btn btn-secondary mx-1 my-2 px-5"
                    type="reset"
                    name="reset"
                    value="Reset"
                  />
                </div>
              </form>
            </div>
        }  
      </div>
  );
}
}
