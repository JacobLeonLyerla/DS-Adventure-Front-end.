import React, { Component } from "react";

import { Route, Redirect } from "react-router-dom";

import axios from "axios";

import "./App.css";

import Player from "./player/player";

import Create from "./player/createPlayer";

import Info from "./player/info";

import Equip from "./player/equipment";

import DungeonList from "./dungeons/dungeonList";

import BlackHeart from "./dungeons/loadBHDungeon";

import Items from "./dungeons/items";

import Battle from "./dungeons/battle";
import {setPlayer,findPlayer,loadPlayer} from "./helpers/appHelpers";
import {handleInput} from "./helpers/commonHelpers";
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


  // this renders a redirect if redirect is ever true
  renderRedirect = id => {
    if (this.state.redirect) {
      return <Redirect to={`/info/${id}`} />;
    }
  };

  // this background is only loaded if it's not on either of those sites so if it's on another one than it will load,
  // it also loads on local host, because i have not cared enough to add local host in
  bhbackground() {
    if (
      window.location.href !== "https://dungeon-run.netlify.com/create" &&
      window.location.href !== "https://dungeon-run.netlify.com/"
    ) {
      return "blackHeartBackground-styles";
    }
  }

  // the render has all the routes contained in side of it.
  render() {
    this.setPlayer = setPlayer.bind(this);
    this.findPlayer = findPlayer.bind(this);
    this.loadPlayer = loadPlayer.bind(this);

    this.handleInput = handleInput.bind(this);
    return (
      <div className="App">
        {this.renderRedirect(this.state.id)}
        <Route
          exact
          path="/"
          render={props => (
            <Player
              {...this.state}
              handleInput={this.handleInput}
              findPlayer={this.findPlayer}
              loadPlayer={this.loadPlayer}
            />
          )}
        />

        <Route
          path="/create"
          render={props => <Create setPlayer={this.setPlayer} />}
        />

        <Route
          path="/info/:id"
          render={props => <Info {...props} player={this.state.player} />}
        />

        <Route
          path="/dungeons/:id"
          render={props => (
            <DungeonList {...props} player={this.state.player} />
          )}
        />

        <div className={this.bhbackground()}>
          <Route
            path="/blackheart/:id"
            render={props => (
              <BlackHeart {...props} player={this.state.player} />
            )}
          />

          <Route
            path="/blackheart/:id"
            render={props => <Items {...props} player={this.state.player} />}
          />

          <Route
            path="/battle/:id"
            render={props => <Battle {...props} player={this.state.player} />}
          />
          <Route
            path="/equip/:id"
            render={props => <Equip {...props} player={this.state.player} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
