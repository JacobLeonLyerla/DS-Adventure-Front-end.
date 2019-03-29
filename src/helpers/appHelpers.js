  // pulls the player from the database ad sets it on the  state
  import axios from "axios";
  import React from "react";

  import { Redirect } from "react-router-dom";


  export function setPlayer ( reload ) {
    axios
      .get("https://dungeon-run.herokuapp.com/players")

      .then(response => {
        this.setState({ players: response.data });

        if (reload === "reload") {
          window.location.reload();
        }
      })
      .catch(() => {});
  };

// this uses the players name to find him in the data base
export function findPlayer (name, pass)  {
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
      }
    });
  };
  
  // loads the player frm the data base this route
  export function loadPlayer  (e, name, password)  {
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
          });
      });
  };

  // this renders a redirect if redirect is ever true
export function renderRedirect ( id ) {
    if (this.state.redirect) {
      return <Redirect to={`/info/${id}`} />;
    }
  };