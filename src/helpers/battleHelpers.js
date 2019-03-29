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

export function currentPlayer(id) {
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
}

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

export function attacked() {
  if (this.state.tempMonster.attacked === true) {
    let id = this.state.player.tempMonster;
    if (this.state.player.tempMonster._id !== undefined) {
      id = this.state.player.tempMonster._id;
    }
    let damage = this.state.monsterAttacks.filter(attack => {
      let index = Math.floor(
        Math.random() * Math.floor(this.state.monsterAttacks.length)
      );

      return attack === this.state.monsterAttacks[index];
    });

    let attack = {};

    attack.attacked = false;
    let remainingEnd = this.state.tempMonster.endurance - damage[0].cost;
    if (this.state.tempMonster.endurance - damage[0].cost > 0) {
      attack.endurance = this.state.tempMonster.endurance - damage[0].cost;
    } else {
      attack.endurance = this.state.monster.level * 75;
    }
    axios
      .put(`https://dungeon-run.herokuapp.com/temps/${id}`, attack)
      .then(response => {
        this.setState({ tempMonster: response.data });
        let id = this.state.player.tempPlayer;
        if (this.state.player.tempPlayer._id !== undefined) {
          id = this.state.player.tempPlayer._id;
        }
        let hit = Math.floor(Math.random() * Math.floor(100));

        let dmg = {};
        if (remainingEnd > 0) {
          if (hit <= damage[0].hitChance * 2 + this.state.monster.level) {
            dmg.health =
              this.state.tempPlayer.health -
              Math.round(
                damage[0].damage +
                  (damage[0].damage * this.state.player.level) / 7
              );
            dmg.combat = "hit";
          } else {
            dmg.combat = "missed";
          }
        } else {
          dmg.combat = "out of endurance to cast";
        }
        dmg.spellUsed = damage[0].name;
        axios
          .put(`https://dungeon-run.herokuapp.com/temps/${id}`, dmg)
          .then(response => {
            this.setState({ tempPlayer: response.data });
            if (response.data.health <= 0) {
              this.death("Player");
            }
            //window.location.reload();
          })
          .catch(err => {});
      })
      .catch(err => {});
  }
}

export function death(died) {
  if (died === "Player") {
    let fail = {};
    fail.defeatedName = this.state.monster.name;
    fail.experienceGained = 0;
    fail.itemWon = "lost";
    fail.currentLocation = "5b60093b9a47813e2cdd30d1";
    axios
      .put(
        `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`,
        fail
      )
      .then(response => {
        this.setState({
          currentlocation: response.data.currentlocation,
          redirect: true
        });
      });
  } else {
    //this selects a random index for an item in the monsters bag
    let index = Math.floor(
      Math.random() * Math.floor(this.state.monster.items.length)
    );
    // this basically takes the item at the random index we got above and sets that into a variable
    let item = this.state.monster.items[index];
    // sets a flag for adding the item into the index that i can use later
    let add = true;
    this.state.player.items.forEach(inventory => {
      // this makes sure i don't alrady have the item, so if this is ever true than the add flag gets swapped and the item is not added,
      // this stops bags from being full of duplicates a major issues in earlier builds
      if (item._id === inventory) {
        add = false;
      }
    });
    // this is saying if the player is above this level no longer add items of that rarity to their bags,
    // this helps from getting bags full of junk, i may remove this if i decide to add in a vendor into the game.
    if (this.state.player.level > 5 && item.rarity === "common") {
      add = false;
    }
    if (this.state.player.level > 10 && item.rarity === "uncommon") {
      add = false;
    }
    // so if the add flag is still set to true after all of that  than add the item
    if (add === true) {
      this.state.player.items.push(this.state.monster.items[index]);
    }
    let playerlevel = this.state.player.level;
    let victory = {};
    if (
      this.state.player.experience + this.state.monster.experience >=
      playerlevel * 1000
    ) {
      victory.level = playerlevel + 1;
      victory.leveled = true;
      victory.health = this.state.player.health + playerlevel + 1 * 200;
      victory.endurance = this.state.player.endurance + playerlevel + 1 * 200;
    }

    let myItems = this.state.player.items;

    victory.defeatedName = this.state.monster.name;
    victory.experienceGained = this.state.monster.experience;
    victory.itemWon = item.name;
    victory.items = myItems;
    victory.experience =
      this.state.player.experience + this.state.monster.experience;

    axios
      .put(
        `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`,
        victory
      )
      .then(response => {
        this.setState({
          currentlocation: response.data.currentlocation,
          redirect: true
        });
      });
  }
}
