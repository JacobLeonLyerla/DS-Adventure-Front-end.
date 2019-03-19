import axios from "axios";
import React, {  Fragment } from "react";



export function currentRoom(id) {
  axios
    .get(`https://dungeon-run.herokuapp.com/blackheart/${id}`)
    .then(response => {
      this.setState({ area: response.data });
      if (this.state.moved === true) {
        this.setState({ moved: false });
        let battle = {};
        if (this.state.area.monsters) {
          let randomInt = this.getRandomInt(700);
          if (randomInt <= 250 && this.state.area.monsters.length >= 1) {
            battle.currentBattle = this.state.area.monsters[0];
          } else if (
            randomInt >= 251 &&
            randomInt <= 450 &&
            this.state.area.monsters.length >= 2
          ) {
            battle.currentBattle = this.state.area.monsters[1];
          } else if (
            randomInt >= 451 &&
            randomInt <= 600 &&
            this.state.area.monsters.length >= 3
          ) {
            battle.currentBattle = this.state.area.monsters[2];
          } else if (
            randomInt >= 600 &&
            randomInt <= 700 &&
            this.state.area.monsters.length >= 4
          ) {
            battle.currentBattle = this.state.area.monsters[3];
          } else if (
            randomInt >= 0 &&
            randomInt <= 1000 &&
            this.state.area.monsters.length >= 5
          ) {
            battle.currentBattle = this.state.area.monsters[4];
          } else {
            battle.currentBattle = [];
            this.setState({
              redirect: false
            });
          }

          axios
            .put(
              `https://dungeon-run.herokuapp.com/players/${
                this.state.player._id
              }`,
              battle
            )

            .then(response => {
              if (response.data.currentBattle.length > 0) {
                this.setState({
                  redirect: true
                });
              }
            });
        }
      }
    });
}
export function setLocation(id) {
    let player = {};

    if (
      this.state.player.currentLocation._id !== 0 ||
      this.state.player.currentLocation._id !== undefined
    ) {
      player.currentLocation = this.state.player.currentLocation._id(
        "where is this going!"
      );
    } else {
      player.currentLocation = this.state.area._id;
    }

    axios
      .put(
        `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`,
        player
      )
      .then(response => {})
      .catch(err => {});
  }
export function  

move(direction) {
  let id = "";
  switch (direction) {
    case "North":
      id = this.path("North");

      break;
    case "South":
      id = this.path("South");
      break;
    case "East":
      id = this.path("East");
      break;
    case "West":
      id = this.path("West");
      break;
    default:
      break;
  }

  if (id === "No path") {
    return alert(
      `there is no path to the ${direction} of you, please try another path.`
    );
  }

  if (this.state.player.tempPlayer !== "no temp") {
    let id = this.state.player.tempPlayer;
    axios
      .delete(`https://dungeon-run.herokuapp.com/temps/${id}`)
      .then(response => {
        let id = this.state.player.tempMonster;
        axios
          .delete(`https://dungeon-run.herokuapp.com/temps/${id}`)
          .then(response => {});
      });
  }

  let player = {};
  player.currentLocation = id;

  player.tempMonster = "no temp";
  player.tempPlayer = "no temp";
  player.defeatedName = "none";
  player.experienceGained = 0;
  player.itemWon = "none";
  player.leveled = false;
  axios
    .put(
      `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`,
      player
    )
    .then(response => {
      this.setState({ moved: true });
      this.currentRoom(id);
    })
    .catch(err => {});
}

export function 
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

export function setDungeon ( reload ) {
  if (this.state.player.currentLocation === undefined) {
    axios
      .get("https://dungeon-run.herokuapp.com/blackheart")
      .then(response => {
        this.currentRoom(response.data[0]._id);
        this.setState({ players: response.data });

        if (reload === "reload") {
          // window.location.reload();
        }
      })

      .catch(err => {});
  } else {
    this.currentRoom(this.state.player.currentLocation._id);
    if (reload === "reload") {
      // window.location.reload();
    }
  }
};
