
import React, { Component, Fragment } from "react";

import {
  setCurrentPlayer,
  updatePlayer,
  handleClass,
  infoLayout
} from "../helpers/infoHelpers";
import { handleInput } from "../helpers/commonHelpers";

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

  // this takes the value of the bar and gives it a style based on that

  render() {
    this.setCurrentPlayer = setCurrentPlayer.bind(this);
    this.handleInput = handleInput.bind(this);
    this.updatePlayer = updatePlayer.bind(this);
    this.handleClass = handleClass.bind(this);
    this.infoLayout = infoLayout.bind(this);

    return <Fragment>{this.infoLayout()}</Fragment>;
  }
}

export default Info;
