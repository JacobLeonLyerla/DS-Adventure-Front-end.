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
    player: { gear: [{name:""}], items: [{name:""}] },
    area: { items: [] }
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
  }
  currentRoom = id => {
    axios
      .get(`http://localhost:5500/blackheart/${id}`)
      .then(response => {
        this.setState({ area: response.data });
      })
      .catch(err => {});
  };
  currentPlayer = id => {
    axios
      .get(`http://localhost:5500/players/${id}`)
      .then(response => {
        this.setState({ player: response.data });
        this.currentRoom(this.state.player.currentLocation._id);
      })
      .catch(err => {});
  };

  deleteItem(type, loot) {
    let items = {};
    if (type === "Loot") {

      items.items = this.state.area.items.filter(item => item._id !== loot._id);
     


        
      axios
        .put(`http://localhost:5500/blackheart/${this.state.area._id}`, items)
        .then(response => {
          items.items = [];
          this.state.player.items.push(loot._id);

          items.items = this.state.player.items;
          axios
            .put(
              `http://localhost:5500/players/${this.state.player._id}`,
              items
            )
            .then(response => {
              window.location.reload();
            })
            .catch(err => {});
        })
        .catch(err => {});
    } else if (type === "Inventory" || type === "Equip") {
      if (type === "Inventory") {
        items.items = this.state.player.items.filter(
          item => item._id !== loot._id
        );

        this.state.player.gear.push(loot._id);

        items.gear = this.state.player.gear;
      } else {
        items.gear = this.state.player.gear.filter(
          item => item._id !== loot._id
        );
        this.state.player.items.push(loot._id);

        items.items = this.state.player.items;
      }

      axios
        .put(`http://localhost:5500/players/${this.state.player._id}`, items)
        .then(response => {
          if (type === "Equip") {
            this.removeEquipment(loot);
          }
          window.location.reload();
        })
        .catch(err => {});
    }
  }
  removeEquipment(item) {
    let items = {};
    let itemSlot = eval(`this.state.player.${item.slot}`);

    console.log(itemSlot)

    if (itemSlot ==="Equipped") {
      console.log("what now")
    
      
          let player = {};
          let strength,
            intellect,
            health,
            endurance,
            agility = 0;
            console.log(item.slot)
         switch (item.slot) {
           case "Shield":
             player.shield ="none"
             
             break;
             case "shield":
             player.shield ="none"
             
             break;
             case "head":
             player.head ="none"
             
             break;
             case "shoulders":
             player.shoulders ="none"
             
             break;
             case "feet":
             player.feet ="none"
             
             break;
             case "hands":
             player.hands ="none"
             
             break;
             case "chest":
             player.chest ="none"
             
             break;
             case "leggings":
             player.leggings ="none"
             
             break;
             case "charm":
             player.charm ="none"
             
             break;
             case "offHand":
             player.offHand ="none"
             
             break;
             case "weaponTwoHand":
             player.weaponTwoHand ="none"
             
             break;
             case "weaponOneHand":
             console.log("WeaponOneHand")
             player.weaponOneHand ="none"
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
          console.log(player)
          axios
            .put(`http://localhost:5500/players/${this.state.player._id}`, player)
            .then(response => {
              window.location.reload();
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
  checkDuplicate(type, loot){
    let dup = false
    if (type === "Inventory") {
         this.state.player.gear.forEach(curItem=>{
        if(curItem.slot === loot.slot) {
       dup =true
       }
       })
  }
  if(dup ===false){
    this.deleteItem(type,loot)
  }
  else{
    return alert(`You cannot add another ${loot.slot} to your equipment`) 
  }
}

  render() {
    return (
      <Fragment>
        <div className={"bigItemHeader-styles"}>Items in room</div>
        <div className="Items">
          <br />
          <br />

          {this.state.area.items.map(item => (
            <Fragment>
              <div
                className="itemCard-styles"
                onClick={() => this.deleteItem("Loot", item)}
              >
                <div className="itemsHeader-styles">{item.name}</div>
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                <br />
                {` Health: ${item.health} Endurance: ${item.endurance}`}
                <br />
                {` Intellect: ${item.intellect} Strength: ${item.strength}`}
                <br />
                {` Agility: ${item.agility}`}
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
          {` Health: ${this.state.player.health} Endurance: ${
            this.state.player.endurance
          }`}
          <br />
          {`Strength: ${this.state.player.strength} Agility: ${
            this.state.player.agility
          } Intellect: ${this.state.player.intellect}`}
        </div>

        <div className={"bigItemHeader-styles"}>Items in equipped</div>

        <div className="Items">
          {this.state.player.gear.map(item => (
            <Fragment>
              <div
                className="itemCard-styles"
                onClick={() => this.checkDuplicate("Equip", item)}
              >
                <div className="itemsHeader-styles">{item.name}</div>
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                <br />
                {` Health: ${item.health} Endurance: ${item.endurance}`}
                <br />
                {` Intellect: ${item.intellect} Strength: ${item.strength}`}
                <br />
                {` Agility: ${item.agility}`}
              </div>
              <br />
            </Fragment>
          ))}
        </div>
        <Link to={`/equip/${this.state.player._id}`}>
          <button>equip hero</button>
        </Link>

        <div className={"bigItemHeader-styles"}>Items in inventory</div>
        <div className="Items">
          <br />
          <br />

          {this.state.player.items.map(item => (
            <Fragment>
              <div
                className="itemCard-styles"
                onClick={() => this.checkDuplicate("Inventory", item)}
              >
                <div className="itemsHeader-styles">{item.name}</div>
                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                <br />
                {` Health: ${item.health} Endurance: ${item.endurance}`}
                <br />
                {` Intellect: ${item.intellect} Strength: ${item.strength}`}
                <br />
                {` Agility: ${item.agility}`}
              </div>
              <br />
            </Fragment>
          ))}
        </div>
      </Fragment>
    );
  }
}

export default Items;
