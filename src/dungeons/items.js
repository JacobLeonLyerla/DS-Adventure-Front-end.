import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import paladin from "./img/paladin.jpg";
import rogue from "./img/rogue.jpg";
import mage from "./img/mage.jpg";
import warrior from "./img/warrior.jpg";
import ranger from "./img/ranger.jpg";
import necro from "./img/necro.jpg";
class Items extends Component {
  state = {
    player: { gear: [{ name: "" }], items: [{ name: "" }] },
    area: { items: [] }
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
  }
  currentRoom = id => {
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
  };
  currentPlayer = id => {
    axios
      .get(`https://dungeon-run.herokuapp.com/players/${id}`)
      .then(response => {
        this.setState({ player: response.data });
        this.currentRoom(this.state.player.currentLocation._id);
      })
      .catch(err => {});
  };

  deleteItem(type, loot) {
    let items = {};
    switch (type) {
      case "Loot":
        items.items = [];
        this.state.player.items.push(loot._id);

        items.items = this.state.player.items;
        axios
          .put(
            `https://dungeon-run.herokuapp.com/players/${
              this.state.player._id
            }`,
            items
          )
          .then(response => {
            axios
              .get(
                `https://dungeon-run.herokuapp.com/players/${
                  this.state.player._id
                }`
              )
              .then(response => {
                this.setState({ player: response.data });
                this.currentRoom(this.state.player.currentLocation._id);
              })
              .catch(err => {});
          })
          .catch(err => {});
        break;
      case "Inventory":
      case "Equip":
        if (type === "Inventory") {
          items.items = this.state.player.items.filter(
            item => item._id !== loot._id
          );

          this.state.player.gear.push(loot._id);

          items.gear = this.state.player.gear;
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
      })
      .catch(err => {});
  }
  removeEquipment(item) {
    let items = {};
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
        .then(response => {
          axios
            .get(
              `https://dungeon-run.herokuapp.com/players/${
                this.state.player._id
              }`
            )
            .then(response => {
              this.setState({ player: response.data });
              this.currentRoom(this.state.player.currentLocation._id);
            })
            .catch(err => {});
          //window.location.reload();
        })
        .catch(err => {});
    } else {
    }
  }

  classIcon(classname) {
    if (classname === "Paladin") return paladin;
    if (classname === "Ranger") return ranger;
    if (classname === "Mage") return mage;
    if (classname === "Necromancer") return necro;
    if (classname === "Warrior") return warrior;
    if (classname === "Rogue") return rogue;
  }
  checkDuplicate(type, loot) {
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
  renderEquipment() {
    if (this.state.player.name !== undefined && this.state.player.name !== "") {
      return this.state.player.gear.map(item => (
        <Fragment>
          <div className={`${item.rarity}itemCard-styles itemCard-styles`}>
            <div className="move-styles">
              <div
                className="add-styles
      "
                onClick={() => this.checkDuplicate("Equip", item)}
              >
                <i class="fas fa-level-down-alt" />
              </div>
            </div>
            <div className="header-card">{item.name}</div>
           
            <br />
            {item.slot}
            <br />
            {` Health: ${item.health} Endurance: ${item.endurance}`}
            <br />
            {` Intellect: ${item.intellect} Strength: ${item.strength}`}
            <br />
            {` Agility: ${item.agility}`}
            <br />
            <br />
            <div className={`${item.rarity}Footer-styles footer`}> {item.rarity}</div>
          </div>
          <br />
        </Fragment>
      ));
    }
  }
  renderItems() {
    if (this.state.player.name !== undefined && this.state.player.name !== "") {
      return this.state.player.items.map(item => (
        <Fragment>
          <div className={`${item.rarity}itemCard-styles itemCard-styles`}>
            <div className="move-styles">
              <div
                className="add-styles
      "
                onClick={() => this.checkDuplicate("Inventory", item)}
              >
                <i class="fas fa-level-up-alt" />
              </div>

              <div
                className="drop-styles"
                onClick={() => this.deleteItem("Drop Item", item)}
              >
                <i class="far fa-times-circle" />
              </div>
            </div>
            <div>{item.name}</div>
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            <br />
            {item.slot}
            <br />
            {` Health: ${item.health} Endurance: ${item.endurance}`}
            <br />
            {` Intellect: ${item.intellect} Strength: ${item.strength}`}
            <br />
            {` Agility: ${item.agility}`}
            <br />
            <br />
            <div className={`${item.rarity}Footer-styles`}> {item.rarity}</div>
          </div>
        </Fragment>
      ));
    }
  }

  render() {
    return (
      <Fragment>
        <div className="bigItemHeader-styles">Items in room</div>
        <div className="Items">
          <br />
          <br />

          {this.state.area.items.map(item => (
            <Fragment>
              <div className={`${item.rarity}itemCard-styles itemCard-styles`}>
                <div
                  className="delete-styles"
                  onClick={() => this.deleteItem("Loot", item)}
                >
                  <i class="far fa-hand-paper" />
                </div>
                <div>{item.name}</div>
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                <br />
                {item.slot}
                <br />
                {` Health: ${item.health} Endurance: ${item.endurance}`}
                <br />
                {` Intellect: ${item.intellect} Strength: ${item.strength}`}
                <br />
                {` Agility: ${item.agility}`}
                <br />
                <br />
                <div className={`${item.rarity}Footer-styles`}>
                  {" "}
                  {item.rarity}
                </div>
              </div>
              <br />
            </Fragment>
          ))}
        </div>
        <div className="class-styles">
          <img
            className={"classIcon-styles"}
            src={this.classIcon(this.state.player.class)}
          />
          <br />
          {this.state.player.name}
          <br />
          Level: {this.state.player.level}
          <br />
          {` Health: ${this.state.player.health} Endurance: ${
            this.state.player.endurance
          }`}
          <br />
          {`Strength: ${this.state.player.strength} Agility: ${
            this.state.player.agility
          } Intellect: ${this.state.player.intellect}`}
        </div>

        <div className={"bigItemHeader-styles"}>Items in equipped</div>

        <div className="Items">{this.renderEquipment()}</div>
        <Link to={`/equip/${this.state.player._id}`}>
          <button className="btn equip-hero">equip hero</button>
        </Link>

        <div className={"bigItemHeader-styles"}>Items in inventory</div>
        <div className="Items">
          <br />
          <br />

          {this.renderItems()}
        </div>
      </Fragment>
    );
  }
}

export default Items;
