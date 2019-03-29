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

export function renderOpponent() {
  if (this.state.monster.idle !== undefined) {
    return (
      <Fragment>
        <div className="oppenent-styles">
          <img
            className={`${this.state.monster.rarity} monster-img`}
            src={
              this.state.battle === false
                ? require(`../assets/${this.state.monster.idle}.gif`)
                : require(`../assets/${this.state.monster.battle}.gif`)
            }
          />
        </div>
      </Fragment>
    );
  }
}

export function renderAdventurer() {
  if (this.state.player.idle !== undefined) {
    return (
      <Fragment>
        <div className="adventurer-styles">
          <img
            className={`${this.state.player.class} class-img`}
            src={
              this.state.battle === false
                ? require(`../assets/${this.state.player.idle}.gif`)
                : require(`../assets/${this.state.player.battle}.gif`)
            }
          />
        </div>
      </Fragment>
    );
  }
}

export function renderStats() {
  let currentpercent = Math.round(
    (this.state.tempMonHP /
      (this.state.monster.health +
        Math.round(
          (this.state.monster.health * this.state.player.level) / 30
        ))) *
      100
  );
  let currentPlayerhp = Math.round(
    (this.state.tempPlayer.health / this.state.player.health) * 100
  );
  let monsterend = Math.round(
    (this.state.tempMonster.endurance / this.state.monster.endurance) * 100
  );
  let playerend = Math.round(
    (this.state.tempPlayer.endurance / this.state.player.endurance) * 100
  );
  return (
    <Fragment>
      <div
        className={
          this.state.monster.rarity +
          "Stats-styles mid-battle progress-container"
        }
      >
        <div className="top-progress">
          <p>{this.state.monster.name}</p>
          <Progress color="success" value={currentpercent}>
            {" "}
            {`${this.state.tempMonHP}`}
          </Progress>

          <Progress color="info" value={monsterend}>
            {" "}
            {`${this.state.tempMonster.endurance}`}
          </Progress>
        </div>

        <div className="combatLog-styles">
          {this.state.tempPlayer.combat === "hit" ? (
            <div className="opponent-hit">{`${this.state.monster.name} ${
              this.state.tempPlayer.combat
            } with ${this.state.tempPlayer.spellUsed}`}</div>
          ) : (
            <div className="opponent-miss">{`${this.state.monster.name} ${
              this.state.tempPlayer.combat
            } with ${this.state.tempPlayer.spellUsed}`}</div>
          )}

          {this.state.tempMonster.combat === "hit" ? (
            <div className={"player-hit"}>{`${this.state.player.name} ${
              this.state.tempMonster.combat
            } with ${this.state.tempMonster.spellUsed}`}</div>
          ) : (
            <div className={"player-miss"}>{`${this.state.player.name} ${
              this.state.tempMonster.combat
            } with ${this.state.tempMonster.spellUsed}`}</div>
          )}
        </div>
        <div className="bottom-progress">
          <Progress color="info" value={playerend}>
            {" "}
            {`${this.state.tempPlayer.endurance}`}
          </Progress>

          <Progress color="success" value={currentPlayerhp}>
            {" "}
            {`${this.state.tempPlayer.health}`}
          </Progress>
          <p>{this.state.player.name}</p>
        </div>
      </div>
    </Fragment>
  );
}

export function adventurerAttacks() {
  let attack = { name: "" };
  if (this.state.attacks !== []) {
    attack = this.state.attacks[this.state.currentSpell];
    if (attack !== undefined) {
      return (
        <Fragment>
          <div
            className={this.state.monster.rarity + "Stats-styles mid-battle"}
          >
            <div className={`spell ${this.state.player.class}-spell`}>
              {attack.name}
            </div>

            <div>
              <div className="damage">
                Damage:{" "}
                {Math.round(
                  attack.damage +
                    10 * this.state.player.level +
                    this.state.player.strength / 1.5 +
                    this.state.player.intellect / 2.5 +
                    this.state.player.agility / 2
                )}
              </div>
              <div className="cost">
                Cost:{" "}
                {Math.round(
                  attack.cost * this.state.player.level -
                    this.state.player.intellect / 3 -
                    this.state.player.agility / 5 -
                    this.state.player.strength / 7
                )}
              </div>
            </div>
            <br />
            <br />
            <div className="centerSpell-styles">
              <i
                onClick={() => this.changeSpell("Left")}
                class="fas fa-long-arrow-alt-left"
              />
              <img
                onClick={() =>
                  this.startBattle(
                    attack.damage,
                    attack.cost,
                    attack.hitChance,
                    attack.name
                  )
                }
                className="attack-styles"
                src="https://d30y9cdsu7xlg0.cloudfront.net/png/12864-200.png"
              />
              <i
                onClick={() => this.changeSpell("Right")}
                class="fas fa-long-arrow-alt-right"
              />
            </div>
            <div style={{ color: "lightcoral" }}>Attack</div>

            <div>{attack.description}</div>
          </div>
        </Fragment>
      );
    }
  }
}

export function changeSpell(direction) {
  let spell = {};
  if (direction === "Right") {
    if (this.state.currentSpell + 1 < this.state.attacks.length) {
      spell.currentSpell = this.state.currentSpell + 1;
    } else {
      spell.currentSpell = 0;
    }
  } else {
    if (this.state.currentSpell - 1 !== -1) {
      spell.currentSpell = this.state.currentSpell - 1;
    } else {
      spell.currentSpell = this.state.attacks.length - 1;
    }
  }
  axios
    .put(
      `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`,
      spell
    )
    .then(response => {
      this.setState({ currentSpell: response.data.currentSpell });
    })
    .catch(err => {});
}

export function opponentAttacks() {
  return this.state.monster.attacks.map(attack => (
    <Fragment>
      <div className="opponentAttacks-styles">
        <div className="attackName-styles">{attack.name}</div>

        <div className="opponent-damage">
          Damage:{" "}
          {Math.round(
            attack.damage + (attack.damage * this.state.player.level) / 7
          )}
        </div>
        <div className="opponent-cost">Cost : {attack.cost}</div>
      </div>
    </Fragment>
  ));
}

export function renderOpponentStats() {
  if (this.state.monster.attacks !== []) {
    return (
      <Fragment>
        <div className={this.state.monster.rarity + "Stats-styles stats"}>
          <div className="portraitStats-styles">
            <div
              style={{ width: "80%" }}
              className={this.state.monster.rarity + "Rarity-styles"}
            >
              {this.state.monster.rarity}
            </div>
            <br />
            <div className="battleheader-styles">{this.state.monster.name}</div>

            <div>{`Health: ${this.state.tempMonHP} Endurance: ${
              this.state.tempMonster.endurance
            } `}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}
