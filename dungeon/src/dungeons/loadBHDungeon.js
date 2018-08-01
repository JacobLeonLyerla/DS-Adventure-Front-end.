import React, { Component, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Items from './items'
class BlackHeart extends Component {
  state = {
    areas: undefined,
    area: { },
    player: {currentLocation:{_id:0}},
    id: 0,
    redirect: false,
    moved: false
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
 
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //************************************************** AXIOS
  setDungeon = (reload) => {
        if(this.state.player.currentLocation._id === 0|| this.state.player.currentLocation._id === undefined){
    axios
      .get("http://localhost:5500/blackheart")
      .then(response => {
    
        this.currentRoom(response.data[0]._id);
        
        
        this.setState({ players: response.data });
        if (reload === "reload") {
          window.location.reload();
        }
      })
      .catch(err => {});
  }
else{
  axios
  .get("http://localhost:5500/players")
  .then(response => {
    this.setState({ players: response.data });
    this.currentRoom(this.state.player.currentLocation._id)
    if (reload === "reload") {
      window.location.reload();
    }
  })
  .catch(err => {});
}
  }
  currentRoom = id => {
    axios
      .get(`http://localhost:5500/blackheart/${id}`)
      .then(response => {
        this.setState({ area: response.data });
        if(this.state.moved === true){
          this.setState({moved:false})
          window.location.reload()
        }
       
      })
      .catch(err => {});
  };
  currentPlayer = id => {
    axios
      .get(`http://localhost:5500/players/${id}`)
      .then(response => {
        this.setState({ player: response.data });
        this.setDungeon();
      })
      .catch(err => {
      });
  };
  setLocation(id) {
    let player = {};
   
    if(this.state.player.currentLocation._id !== 0|| this.state.player.currentLocation._id !== undefined){
      player.currentLocation =this.state.player.currentLocation._id
    }else{
       player.currentLocation = this.state.area._id;
    }

    axios
      .put(`http://localhost:5500/players/${this.state.player._id}`, player)
      .then(response => {
     
      })
      .catch(err => {});
  }
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
    let player ={}
    player.currentLocation = id
    axios
      .put(`http://localhost:5500/players/${this.state.player._id}`, player)
      .then(response => {
        this.setState({moved:true})
       this.currentRoom(id)
      })
      .catch(err => {});
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //************************************************** MOVMENT
  path(direction) {
    let pathId = "";

    switch (direction) {
      case "North":
        if (this.state.area.north.length > 0) {
          for (let index = 0; index < this.state.area.north.length; index++) {
            pathId = this.state.area.north[0]._id;
          }
        } else {
          pathId = "No path";
        }
        break;
      case "South":
        if (this.state.area.south.length > 0) {
          for (let index = 0; index < this.state.area.south.length; index++) {
            pathId = this.state.area.south[0]._id;
          }
        }else{
        pathId = "No path";
        }
        break;
      case "East":
        if (this.state.area.east.length > 0) {
          for (let index = 0; index < this.state.area.east.length; index++) {
            pathId = this.state.area.east[0]._id;
          }
        } else {
          pathId = "No path";
        }

        break;
      case "West":
        if (this.state.area.west.length > 0) {
          for (let index = 0; index < this.state.area.west.length; index++) {
            pathId = this.state.area.west[0]._id;
          }
        } else {
          pathId = "No path";
        }
        break;
      default:
        break;
    }
    return pathId;
  }

  render() {
    return (
      <Fragment>
        
        <div className="BlackHeart">
          {`You are currently in  the ${this.state.area.name}`}
          <br />
          <br/>
          <button onClick={() => this.move("North")}>Go North</button>
         
          <br/>
          <button onClick={() => this.move("West")}>Go West</button>
          <button onClick={() => this.move("East")}>Go East</button>
          <br/>
           <button onClick={() => this.move("South")}>Go South</button>
        </div>
      </Fragment>
    );
  }
}

export default BlackHeart;
