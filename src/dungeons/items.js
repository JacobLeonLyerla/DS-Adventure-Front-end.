import React, { Component, Fragment } from "react";

import {
  currentRoom,
  currentPlayer,
  deleteItem,
  removeEquipment,
  classIcon,
  checkDuplicate,
  prgoressColor,
  renderEquipment,
  renderItems,
  itemInterface
} from "../helpers/itemsHelper";

class Items extends Component {
  state = {
    player: {
      gear: [{ name: "" }],

      items: [{ name: "" }]
    },

    area: { items: [] }
  };

  componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
  }

  render() {
    this.currentRoom = currentRoom.bind(this);
    this.currentPlayer = currentPlayer.bind(this);
    this.deleteItem = deleteItem.bind(this);
    this.removeEquipment = removeEquipment.bind(this);
    this.classIcon = classIcon;
    this.checkDuplicate = checkDuplicate.bind(this);
    this.prgoressColor = prgoressColor;
    this.renderEquipment = renderEquipment.bind(this);
    this.renderItems = renderItems.bind(this);
    this.itemInterface = itemInterface.bind(this);

    return <Fragment>{this.itemInterface()}</Fragment>;
  }
}

export default Items;
