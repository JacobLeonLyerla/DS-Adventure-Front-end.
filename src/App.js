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
  // pulls the player from the database ad sets it on the  state
  setPlayer = reload => {
    axios
      .get("https://dungeon-run.herokuapp.com/players")
      .then(response => {
        this.setState({ players: response.data });
        if (reload === "reload") {
          window.location.reload();
        }
      })
      .catch(err => {});
  };
  // this takes the event in this case it's the onChange of the input field and setsi t on state
  handleInput = input => {
    this.setState({ [input.target.name]: input.target.value });
  };
  // this uses the players name to find him in the data base
  findPlayer = (name, pass) => {
    this.state.players.forEach(player => {
      if (player.name.toLowerCase() === name.toLowerCase()) {
        if (player.password.toLowerCase() === pass.toLowerCase()) {
          this.setState({
            player: player,
            name: "",
            password: "",
            id: player._id,
            redirect: true
          });

          return this.state.player;
        }
      } else {
      }
    });
  };
  // loads the player frm the data base this route
  loadPlayer = (e,name, password) => {
    e.preventDefault();
    const user = {
      username: name,
      password: password
    };
    axios
      .post("https://dungeon-run.herokuapp.com/auth/login", user)
      .then(response => {
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        axios
          .get(
            `https://dungeon-run.herokuapp.com/players/${
              response.data.user._id
            }`
          )
          .then(response => {
            this.setState({
              player: response.data,
              name: "",
              password: "",
              id: response.data._id,
              redirect: true
            });
          })
          .catch(err => {});
      })
      .catch(err => {});
  };
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
