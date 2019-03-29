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

  
  export function setTemps() {
    // we get the id from the player  on state
    let id = this.state.player._id;
    // setting up an object to post in
    let temp = {};
    // we post in the data we wwant to save inside of the temp collection
    temp.health = this.state.player.health;
    temp.endurance = this.state.player.endurance;
    // if the tempPlayer that is set to state is not defined than allow this to run,
    // we set it to undefined when we move rooms so if we are moving into a room and starting a battle
    // this should always be un defined

    axios
      .post(`https://dungeon-run.herokuapp.com/temps`, temp)
      .then(response => {
        temp = {};
        let id = response.data._id;
        temp.health = this.state.monster.health;
        temp.endurance = this.state.monster.endurance;
        axios
          .post(`https://dungeon-run.herokuapp.com/temps`, temp)
          .then(response => {
            temp = {};
            temp.tempPlayer = id;
            temp.tempMonster = response.data._id;
            axios
              .put(
                `https://dungeon-run.herokuapp.com/players/${
                  this.state.player._id
                }`,
                temp
              )
              .then(response => {
                this.setState({
                  player: response.data
                });

                this.fetchTemps();
              })
              .catch(err => {});
          })
          .catch(err => {});
      })
      .catch(err => {});
  }

  export function fetchTemps() {
    let id = this.state.player.tempPlayer;
    axios
      .get(`https://dungeon-run.herokuapp.com/temps/${id}`)
      .then(response => {
        this.setState({ tempPlayer: response.data });
      })
      .catch(err => {});
    id = this.state.player.tempMonster;
    if (this.state.player.tempMonster._id !== undefined) {
      id = this.state.player.tempMonster._id;
    }
    axios
      .get(`https://dungeon-run.herokuapp.com/temps/${id}`)
      .then(response => {
        let raisedhp = Math.round(
          response.data.health +
            (response.data.health * this.state.player.level) / 30
        );
        this.setState({ tempMonster: response.data, tempMonHP: raisedhp });
      })
      .catch(err => {});
  }

  
  export function startBattle(damage, cost, hitChance, name) {
    let change = () => {
      this.setState({ battle: false });
    };

    setTimeout(function() {
      change();
    }, 2270);
    this.setState({ battle: true });

    hitChance = Math.round(
      hitChance +
        this.state.player.agility * 1 +
        this.state.player.intellect * 0.5 +
        this.state.player.strength * 0.3 +
        (this.state.player.level - this.state.monster.level) * 10
    );
    let hit = Math.floor(Math.random() * Math.floor(100));
    let dmg = {};
    let id = this.state.player.tempMonster;
    if (this.state.player.tempMonster._id !== undefined) {
      id = this.state.player.tempMonster._id;
    }

    if (
      this.state.tempPlayer.endurance -
        Math.round(
          cost * this.state.player.level -
            this.state.player.intellect / 3 -
            this.state.player.agility / 5 -
            (this.state.player.strength / 7) * this.state.player.level
        ) >
      0
    ) {
      if (hit <= hitChance) {
        damage = Math.round(
          damage +
            10 * this.state.player.level +
            this.state.player.strength / 1.5 +
            this.state.player.intellect / 2.5 +
            this.state.player.agility / 2
        );

        dmg.combat = "hit";
        dmg.health = this.state.tempMonHP - damage;
      }
      if (hit > hitChance) {
        dmg.combat = "missed";
      }
    } else {
      dmg.combat = "out of endurance to cast";
    }
    dmg.attacked = true;
    dmg.spellUsed = name;
    axios
      .put(`https://dungeon-run.herokuapp.com/temps/${id}`, dmg)
      .then(response => {
        this.setState({
          tempMonster: response.data,
          tempMonHP: response.data.health
        });
        if (response.data.health <= 0) {
          this.death("Monster");
        }

        let id = this.state.player.tempPlayer;
        if (this.state.player.tempPlayer._id !== undefined) {
          id = this.state.player.tempPlayer._id;
        }

        let cast = {};
        if (
          this.state.tempPlayer.endurance -
            Math.round(
              cost * this.state.player.level -
                this.state.player.intellect / 3 -
                this.state.player.agility / 5 -
                this.state.player.strength / 7
            ) >
          0
        ) {
          cast.endurance =
            this.state.tempPlayer.endurance -
            Math.round(
              cost * this.state.player.level -
                this.state.player.intellect / 3 -
                this.state.player.agility / 5 -
                this.state.player.strength / 7
            );
        } else {
          cast.endurance = this.state.player.endurance;
        }
        axios
          .put(`https://dungeon-run.herokuapp.com/temps/${id}`, cast)
          .then(response => {
            this.setState({ tempPlayer: response.data });
            if (this.state.tempMonHP > 0) {
              this.attacked();
            }
          })
          .catch(err => {});
      })
      .catch(err => {});
  }