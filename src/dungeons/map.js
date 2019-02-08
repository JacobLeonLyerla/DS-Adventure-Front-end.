/*
Change the if else if into a switch
make it more dynamic if that, Maybe instead of the way we are doing it, lets iterate out soem divs
set them up so the if there are 3 divs in one row it will format it
maybe using col and row or something,  if we keep doing it this way it will really ad a lot of work
every wing we do it will be another custom map and that seems a bit bad.

we could do something like adding a row to the data base and put them on each room and level
so our starting zone will be starting room to arcanum, and we can go from there
we could also add a sizing element and scale the div bases on that
maybe use inline functions for that remove all the break tags
they look really bad, when I created these it I used the breaks for speed

second option we keep making the map custom so we can use sizing a bit to our advantage


*/


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
