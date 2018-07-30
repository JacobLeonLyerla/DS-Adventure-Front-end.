import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Equip extends Component {
  state = {
    player: { items: "", gear: "" },
    redirect: false,
    endurance: 0,
    health: 0,
    agility: 0,
    intellect: 0,
    strength: 0
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    this.setCurrItems(id);
  }
  setCurrItems = id => {
    axios
      .get(`http://localhost:5500/players/${id}`)
      .then(response => {
        this.setState({ player: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  

  renderRedirect = id => {
    if (this.state.redirect) {
      return <Redirect to={`/info/${id}`} />;
    }
  };
  setEquipment(id) {
    console.log(this.state.player.gear);

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // SET A EQUIPED FLAG ON GEAR SO IT ONLY EQUIPS ONCE,
    // SO WHEN YOU GET IT IT RUNS THIS COMPONENT
    // IT GOES THROUGH THE GEAR LIST
    // CHECKS FOR EVERYTHING WITH THE "EQUIPED" FLAG SET TO FALSE,
    // THEN SETS STATS, CHANGES FLAG TO TRUE  AND THEN WERE GOOD,
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    let strength = 0;
    let intellect = 0;
    let agility = 0;
    let health = 0;
    let endurance = 0;
    let gear={}
    for (let index = 0; index < this.state.player.gear.length; index++) {
      const piece = this.state.player.gear[index];
      if (piece.strength !== undefined) {
        strength = piece.strength;
      }
      if (piece.intellect !== undefined) {
        intellect = piece.intellect;
      }
      if (piece.agility !== undefined) {
        agility = piece.agility;
      }
      if (piece.health !== undefined) {
        health = piece.health;
      }
      if (piece.endurance !== undefined) {
        endurance = piece.endurance;
      }
    }
    gear.agility = agility + this.state.player.agility
    gear.endurance = endurance + this.state.player.endurance
    gear.health = health + this.state.player.health
    gear.intellect = intellect + this.state.player.intellect
    gear.strength = strength+ this.state.player.strength
    console.log(gear)
    axios
    .put(`http://localhost:5500/players/${id}`, gear)
    .then(response => {
        console.log(response)
      this.setState({
        redirect: true
      });
    })
    .catch(err => {
      console.log("not sent in");
    });
  }
  render() {
    console.log(this.state.player.gear);
    return (
      <Fragment>
        {this.setEquipment(this.state.player._id)}
        {this.renderRedirect(this.state.player._id)}
        Equpiping
      </Fragment>
    );
  }
}

export default Equip;
