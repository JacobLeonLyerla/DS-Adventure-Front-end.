import React, { Component, Fragment } from "react";

import { toggle } from "../helpers/commonHelpers";
import {
  currentRoom,
  setLocation,
  move,
  winnings,
  setDungeon,
  getRandomInt,
  movementRender,
  ding,
  currentPlayer,
  path,
  renderRedirect
} from "../helpers/loadDHelper";
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
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
  }

  render() {
    this.currentRoom = currentRoom.bind(this);
    this.setLocation = setLocation.bind(this);
    this.move = move.bind(this);
    this.winnings = winnings.bind(this);
    this.setDungeon = setDungeon.bind(this);
    this.getRandomInt = getRandomInt;
    this.movementRender = movementRender.bind(this);
    this.ding = ding;
    this.currentPlayer = currentPlayer.bind(this);
    this.path = path;
    this.toggle = toggle.bind(this);
    this.renderRedirect = renderRedirect.bind(this);
    return (
      <Fragment>
        {this.renderRedirect(this.state.player._id)}
        {this.movementRender()}
        {this.ding()}
        {this.winnings()}
      </Fragment>
    );
  }
}

export default BlackHeart;
