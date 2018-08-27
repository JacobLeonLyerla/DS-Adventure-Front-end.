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
      if(this.state.name.length >20){
        alert(`${this.state.name} is too is ${this.state.name.length}, and the name must be less than 20 characters`)
      this.setState({name:""})
      }else{
      player.name = this.state.name;
      }
    }
    if (this.state.password !== "") {
      if(this.state.password.length >30){
      alert(`${this.state.password} is too is ${this.state.password.length}, and the name must be less than 30 characters`)
      this.setState({password:""})
    }else{
      player.password = this.state.password;
    }
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
          player.attacks = ["5b68f678bc349a910c4b2402","5b68f616bc349a910c4b2401","5b66bd38667d32785c749ff8"]
          break;
        case "Warrior":
          player.endurance = 100;
          player.health = 200;
          player.intellect = 5;
          player.agility = 5;
          player.strength = 25;
          player.attacks =["5b68eed2bc349a910c4b23f8","5b68ee71bc349a910c4b23f7","5b68edb6bc349a910c4b23f6"]
          break;
        case "Mage":
          player.endurance = 200;
          player.health = 100;
          player.intellect = 25;
          player.agility = 5;
          player.strength = 0;
          player.attacks=["5b68ef26bc349a910c4b23f9","5b68efb3bc349a910c4b23fa","5b68f0aebc349a910c4b23fb"]
          break;
        case "Necromancer":
          player.endurance = 160;
          player.health = 140;
          player.intellect = 25;
          player.agility = 5;
          player.strength = 0;
          player.attacks = ["5b68f41fbc349a910c4b23fe","5b68f2b2bc349a910c4b23fd","5b68f15cbc349a910c4b23fc"]
          break;
        case "Paladin":
          player.endurance = 120;
          player.health = 180;
          player.intellect = 10;
          player.agility = 5;
          player.strength = 15;
          player.attacks = ["5b66baf0667d32785c749ff5","5b68f4e2bc349a910c4b23ff","5b68f57dbc349a910c4b2400"]
          break;
        case "Rogue":
          player.endurance = 160;
          player.health = 140;
          player.intellect = 5;
          player.agility = 25;
          player.strength = 0;
          player.attacks = ["5b68ec1abc349a910c4b23f3","5b68ec6ebc349a910c4b23f4","5b68ed13bc349a910c4b23f5"]
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
      .post("https://dungeon-run.herokuapp.com/players", player)
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
        <div className="loginbackground-styles">
        {this.renderRedirect()}
        <br />
        <br />
        <br />
        <br /><br />
        <br /><br />
        <br /><br />
        <br /><br />
        <br /><br />
        <br /><br />
        <br /><br />
        <br />
        <div className="create-styles">
          <label>
            Name:
            <input
              name="name"
              placeholder="Create name"
              value={this.state.name}
              onChange={this.handleInput}
            />
          </label>
          Password:
          <input
            name="password"
            type="password"
            placeholder="Create password"
            value={this.state.password}
            onChange={this.handleInput}
          />{" "}
          <label>
            Age:
            <input
              name="age"
              placeholder="Set age"
              value={this.state.age}
              onChange={this.handleInput}
            />
          </label>
          <br/>
          Lore:
          <input
            name="bio"
            placeholder="Give a backstory"
            value={this.state.bio}
            onChange={this.handleInput}
          />
          Gender:
          <input
            name="gender"
            placeholder="Set a gender"
            value={this.state.gender}
            onChange={this.handleInput}
          />
       

        <br />
        <button className="btn"  onClick={() => this.handleClass("Paladin")}>Paladin</button>
        <button className="btn"  onClick={() => this.handleClass("Warrior")}>Warrior</button>
        <button className="btn"  onClick={() => this.handleClass("Necromancer")}>
          Necromancer
        </button>
        <br />
        <button className="btn"  onClick={() => this.handleClass("Rogue")}>Rogue</button>
        <button className="btn"  onClick={() => this.handleClass("Ranger")}>Ranger</button>
        <button className="btn"  onClick={() => this.handleClass("Mage")}>Mage</button>

        <br />
        <br />
        <button className="btn" onClick={() => this.addPlayer()}>Create Character</button>
         </div>
      </div></Fragment>
    );
  }
}

export default Create;
