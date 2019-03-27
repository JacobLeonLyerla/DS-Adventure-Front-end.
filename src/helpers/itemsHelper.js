import React, { Fragment } from "react";
import { Progress } from "reactstrap";

import axios from "axios";
import paladin from "../assets/paladin.jpg";

import rogue from "../assets/rogue.jpg";

import mage from "../assets/mage.png";

import warrior from "../assets/warrior.png";

import ranger from "../assets/ranger.png";

import necro from "../assets/necro.jpg";

export function currentRoom(id) {
  axios
    .get(`https://dungeon-run.herokuapp.com/blackheart/${id}`)
    .then(response => {
      this.setState({ area: response.data });
      let roomLoot = {};
      let roomFilter = this.state.area.items.filter(item => {
        let failed = false;
        let secondfailed = false;
        this.state.player.items.forEach(playerItem => {
          if (playerItem._id !== item._id) {
            return;
          } else {
            return (failed = true);
          }
        });
        this.state.player.gear.forEach(InventoryItem => {
          if (InventoryItem._id !== item._id) {
            return;
          } else {
            return (secondfailed = true);
          }
        });

        return failed === false && secondfailed === false;
      });

      roomLoot.items = roomFilter;
      this.setState({ area: { items: roomLoot.items } });
    });
}
export function currentPlayer(id) {
  axios
    .get(`https://dungeon-run.herokuapp.com/players/${id}`)
    .then(response => {
      this.setState({ player: response.data });
      this.currentRoom(this.state.player.currentLocation._id);
    });
}

export function deleteItem(type, loot) {
  console.log(loot, type);
  let items = {};
  switch (type) {
    case "Loot":
      items.items = [];

      this.state.player.items.push(loot._id);

      items.items = this.state.player.items;

      axios
        .put(
          `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`,
          items
        )
        .then(() => {
          axios
            .get(
              `https://dungeon-run.herokuapp.com/players/${
                this.state.player._id
              }`
            )
            .then(response => {
              this.setState({ player: response.data });
              this.currentRoom(this.state.player.currentLocation._id);
            });
        });

      break;
    case "Inventory":
    case "Equip":
      if (type === "Inventory") {
        items.items = this.state.player.items.filter(
          item => item._id !== loot._id
        );

        this.state.player.gear.push(loot._id);

        items.gear = this.state.player.gear;

        items.items = this.state.player.items;

        items[loot.slot] = "Equipped";

        items.health = this.state.player.health += loot.health;

        items.endurance = this.state.player.endurance += loot.endurance;

        items.intellect = this.state.player.intellect += loot.intellect;

        items.strength = this.state.player.strength += loot.strength;

        items.agility = this.state.player.agility += loot.agility;
      } else if (type === "Equip") {
        items.gear = this.state.player.gear.filter(
          item => item._id !== loot._id
        );
        this.state.player.items.push(loot._id);

        items.items = this.state.player.items;
      }
      break;
    case "Drop Item":
      items.items = this.state.player.items.filter(
        item => item._id !== loot._id
      );
      break;

    default:
      break;
  }

  axios
    .put(
      `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`,
      items
    )

    .then(response => {
      axios
        .get(
          `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`
        )

        .then(response => {
          this.setState({ player: response.data });
          this.currentRoom(this.state.player.currentLocation._id);
        })

        .catch(err => {});
      if (type === "Equip") {
        this.removeEquipment(loot);
      }

      //window.location.reload();
    });
}

export function removeEquipment(item) {
  let itemSlot = eval(`this.state.player.${item.slot}`);

  if (itemSlot === "Equipped") {
    let player = {};
    let strength,
      intellect,
      health,
      endurance,
      agility = 0;
    switch (item.slot) {
      case "shield":
        player.shield = "none";

        break;
      case "head":
        player.head = "none";

        break;
      case "shoulders":
        player.shoulders = "none";

        break;
      case "feet":
        player.feet = "none";

        break;
      case "hands":
        player.hands = "none";

        break;
      case "chest":
        player.chest = "none";

        break;
      case "leggings":
        player.leggings = "none";

        break;
      case "charm":
        player.charm = "none";

        break;
      case "offHand":
        player.offHand = "none";

        break;
      case "weaponTwoHand":
        player.weaponTwoHand = "none";

        break;
      case "weaponOneHand":
        player.weaponOneHand = "none";

        break;
      default:
        break;
    }

    if (item.strength > 0) {
      strength = item.strength;

      player.strength = this.state.player.strength - strength;
    }

    if (item.intellect > 0) {
      intellect = item.intellect;

      player.intellect = this.state.player.intellect - intellect;
    }

    if (item.health > 0) {
      health = item.health;

      player.health = this.state.player.health - health;
    }
    if (item.agility > 0) {
      agility = item.agility;

      player.agility = this.state.player.agility - agility;
    }
    if (item.endurance > 0) {
      endurance = item.endurance;

      player.endurance = this.state.player.endurance - endurance;
    }

    axios
      .put(
        `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`,

        player
      )
      .then(() => {
        axios
          .get(
            `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`
          )

          .then(response => {
            this.setState({ player: response.data });
            this.currentRoom(this.state.player.currentLocation._id);
          });
      });
  } else {
  }
}

export function classIcon(classname) {
  if (classname === "Paladin") return paladin;

  if (classname === "Ranger") return ranger;

  if (classname === "Mage") return mage;

  if (classname === "Necromancer") return necro;

  if (classname === "Warrior") return warrior;

  if (classname === "Rogue") return rogue;
}

