/*
Break up this component as much as possible

comment everything out

add hooks if  they seem worth it,

or even consider replacing this stuff with a context

*/


import React, { Component, Fragment } from "react";
import axios from "axios";

import { Redirect } from "react-router-dom";
import { Form, Alert, Label, Input, Col, Row } from "reactstrap";
class Create extends Component {
  state = {
    name: "",

    email: "",

    age: "",

    class: "",

    bio: "",

    password: "",

    password2: "",

    gender: "",

    redirect: false,

    endurance: 0,

    health: 0,

    agility: 0,

    intellect: 0,

    strength: 0,

    preview: ""
  };
  // this is a function to post a new adventurer  to the database,
  // it pulls the data off the payload and sets it into a object
  //with a few basic checks but i actually have set the checks to handle on the back end so the checks here are
  // really just second lines of defense
  addPlayer = e => {
    e.preventDefault();

    this.state.redirect = false;

    const player = {};

    if (this.state.name !== "") {
      // if they are not empty then set the player objects key of email is set to the email on the state,
      if (this.state.name.length > 30) {
        alert(
          `${this.state.name} is too is ${
            this.state.name.length
          }, and the name must be less than 30 characters`
        );
        this.setState({ name: "" });
      } else {
        player.name = this.state.name;
      }
    }

    if (this.state.email !== "") {
      // if they are not empty then set the player objects key of email is set to the email on the state,
      if (this.state.email.length > 30) {
        alert(
          `${this.state.email} is too is ${
            this.state.email.length
          }, and the name must be less than 30 characters`
        );
        this.setState({ email: "" });
      } else {
        player.email = this.state.email;
      }
    }

    if (this.state.password !== "") {
      if (this.state.password.length > 30) {
        alert(
          `${this.state.password} is too is ${
            this.state.password.length
          }, and the name must be less than 30 characters`
        );

        this.setState({ password: "", password2: "" });
      } else {
        if (this.state.password === this.state.password2) {
          player.password = this.state.password;
          player.password2 = this.state.password2;
        } else {
          alert("passwords did not match");
          this.setState({ password: "", password2: "" });
        }
      }
    }

    // this is a switch that takes the class entered and than
    // applies a set of base stats to the player
    // along side of spells and the strings for animation
    if (this.state.class !== "") {
      let test = this.state.class;
      switch (test) {
        case "Ranger":
          player.idle = "rangeridle";

          player.battle = "rangerbattle";

          player.health = 160;

          player.endurance = 140;

          player.agility = 20;

          player.strength = 5;

          player.intellect = 10;

          player.attacks = [
            "5b68f678bc349a910c4b2402",

            "5b68f616bc349a910c4b2401",

            "5b66bd38667d32785c749ff8"
          ];

          break;
        case "Warrior":
          player.idle = "warrioridle";

          player.battle = "warriorbattle";

          player.endurance = 100;

          player.health = 200;

          player.intellect = 5;

          player.agility = 5;

          player.strength = 25;

          player.attacks = [
            "5b68eed2bc349a910c4b23f8",

            "5b68ee71bc349a910c4b23f7",

            "5b68edb6bc349a910c4b23f6"
          ];
          break;
        case "Mage":
          player.idle = "mageidle";

          player.battle = "magebattle";

          player.endurance = 200;

          player.health = 100;

          player.intellect = 25;

          player.agility = 5;

          player.strength = 0;

          player.attacks = [
            "5b68ef26bc349a910c4b23f9",

            "5b68efb3bc349a910c4b23fa",

            "5b68f0aebc349a910c4b23fb"
          ];
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
    player.currentLocation = undefined;
    axios
      .post("https://dungeon-run.herokuapp.com/auth/register", player)
      .then(response => {
        this.props.setPlayer("reload");
        this.state.redirect = true;
        this.setState({
          name: "",

          password: "",

          password2: "",

          age: "",

          bio: "",

          class: "",

          gender: "",

          email: "",

          button: "",

          preview: ""
        });
      })
  };

  // this takes the event and sets it on state, the event here is the
  // onChange from my input fields
  handleInput = input => {
    this.setState({ [input.target.name]: input.target.value });
  };

  // this  sets the class name on state i to render a banner telling the user what class is selected
  handleClass = input => {
    if (this.state.class === "") {
      this.setState({ class: input });
    }
  };

  // this is a redirect render if the user ever sets redirect on state to true
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  //All of my buttons call this in the creat component,  they pass in the id in this case a class name,
  // if the id does not match the currently selected this.state.button than they get the className
  // "class-not-picked" that lowers the opacity in order to high light the one that is picked
  setButtonStyle = id => {
    if (this.state.button !== "" && this.state.button !== undefined) {
      if (id !== this.state.button) {
        return "class-not-picked";
      }
    }
  };

  render() {
    return (
      <Fragment>
        {/* this is a div that sits above the form, and when a class is selected
        it sets preview to a string that is not empty that allows the terneray to pass
        when it passes it imports the gif from the assets folder and displays it above the form */}
        <div className="loginbackground-styles">
          {this.state.preview !== "" ? (
            <div style={{ height: "15vh" }}>
              <img
                style={{ height: "100%" }}
                src={require(`../assets/${this.state.preview}.gif`)}
              />
            </div>
          ) : (
            <div style={{ height: "15vh" }} />
          )}
          {/* this allows the renderRedirect to work, it's been called over and over
     and if this.state.redirect is ever true it allows that function to exicute  */}
          {this.renderRedirect()}

          <Form className="create-styles" onSubmit={this.addPlayer}>
            {this.state.class !== "" ? (
              <Fragment>
                <Alert color="success">
                  {`You have selected a ${
                    this.state.class
                  }, adventure lies ahead champion.`}
                </Alert>
              </Fragment>
            ) : null}

            <Row style={{ margin: "1%" }}>
              <Col md="6">
                <Label
                  for="name"
                  style={{ width: "90%" }}
                  className="text-left"
                >
                  Name:
                </Label>

                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleInput}
                />
              </Col>
              <Col md="6">
                <Label
                  style={{ width: "90%" }}
                  className="text-left"
                  for="email"
                >
                  Email:
                </Label>

                <Input
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInput}
                />
              </Col>
            </Row>

            <Row style={{ margin: "1%" }}>
              <Col md="6">
                <Label
                  style={{ width: "90%" }}
                  className="text-left"
                  for="password"
                >
                  Password:
                </Label>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleInput}
                />
              </Col>
              <Col md="6">
                <Label
                  style={{ width: "90%" }}
                  className="text-left"
                  for="password2"
                >
                  Re-type Password:
                </Label>

                <Input
                  id="pwassword2"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.handleInput}
                />
              </Col>
            </Row>
            <div style={{ margin: "1%" }}>
              <Label style={{ width: "97%" }} className="text-left" for="lore">
                Lore:
              </Label>

