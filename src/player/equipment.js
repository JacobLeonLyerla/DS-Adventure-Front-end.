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
      .get(`https://dungeon-run.herokuapp.com/players/${id}`)
      .then(response => {
        this.setState({ player: response.data });
      })
      .catch(err => {});
  };

  renderRedirect = id => {
    if (this.state.redirect) {
      return <Redirect to={`/blackheart/${id}`} />;
    }
  };
  setEquippedBool(id) {
    let item = {};
    item.equipped = true;
    axios
      .put(`https://dungeon-run.herokuapp.com/items/${id}`, item)
      .then(response => {})
      .catch(err => {});
  }
 

  buildGear(piece) {
     console.log(piece.slot)
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
      } else if (piece.slot === "head") {
        gear.head = "Equipped";
      } else if (piece.slot === "shoulders") {
        gear.shoulders = "Equipped";
      } else if (piece.slot === "chest") {
        gear.chest = "Equipped";
      } else if (piece.slot === "hands") {
        gear.hands = "Equipped";
      } else if (piece.slot === "feet") {
        gear.feet = "Equipped";
      } else if (piece.slot === "leggings") {
        gear.leggings = "Equipped";
      } else if (piece.slot === "weaponOneHand" &&
        this.state.player.weaponTwoHand === "none") {
        gear.weaponOneHand = "Equipped";
      } else if (
        piece.slot === "weaponTwoHand" &&
        this.state.player.shield === "none" &&
        this.state.player.weaponOneHand === "none" &&
        this.state.player.charm === "none" &&
        this.state.player.offHand === "none"
      ) {
        gear.WeapondTwoHand = "Equipped";
      } else if (
        piece.slot === "charm" &&
        this.state.player.shield === "none" &&
        this.state.player.offHand === "none" &&
        this.state.player.weaponTwoHand === "none"
      ) {
        gear.charm = "Equipped";
      } else if (
        piece.slot === "offHand" &&
        this.state.player.charm === "none" &&
        this.state.player.shield === "none" &&
        this.state.player.weaponTwoHand === "none"
      ) {
        gear.offHand = "Equipped";
      }
    }
    gear.agility = agility;
    gear.endurance = endurance;
    gear.health = health;
    gear.intellect = intellect;
    gear.strength = strength;

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
      if (update.feet !== "none" && update.feet !== undefined) {
        gear.feet = "Equipped";
      }
      if (
        update.weaponTwoHand !== "none" &&
        update.weaponTwoHand !== undefined
      ) {
        gear.weaponTwoHand = "Equipped";
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
    this.equipmentAdd(gear, id);
  }
  equipmentAdd(gear, id) {
    axios
      .put(`https://dungeon-run.herokuapp.com/players/${id}`, gear)
      .then(response => {
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
        Equipping Items
      </Fragment>
    );
  }
}

export default Equip;
