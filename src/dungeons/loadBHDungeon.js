import React, { Component, Fragment } from "react";

import { Redirect } from "react-router-dom";

import { Modal, Col, Row } from "reactstrap";
import {
  currentRoom,
  setLocation,
  move,
  winnings,
  setDungeon,
  getRandomInt,
  movmentRender
} from "../helpers/loadDHelper";
import axios from "axios";

import Map from "../dungeons/map.js";

class BlackHeart extends Component {
  constructor() {
    super();
    this.state = {
      areas: undefined,

      area: {},

      player: {
        currentLocation: { _id: 0 }
      },

      pPempId: "",

      mTempid: "",

      id: 0,

      redirect: false,

      moved: false,

      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //************************************************** AXIOS




  currentPlayer = id => {
    axios
      .get(`https://dungeon-run.herokuapp.com/players/${id}`)
      .then(response => {
        this.setState({ player: response.data, mTempid: response.data });
        this.setDungeon();
      })
      .catch(err => {});
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //************************************************** MOVMENT
  path(direction) {
    let pathId = "";

    switch (direction) {
      case "North":
        if (this.state.area.north.length > 0) {
          for (let index = 0; index < this.state.area.north.length; index++) {
            pathId = this.state.area.north[0]._id;
          }
        } else {
          pathId = "No path";
        }

        break;
      case "South":
        if (this.state.area.south.length > 0) {
          for (let index = 0; index < this.state.area.south.length; index++) {
            pathId = this.state.area.south[0]._id;
          }
        } else {
          pathId = "No path";
        }

        break;
      case "East":
        if (this.state.area.east.length > 0) {
          for (let index = 0; index < this.state.area.east.length; index++) {
            pathId = this.state.area.east[0]._id;
          }
        } else {
          pathId = "No path";
        }

        break;
      case "West":
        if (this.state.area.west.length > 0) {
          for (let index = 0; index < this.state.area.west.length; index++) {
            pathId = this.state.area.west[0]._id;
          }
        } else {
          pathId = "No path";
        }

        break;
      default:
        break;
    }

    return pathId;
  }

  renderRedirect = id => {
    if (this.state.redirect) {
      return <Redirect to={`/battle/${id}`} />;
    }
  };

 

  winnings() {
    if (
      this.state.player.itemWon !== "none" &&
      this.state.player.itemWon !== undefined &&
      this.state.player.itemWon !== "lost"
    ) {
      return (
        <Fragment>
          <div className="winnings-styles">
            <div>{`${this.state.player.name} defeated the ${
              this.state.player.defeatedName
            }`}</div>
            <div>{`earing ${
              this.state.player.experienceGained
            } experience`}</div>
            <div>{`and looted ${this.state.player.itemWon}`}</div>
          </div>
        </Fragment>
      );
    } else if (
      this.state.player.itemWon === "lost" &&
      this.state.player.itemWon !== undefined
    ) {
      return (
        <Fragment>
          <div className="losing-styles">
            <div>{`${this.state.player.name} was defeated by the ${
              this.state.player.defeatedName
            }`}</div>
            <div>{`earning ${
              this.state.player.experienceGained
            } experience`}</div>
            <div>{`You were returned to the ${this.state.area.name}`}</div>
          </div>
        </Fragment>
      );
    }
  }

  ding() {
    if (
      this.state.player.leveled === true &&
      this.state.player.leveled !== undefined
    ) {
      return (
        <div className="leveled-styles">
          {`congratulations! you are now level ${this.state.player.level}`}
        </div>
      );
    }
  }

  render() {
    this.currentRoom = currentRoom.bind(this);
    this.setLocation = setLocation.bind(this);
    this.move = move.bind(this);
    this.winnings = winnings.bind(this);
    this.setDungeon = setDungeon.bind(this);
    this.getRandomInt = getRandomInt
    this.movmentRender = movmentRender.bind(this)
    return (
      <Fragment>
        {this.renderRedirect(this.state.player._id)}
        {this.movmentRender()}
        {this.ding()}
        {this.winnings()}
      </Fragment>
    );
  }
}

export default BlackHeart;
