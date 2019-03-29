import React, { Fragment } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
// import paladin from "./img/paladinportrait.png";
import rogue from "../assets/rogueportrait.jpg";
import mage from "../assets/mageportrait.png";
import warrior from "../assets/warriorportrait.png";
import ranger from "../assets/rangerportrait.png";
import necro from "../assets/necromancerportrait.jpg";

import { Progress } from "reactstrap";

export function currentPlayer ( id ) {
    axios
      .get(`https://dungeon-run.herokuapp.com/players/${id}`)
      .then(response => {
        this.setState({
          player: response.data,
          attacks: response.data.attacks,
          currentLocation: response.data.currentLocation._id
        });
        id = this.state.player.currentBattle[0]._id;

        axios
          .get(`https://dungeon-run.herokuapp.com/monsters/${id}`)
          .then(response => {
            this.setState({
              monster: response.data,
              monsterAttacks: response.data.attacks
            });
            if (this.state.player.tempPlayer === "no temp") {
              this.setTemps();
            } else {
              this.fetchTemps();
            }
          });
      })
      .catch(err => {});
  };
