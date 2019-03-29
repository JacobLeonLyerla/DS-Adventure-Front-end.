import React, { Component } from "react";

import "./App.css";


import {routes} from "./helpers/appRoutes";
import {
  setPlayer,
  findPlayer,
  loadPlayer,
  renderRedirect,
  bhbackground,
} from "./helpers/appHelpers";
import { handleInput } from "./helpers/commonHelpers";
class App extends Component {
  state = {
    players: undefined,

    player: undefined,

    id: 0,

    name: "",

    password: "",

    redirect: false
  };

  componentDidMount() {
    this.setPlayer();
  }

  // the render has all the routes contained in side of it.
  render() {
    this.setPlayer = setPlayer.bind(this);
    this.findPlayer = findPlayer.bind(this);
    this.loadPlayer = loadPlayer.bind(this);
    this.renderRedirect = renderRedirect.bind(this);
    this.bhbackground = bhbackground
    this.routes = routes.bind(this)
    this.handleInput = handleInput.bind(this);

    return (
      <div className="App">
        {this.renderRedirect(this.state.id)}
      {this.routes()}
      </div>
    );
  }
}

export default App;
