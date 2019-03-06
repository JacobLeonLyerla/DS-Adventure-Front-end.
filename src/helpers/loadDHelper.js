import axios from "axios";

export function setDungeon (reload) {
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
    }
}
