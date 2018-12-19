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
import Battle from"./dungeons/battle";

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
  handleInput = input => {
    this.setState({ [input.target.name]: input.target.value });
  };
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
  loadPlayer =(name,password)=>{
    const user = {
      username: name,
      password: password
    };  
    axios
      .post("https://dungeon-run.herokuapp.com/auth/login", user)
      .then(response => {
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        axios
        .get(`https://dungeon-run.herokuapp.com/players/${response.data.user._id}`)
        .then(response => {
          this.setState({
            player: response.data,
            name: "",
            password: "",
            id: response.data._id,
            redirect: true
          });
          })
        .catch(err => {
        });
  
      }).catch(err=>{
      })
  }
  renderRedirect = id => {
    if (this.state.redirect) {
      return <Redirect to={`/info/${id}`} />;
    }
  };
  bhbackground(){
    if(window.location.href !== "https://dungeon-run.netlify.com/create" && window.location.href !=="https://dungeon-run.netlify.com/"){
return"blackHeartBackground-styles"
    }
  }
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
          render={props => <BlackHeart {...props} player={this.state.player} />}
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
