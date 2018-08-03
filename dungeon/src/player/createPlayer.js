import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Create extends Component {
  state = {
    name: "",
    age: "",
    class: "",
    bio: "",
    password: "",
    gender: "",
    redirect: false,
    endurance: 0,
    health: 0,
    agility: 0,
    intellect: 0,
    strength: 0
  };

  addPlayer = () => {
    this.state.redirect = false;
    const player = {};
    if (this.state.name !== "") {
      // if they are not empty then set the player objects key of email is set to the email on the state,
      player.name = this.state.name;
    }
    if (this.state.password !== "") {
      player.password = this.state.password;
    }
    if (this.state.class !== "") {
      let test = this.state.class;
      switch (test) {
        case "Ranger":
          player.health = 160;
          player.endurance = 140;
          player.agility = 20;
          player.strength = 5;
          player.intellect = 10;
          break;
        case "Warrior":
          player.endurance = 100;
          player.health = 200;
          player.intellect = 5;
          player.agility = 5;
          player.strength = 25;
          break;
        case "Mage":
          player.endurance = 200;
          player.health = 100;
          player.intellect = 25;
          player.agility = 5;
          player.strength = 0;
          break;
        case "Necromancer":
          player.endurance = 160;
          player.health = 140;
          player.intellect = 25;
          player.agility = 5;
          player.strength = 0;
          break;
        case "Paladin":
          player.endurance = 120;
          player.health = 180;
          player.intellect = 10;
          player.agility = 5;
          player.strength = 15;
          break;
        case "Rogue":
          player.endurance = 160;
          player.health = 140;
          player.intellect = 5;
          player.agility = 25;
          player.strength = 0;
          break;
        default:
      }
      player.class = this.state.class;
    }
    if (this.state.bio !== "") {
      player.bio = this.state.bio;
    }
    if (this.state.age !== "") {
      player.age = this.state.age;
    }
    if (this.state.gender !== "") {
      player.gender = this.state.gender;
    }
    player.currentLocation = undefined
    axios
      .post("http://localhost:5500/players", player)
      .then(response => {
        this.props.setPlayer("reload");
        this.state.redirect = true;
        this.setState({
          name: "",
          password: "",
          age: "",
          bio: "",
          class: "",
          gender: ""
        });
      })
      .catch(error => {
        console.log(error)
      });
  };
  handleInput = input => {
    this.setState({ [input.target.name]: input.target.value });
  };
  handleClass = input => {
    if (this.state.class === "") {
      this.setState({ class: input });
    }
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };
  render() {
    return (
      <Fragment>
        {this.renderRedirect()}
        <br />
        <br />
        <form>
          <label>
            Name:
            <input
              name="name"
              placeholder="Enter a character name"
              value={this.state.name}
              onChange={this.handleInput}
            />
          </label>
          Password:
          <input
            name="password"
            type="password"
            placeholder="Enter a character password"
            value={this.state.password}
            onChange={this.handleInput}
          />{" "}
          <label>
            Age:
            <input
              name="age"
              placeholder="Set age of your adventurer "
              value={this.state.age}
              onChange={this.handleInput}
            />
          </label>
          Lore:
          <input
            name="bio"
            placeholder="Give your adventurer a backstory"
            value={this.state.bio}
            onChange={this.handleInput}
          />
          Gender:
          <input
            name="gender"
            placeholder="Set a gender for your adventurer"
            value={this.state.gender}
            onChange={this.handleInput}
          />
        </form>

        <br />
        <button onClick={() => this.handleClass("Paladin")}>Paladin</button>
        <button onClick={() => this.handleClass("Warrior")}>Warrior</button>
        <button onClick={() => this.handleClass("Necromancer")}>
          Necromancer
        </button>
        <br />
        <button onClick={() => this.handleClass("Rogue")}>Rogue</button>
        <button onClick={() => this.handleClass("Ranger")}>Ranger</button>
        <button onClick={() => this.handleClass("Mage")}>Mage</button>

        <br />
        <br />
        <button onClick={() => this.addPlayer()}>Create Character</button>
      </Fragment>
    );
  }
}

export default Create;
