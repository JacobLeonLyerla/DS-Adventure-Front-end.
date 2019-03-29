  // pulls the player from the database ad sets it on the  state
  import axios from "axios";

  export function setPlayer ( reload ) {
    axios
      .get("https://dungeon-run.herokuapp.com/players")

      .then(response => {
        this.setState({ players: response.data });

        if (reload === "reload") {
          window.location.reload();
        }
      })
      .catch(() => {});
  };

// this uses the players name to find him in the data base
export function findPlayer (name, pass)  {
    this.state.players.forEach(player => {
      if (player.name.toLowerCase() === name.toLowerCase()) {
        if (player.password.toLowerCase() === pass.toLowerCase()) {
          this.setState({
            player: player,

            name: "",

            password: "",

            id: player._id,

            redirect: true
          });

          return this.state.player;
        }
      }
    });
  };