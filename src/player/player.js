/*
try to break this code into helpers as much as possible

the form could be in a login form helper

remove the brake and convert that into margin in the css

*/

import React, { Component,  } from "react";

import LoginForm from "../helpers/loginForm"


class Player extends Component {
  render() {
    return (
    
        <div className="loginbackground-styles">
         <br/>

          <div className="title-styles">Dungeon Run</div>
          {/* Log in form for the player passes the data back to app.js */}
           <LoginForm    {...this.props}
              handleInput={this.props.handleInput}
              findPlayer={this.props.findPlayer}
              loadPlayer={this.props.loadPlayer}/>
        </div>
   
    );
  }
}

export default Player;
