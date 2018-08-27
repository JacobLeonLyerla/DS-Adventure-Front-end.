import React, { Component } from "react";

class Map extends Component {

  setRoom(room) {
    if (this.props.name === "starting room" && room === "sr") {
      return "activeRoom-styles";
    } else if (this.props.name === "Pirate Fields" && room === "pf") {
      return "activeRoom-styles";
    } else if (this.props.name === "Great Hall" && room === "gh") {
      return "activeRoom-styles";
    } else if (this.props.name === "The Bloody Bridge" && room === "bb") {
      return "activeRoom-styles";
    } else if (this.props.name === "Wizards Bluff" && room === "wb") {
      return "activeRoom-styles";
    } else if (this.props.name === "The Grand Arcanum" && room === "ga") {
      return "activeRoom-styles";
    } else if (this.props.name === "Southern Waterway" && room === "sw") {
      return "activeRoom-styles";
    } else if (this.props.name === "Northern Waterway" && room === "nw") {
      return "activeRoom-styles";
    } else if (this.props.name === "Temple Steps" && room === "ts") {
      return "activeRoom-styles";
    } else if (
      this.props.name === "The Sunken Temple Great Room" &&
      room === "stgr"
    ) {
      return "activeRoom-styles";
    } else {
      return "none";
    }
  }
  render() {
    return (
      <div className="mapwrap mapBackground-styles">
        <br />
        <div className={`ga-styles ${this.setRoom("ga")}`} />
        <br />

        <br />

        <br />
        <div className={`wb-styles ${this.setRoom("wb")}`} />
        <br />

        <br />

        <br />
        <div className={`bb-styles ${this.setRoom("bb")}`} />
        <br />

        <br />

        <div className="ghTeir-styles">
          <div className={`stgr-styles ${this.setRoom("stgr")}`} />
          <div className={`ts-styles ${this.setRoom("ts")}`} />
          <div className={`nw-styles ${this.setRoom("nw")}`} />
          <div className={`gh-styles ${this.setRoom("gh")}`} />
        </div>

        <div className="startingrow">
          <div className={`sw-styles ${this.setRoom("sw")}`} />
          <div className={`sr-styles ${this.setRoom("sr")}`} />
        </div>
        <br />
        <br />
        <div className={`pf-styles ${this.setRoom("pf")}`} />
        <br />
      </div>
    );
  }
}
export default Map;
