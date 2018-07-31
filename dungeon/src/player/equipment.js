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
      .catch(err => {});
  };

  renderRedirect = id => {
    if (this.state.redirect) {
      return <Redirect to={`/info/${id}`} />;
    }
  };
  setEquippedBool(id) {
    let item = {};
    item.equipped = true;
    axios
      .put(`http://localhost:5500/items/${id}`, item)
      .then(response => {})
      .catch(err => {});
  }
  buildGear(piece) {
    let strength = 0;
    let intellect = 0;
    let agility = 0;
    let health = 0;
    let endurance = 0;
    let equipped;
    let gear = {};
    let itemSlot = eval(`this.state.player.${piece.slot}`);
    if (itemSlot === "none") {
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
      if (
        piece.slot === "shield" &&
        this.state.player.offHand === "none" &&
        this.state.player.charm === "none" &&
        this.state.player.weaponTwoHand === "none"
      ) {
        gear.shield = "Equipped";
        console.log("shield:", gear.shield);
      } else if (piece.slot === "head") {
        gear.head = "Equipped";
        console.log("head:", gear.head);
      } else if (piece.slot === "shoulders") {
        gear.shoulders = "Equipped";
        console.log("shoulders:", gear.shoulders);
      } else if (piece.slot === "chest") {
        gear.chest = "Equipped";
        console.log("chest:", gear.chest);
      } else if (piece.slot === "hands") {
        gear.hands = "Equipped";
        console.log("hands:", gear.hands);
      } else if (piece.slot === "feet") {
        gear.feet = "Equipped";
        console.log("feet:", gear.feet);
      } else if (piece.slot === "leggings") {
        gear.leggings = "Equipped";
        console.log("leggings:", gear.legginfs);
      } else if (piece.slot === "weaponOneHand") {
        gear.weaponOneHand = "Equipped";
        console.log("1h:", gear.weaponOneHand);
      } else if (
        piece.slot === "weaponTwoHand" &&
        this.state.player.shield === "none" &&
        this.state.player.weaponOneHand === "none" &&
        this.state.player.charm === "none" &&
        this.state.player.offHand === "none"
      ) {
        gear.WeapondTwoHand = "Equipped";
        console.log("2H:", gear.WeapondTwoHand);
      } else if (
        piece.slot === "charm" &&
        this.state.player.shield === "none" &&
        this.state.player.offHand === "none" &&
        this.state.player.weapondTwoHand === "none"
      ) {
        gear.charm = "Equipped";
        console.log("charm:", gear.charm);
      } else if (
        piece.slot === "offHand" &&
        this.state.player.charm === "none" &&
        this.state.player.shield === "none" &&
        this.state.player.weapondTwoHand === "none"
      ) {
        gear.offHand = "Equipped";
        console.log("OH:", gear.offHand);
      }
    }
    console.log("setting up stats");
    gear.agility = agility;
    gear.endurance = endurance;
    gear.health = health;
    gear.intellect = intellect;
    gear.strength = strength;

    console.log("returning gear object", gear);
    return gear;
  }
  setEquipment(id) {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // SET A EQUIPED FLAG ON GEAR SO IT ONLY EQUIPS ONCE,
    // SO WHEN YOU GET IT IT RUNS THIS COMPONENT
    // IT GOES THROUGH THE GEAR LIST
    // CHECKS FOR EVERYTHING WITH THE "EQUIPED" FLAG SET TO FALSE,
    // THEN SETS STATS, CHANGES FLAG TO TRUE  AND THEN WERE GOOD,
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    let gear = {
      agility: this.state.player.agility,
      endurance: this.state.player.endurance,
      health: this.state.player.health,
      intellect: this.state.player.intellect,
      strength: this.state.player.strength
    };
    for (let index = 0; index < this.state.player.gear.length; index++) {
      const piece = this.state.player.gear[index];
      let update = this.buildGear(piece);
      console.log(update.health);
      gear.agility += update.agility;
      gear.endurance += update.endurance;
      gear.health += update.health;
      gear.intellect += update.intellect;
      gear.strength += update.strength;
      if (update.head !== "none" && update.head !== undefined) {
        gear.head = "Equipped";
      }
      if (update.shoulders !== "none" && update.shoulders !== undefined) {
        gear.shoulders = "Equipped";
      }
      if (update.chest !== "none" && update.chest !== undefined) {
        gear.chest = "Equipped";
      }
      if (update.hands !== "none" && update.hands !== undefined) {
        gear.hands = "Equipped";
      }
      if (update.leggings !== "none" && update.leggings !== undefined) {
        gear.leggings = "Equipped";
      }
      if (update.feer !== "none" && update.feet !== undefined) {
        gear.feet = "Equipped";
      }
      if (
        update.WeapondTwoHand !== "none" &&
        update.weapondTwoHand !== undefined
      ) {
        gear.weapondTwoHand = "Equipped";
      }
      if (
        update.weaponOneHand !== "none" &&
        update.weaponOneHand !== undefined
      ) {
        gear.weaponOneHand = "Equipped";
      }
      if (update.charm !== "none" && update.charm !== undefined) {
        gear.charm = "Equipped";
      }
      if (update.shield !== "none" && update.shield !== undefined) {
        gear.shield = "Equipped";
      }
      if (update.offHand !== "none" && update.offHand !== undefined) {
        gear.offHand = "Equipped";
      }
    }
    console.log(gear);
    this.equipmentAdd(gear, id);
  }
  equipmentAdd(gear, id) {
    axios
      .put(`http://localhost:5500/players/${id}`, gear)
      .then(response => {
        console.log(this.state.player);
        this.setState({
          redirect: true
        });
      })
      .catch(err => {});
  }
  render() {
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