export function checkDuplicate(type, loot) {
  let dup = false;

  if (type === "Inventory") {
    this.state.player.gear.forEach(curItem => {
      if (curItem.slot === loot.slot) {
        dup = true;
      }
      if (loot.slot === "shield") {
        if (
          curItem.slot === "offHand" ||
          curItem.slot === "weaponTwoHand" ||
          curItem.slot === "charm"
        ) {
          dup = true;
        }
      }

      if (loot.slot === "offHand") {
        if (
          curItem.slot === "shield" ||
          curItem.slot === "weaponTwoHand" ||
          curItem.slot === "charm"
        ) {
          dup = true;
        }
      }

      if (loot.slot === "weaponTwoHand") {
        if (
          curItem.slot === "offHand" ||
          curItem.slot === "shield" ||
          curItem.slot === "charm"
        ) {
          dup = true;
        }
      }

      if (loot.slot === "charm") {
        if (
          curItem.slot === "offHand" ||
          curItem.slot === "weaponTwoHand" ||
          curItem.slot === "shield"
        ) {
          dup = true;
        }
      }

      if (loot.slot === "weaponTwoHand" && curItem.slot === "weaponOneHand") {
        dup = true;
      }

      if (
        curItem.slot === "weaponOneHand" &&
        curItem.slot === "weaponTwoHand"
      ) {
        dup = true;
      }
    });
  }

  if (dup === false) {
    this.deleteItem(type, loot);
  } else {
    if (
      loot.slot === "shield" ||
      loot.slot === "offHand" ||
      loot.slot === "charm"
    ) {
      return alert(
        "offHand, Shields and Charms all count as secondary weapons. you can only have one, and only if you don't have a Two Handed Weapon"
      );
    } else {
      return alert(`You cannot add another ${loot.slot} to your equipment`);
    }
  }
}

export function prgoressColor(value) {
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

export function renderEquipment() {
  if (this.state.player.name !== undefined && this.state.player.name !== "") {
    return this.state.player.gear.map(item => {
      let total =
        item.health +
        item.endurance +
        item.intellect +
        item.strength +
        item.agility;

      return (
        <Fragment>
          <div
            className={`${item.rarity}itemCard-styles itemCard-styles ${
              this.state.player[item.slot] === "none" ? "not-equipped" : ""
            }`}
          >
            <div className="move-styles">
              <div
                className="add-styles
      "
                onClick={() => this.checkDuplicate("Equip", item)}
              >
                <i class="fas fa-level-down-alt" />
              </div>
            </div>
            <div className="equip-Message">
              {this.state.player[item.slot] === "none" ? (
                <div>Not Equipped</div>
              ) : (
                ""
              )}
            </div>

            <div className="header-card">{item.name}</div>
            {/* style={{fontFamily:" Arial, Helvetica, sans-serif"}} */}

            <div
              style={{
                fontFamily: " Arial, Helvetica, sans-serif"
              }}
            >
              {item.slot}
            </div>

            <div className={"progress-container"}>
              <br />

              {(item.health * 2) / 5 > 0 ? (
                <Fragment>
                  <div className="text-left">Health</div>
                  <Progress
                    className={this.prgoressColor(
                      Math.round((item.health / total) * 100)
                    )}
                    style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                    value={Math.round((item.health / total) * 100)}
                  >
                    {item.health}
                  </Progress>
                </Fragment>
              ) : null}

              {(item.endurance * 2) / 5 > 0 ? (
                <Fragment>
                  <div className="text-left">Endurance</div>
                  <Progress
                    className={this.prgoressColor(
                      Math.round((item.endurance / total) * 100)
                    )}
                    style={{
                      fontFamily: " Arial, Helvetica, sans-serif"
                    }}
                    value={Math.round((item.endurance / total) * 100)}
                  >
                    {item.endurance}
                  </Progress>
                </Fragment>
              ) : null}

              {(item.intellect * 2) / 5 > 0 ? (
                <Fragment>
                  <div className="text-left">Intellect</div>
                  <Progress
                    className={this.prgoressColor(
                      Math.round((item.intellect / total) * 100)
                    )}
                    style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                    value={Math.round((item.intellect / total) * 100)}
                  >
                    {item.intellect}
                  </Progress>
                </Fragment>
              ) : (
                <Fragment />
              )}

              {(item.strength * 2) / 5 > 0 ? (
                <Fragment>
                  <div className="text-left">Strength</div>
                  <Progress
                    className={this.prgoressColor(
                      Math.round((item.strength / total) * 100)
                    )}
                    style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                    value={Math.round((item.strength / total) * 100)}
                  >
                    {item.strength}
                  </Progress>
                </Fragment>
              ) : (
                <Fragment />
              )}

              {(item.agility * 2) / 5 > 0 ? (
                <Fragment>
                  <div className="text-left">Agility</div>
                  <Progress
                    className={this.prgoressColor(
                      Math.round((item.agility / total) * 100)
                    )}
                    style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                    value={Math.round((item.agility / total) * 100)}
                  >
                    {item.agility}
                  </Progress>
                </Fragment>
              ) : (
                <Fragment />
              )}
            </div>
            <div className={`${item.rarity}Footer-styles footer`}>
              {item.rarity}
            </div>
          </div>
          <br />
        </Fragment>
      );
    });
  }
}
