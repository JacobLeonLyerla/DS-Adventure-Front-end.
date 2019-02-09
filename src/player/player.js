import React from "react";

import LoginForm from "../helpers/loginForm";

const Player = props => {
  return (
    <div className="loginbackground-styles">
      <br />

      <div className="title-styles">Dungeon Run</div>
      {/* Log in form for the player passes the data back to app.js */}
      <LoginForm
        {...props}
        handleInput={props.handleInput}
        findPlayer={props.findPlayer}
        loadPlayer={props.loadPlayer}
      />
    </div>
  );
};

export default Player;
