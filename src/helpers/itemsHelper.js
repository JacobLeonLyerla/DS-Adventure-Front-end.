
 import axios from "axios";
 export function currentRoom ( id ) {
    axios
      .get(`https://dungeon-run.herokuapp.com/blackheart/${id}`)
      .then(response => {
        this.setState({ area: response.data });
        let roomLoot = {};
        let roomFilter = this.state.area.items.filter(item => {
          let failed = false;
          let secondfailed = false;
          this.state.player.items.forEach(playerItem => {
            if (playerItem._id !== item._id) {
              return;
            } else {
              return (failed = true);
            }
          });
          this.state.player.gear.forEach(InventoryItem => {
            if (InventoryItem._id !== item._id) {
              return;
            } else {
              return (secondfailed = true);
            }
          });

          return failed === false && secondfailed === false;
        });

        roomLoot.items = roomFilter;
        this.setState({ area: { items: roomLoot.items } });
      });
  };
export function currentPlayer ( id ) {
    axios
      .get(`https://dungeon-run.herokuapp.com/players/${id}`)
      .then(response => {
        this.setState({ player: response.data });
        this.currentRoom(this.state.player.currentLocation._id);
      });
  };
