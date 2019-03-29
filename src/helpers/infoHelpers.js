import axios from "axios";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Progress } from "reactstrap";

export function infoLayout() {
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
                  className={`${progressColor(
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
                  className={`${progressColor(
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
                  className={`${progressColor(
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
                  className={`${progressColor(
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
                  className={`${progressColor(
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

// take id from the  component did mount use it do grab the player from the database than
// set that data on state
export function setCurrentPlayer(id) {
  axios
    .get(`https://dungeon-run.herokuapp.com/players/${id}`)
    .then(response => {
      this.setState({ player: response.data, preview: response.data.idle });
    });
}

// this was going to allow people to edit player info, however it is not currently
// in the game because emplementing it was a bit wonky i'll try something a bit later
export function updatePlayer(id) {
  const player = {};
  if (this.state.name !== "") {
    player.name = this.state.name;
  }
  if (this.state.bio !== "") {
    player.bio = this.state.bio;
  }
  axios
    .put(`https://dungeon-run.herokuapp.com/players/${id}`, player)
    .then(() => {
      this.setState({
        name: "",
        bio: ""
      });
      this.setCurrentPlayer(id);
    });
}
export function handleClass(input) {
  if (this.state.class === "") {
    this.setState({ class: input });
  }
}
export function progressColor(value) {
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