              <Input
                type="textarea"
                id="lore"
                name="bio"
                placeholder="Give a backstory"
                value={this.state.bio}
                onChange={this.handleInput}
                style={{ height: "20vh" }}
              />
            </div>
            {/* these buttons  on click set the class state and the button state as well as the preview state,
              
              NOTE TO SELF: the button and class states are the same so we don't really need them both
              i will fix tihs once i am back online i can't really code because all my data is hosted on mlab */}
            <div>
              <button
                type="button"
                className={`btn ${this.setButtonStyle("Warrior")}`}
                onClick={() =>
                  this.setState({
                    class: "Warrior",
                    button: "Warrior",
                    preview: "warrioridle"
                  })
                }
              >
                Warrior
              </button>
              <button
                type="button"
                className={`btn ${this.setButtonStyle("Ranger")}`}
                onClick={() =>
                  this.setState({
                    class: "Ranger",
                    button: "Ranger",
                    preview: "rangeridle"
                  })
                }
              >
                Ranger
              </button>
              <button
                type="button"
                className={`btn ${this.setButtonStyle("Mage")}`}
                onClick={() =>
                  this.setState({
                    class: "Mage",
                    button: "Mage",
                    preview: "mageidle"
                  })
                }
              >
                Mage
              </button>
            </div>
            <button className="btn btn-create" type="submit">
              Create Character
            </button>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default Create;
