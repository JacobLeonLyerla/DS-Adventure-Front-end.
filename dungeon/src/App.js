import React, { Component } from "react";
import { Route,Redirect } from "react-router-dom";
import axios from 'axios'
import "./App.css";

import Player from "./player/player";
import Create from "./player/createPlayer";
import Info from "./player/info";
class App extends Component {
     state = {
      players: undefined,
      player: undefined,
      name:'',
      password:'',
      redirect:false
    };
    componentDidMount(){
      this.setPlayer()
  }
    setPlayer =()=>{
      axios
      .get("http://localhost:5500/players")
      .then(response=>{
        console.log(response)
          this.setState({players:response.data})
      })
      .catch(err=>{
          console.log(err)
      })
  }
  handleInput = input =>{
      this.setState({[input.target.name]: input.target.value})
  }
  findPlayer = (name,pass)=>{
      this.state.players.forEach(player => {
          if(player.name.toLowerCase() === name.toLowerCase()){
            if(player.password.toLowerCase()=== pass.toLowerCase()){
              this.setState({player:player,name:"",password:"",redirect:true})

              return this.state.player
            }
          }
          else{
              return console.log("not found")
          }
      });
      
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/info'/>
    }
  }
  render() {
 
    return (
      <div className="App">
       {this.renderRedirect()}
        <Route exact path="/" render={props => <Player {...this.state} handleInput={this.handleInput} findPlayer={this.findPlayer} />} />
        <Route path="/create"
        render={props=> <Create  setPlayer={this.setPlayer}/>}
        />
        <Route
          path="/info"
          render={props => <Info player={this.state.player} />}
        />
      </div>
    );
  }
}

export default App;
