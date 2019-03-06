import axios from "axios";



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
