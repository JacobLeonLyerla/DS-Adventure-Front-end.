/*
lets break this logic up keep as much of it in helpers as we can

maybe replace our state with hooks, but thats not important

clean up the code in general and comment everything out

*/

import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";
import { setCurrentPlayer,updatePlayer } from "../helpers/infoHelpers";
import { handleInput } from "../helpers/commonHelpers";
import axios from "axios";

class Info extends Component {
  state = {
    player: { gear: [], items: [] },
    name: "",
    age: "",
    class: "",
    bio: "",
    password: "",
    gender: "",
    redirect: false,
    visible: false,
    preview: ""
  };
  // deconstruct id from params use it to call set player function
  componentDidMount() {
    const { id } = this.props.match.params;
    this.setCurrentPlayer(id);
  }


  handleClass = input => {
    if (this.state.class === "") {
      this.setState({ class: input });
    }
  };
  itemsRender() {
    if (this.state.player.items !== []) {
      return this.state.player.items.map(item => (
        <Fragment>
          <div>{item.name}</div>
          <br />
        </Fragment>
      ));
    }
  }
  // this is to render the gear inside of the user information,
  // this is also currently not being used, however i may make a gear
  // button that allows users to pull up  little screen with the gear
  gearRender() {
    if (this.state.player.items !== []) {
      return this.state.player.gear.map(item => (
        <Fragment>
          <div>{item.name}</div>
          <br />
        </Fragment>
      ));
    }
  }
  // this takes the value of the bar and gives it a style based on that
  prgoressColor(value) {
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
  render() {
    this.setCurrentPlayer = setCurrentPlayer.bind(this);
    this.handleInput = handleInput.bind(this)
    this.updatePlayer = updatePlayer.bind(this)
    let element = null;
    // when this.state.visable comes back as defined than it will render a gif above the form
    if (this.state.visible) {
      element = (
        <Fragment>
          <img src={require(`../assets/${this.state.player.idle}.gif`)} />

          {/* Header of the form with basic info and so name and class */}
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
            <br />
            Lore:
            <input
              name="bio"
              placeholder="Give your adventurer a backstory"
              value={this.state.bio}
              onChange={this.handleInput}
            />
            <br />
            {/* <button onClick={() => this.updatePlayer(this.state.player._id)}>
            Update Character
          </button> */}
          </form>
        </Fragment>
      );
    }
    // set up up variables we will be using inside of our progress bars

    let health = this.state.player.health;
    let endurance = this.state.player.endurance;
    let intellect = this.state.player.intellect;
    let strength = this.state.player.strength;
    let agility = this.state.player.agility;
    let total =
      this.state.player.health +
      this.state.player.endurance +
      this.state.player.intellect +
      this.state.player.strength +
      this.state.player.agility;

    return (
      <Fragment>
        <div className="loginbackground-styles">
          {this.state.preview !== "" ? (
            <div style={{ height: "13vh" }}>
              <img
                style={{ height: "100%" }}
                src={require(`../assets/${this.state.preview}.gif`)}
              />
            </div>
          ) : (
            <div />
          )}

          <div className="info-styles">
            <div>
              <div className="name-info">{this.state.player.name}</div>
              <div className={`${this.state.player.class}class-info`}>
                {this.state.player.class} <br />
              </div>
              {/* first we check to make sure the bar has a value, if not we do not render it
than we check what percent this bars value is compared to the total of all the stats
that allows us to get back a class name for the styling of these bars
lastly we set the value based on the same logic */}
              {(health * 2) / 5 > 0 ? (
                <Fragment>
                  <div className="text-left">Health</div>
                  <Progress
                    className={`${this.prgoressColor(
                      Math.round((health / total) * 100)
                    )} progress-info`}
                    style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                    value={Math.round((health / total) * 100)}
                  >
                    {health}
                  </Progress>
                </Fragment>
              ) : (
                <Fragment />
              )}
              {(endurance * 2) / 5 > 0 ? (
                <Fragment>
                  <div className="text-left">Endurance</div>
                  <Progress
                    className={`${this.prgoressColor(
                      Math.round((endurance / total) * 100)
                    )} progress-info`}
                    style={{
                      fontFamily: " Arial, Helvetica, sans-serif"
                    }}
                    value={Math.round((endurance / total) * 100)}
                  >
                    {endurance}
                  </Progress>
                </Fragment>
              ) : (
                <Fragment />
              )}
              {(intellect * 2) / 5 > 0 ? (
                <Fragment>
                  <div className="text-left">Intellect</div>
                  <Progress
                    className={`${this.prgoressColor(
                      Math.round((intellect / total) * 100)
                    )} progress-info`}
                    style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                    value={Math.round((intellect / total) * 100)}
                  >
                    {intellect}
                  </Progress>
                </Fragment>
              ) : (
                <Fragment />
              )}
              {(strength * 2) / 5 > 0 ? (
                <Fragment>
                  <div className="text-left">Strength</div>
                  <Progress
                    className={`${this.prgoressColor(
                      Math.round((strength / total) * 100)
                    )} progress-info`}
                    style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                    value={Math.round((strength / total) * 100)}
                  >
                    {strength}
                  </Progress>
                </Fragment>
              ) : (
                <Fragment />
              )}
              {(agility * 2) / 5 > 0 ? (
                <Fragment>
                  <div className="text-left">Agility</div>
                  <Progress
                    className={`${this.prgoressColor(
                      Math.round((agility / total) * 100)
                    )} progress-info`}
                    style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                    value={Math.round((agility / total) * 100)}
                  >
                    {agility}
                  </Progress>
                </Fragment>
              ) : (
                <Fragment />
              )}
              <br />
              Lore
              <div className="lore">{this.state.player.bio}</div>
            </div>
            {element}
          </div>
          <br />
          <Link to={`/dungeons/${this.state.player._id}`}>
            <button className="btn dungeons-styles">Dungeons</button>
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default Info;
