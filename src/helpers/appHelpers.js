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
