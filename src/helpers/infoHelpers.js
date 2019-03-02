import axios from "axios";
  // take id from the  component did mount use it do grab the player from the database than
  // set that data on state
  export function setCurrentPlayer(id){
    axios
      .get(`https://dungeon-run.herokuapp.com/players/${id}`)
      .then(response => {
        this.setState({ player: response.data, preview: response.data.idle });
      })
  };