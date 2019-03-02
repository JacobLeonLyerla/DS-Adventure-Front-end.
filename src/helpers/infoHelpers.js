import axios from "axios";
import React, { Fragment } from "react";

// take id from the  component did mount use it do grab the player from the database than
// set that data on state
export function setCurrentPlayer(id) {
  axios
    .get(`https://dungeon-run.herokuapp.com/players/${id}`)
    .then(response => {
      this.setState({ player: response.data, preview: response.data.idle });
    });
}

// this was going to allow people to edit player info, however it is not currently
// in the game because emplementing it was a bit wonky i'll try something a bit later
export function updatePlayer(id) {
  const player = {};
  if (this.state.name !== "") {
    player.name = this.state.name;
  }
  if (this.state.bio !== "") {
    player.bio = this.state.bio;
  }
  axios
    .put(`https://dungeon-run.herokuapp.com/players/${id}`, player)
    .then(() => {
      this.setState({
        name: "",
        bio: ""
      });
      this.setCurrentPlayer(id);
    });
}
export function handleClass(input) {
  if (this.state.class === "") {
    this.setState({ class: input });
  }
}
export function progressColor(value) {
  if (value > 70) {
    return "progress-high";
  } else if (value > 50) {
    return "progress-good";
  } else if (value > 30) {
    return "progress-mid";
  } else {
    return "progress-low";
  }
}
