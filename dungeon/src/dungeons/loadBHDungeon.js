import React, { Component, Fragment } from "react";
import { Redirect} from "react-router-dom";
import axios from "axios";
class BlackHeart extends Component {
  state = {
    areas: undefined,
    area: {},
    player: { currentLocation: { _id: 0 } },
    pPempId:"",
    mTempid:"",
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
  setDungeon = reload => {
    if (this.state.player.currentLocation === undefined) {
      axios
        .get("http://localhost:5500/blackheart")
        .then(response => {
          this.currentRoom(response.data[0]._id);
          this.setState({ players: response.data,  });

          if (reload === "reload") {
            window.location.reload();
          }
        })
        .catch(err => {});
    } else {
     

          this.currentRoom(this.state.player.currentLocation._id);
          if (reload === "reload") {
            window.location.reload();
          }
    }
  };
  currentRoom = id => {
    axios
      .get(`http://localhost:5500/blackheart/${id}`)
      .then(response => {
        this.setState({ area: response.data });
        if (this.state.moved === true) {
          this.setState({ moved: false });
          let battle ={}
          if (this.state.area.monsters) {
            let randomInt = this.getRandomInt(400);
            if (randomInt <= 100 &&
              this.state.area.monsters.length >= 1) {

              battle.currentBattle = this.state.area.monsters[0]

            } else if (
              randomInt >= 101 &&
              randomInt <= 200 &&
              this.state.area.monsters.length >= 2
            ) {

              battle.currentBattle = this.state.area.monsters[1]
            } else if (
              randomInt >= 201 &&
              randomInt <= 300 &&
              this.state.area.monsters.length >= 3
            ) {
              battle.currentBattle = this.state.area.monsters[2]

            } else if (
              randomInt >= 301 &&
              randomInt <= 400 &&
              this.state.area.monsters.length >= 4
            ) {
              battle.currentBattle = this.state.area.monsters[3]

            } else {
              battle.currentBattle =[]
              this.setState({
                redirect: false
              });
               window.location.reload();
            }
            axios
            .put(`http://localhost:5500/players/${this.state.player._id}`, battle)
            .then(response => {
              if(response.data.currentBattle.length >0){
              this.setState({
                redirect: true
              });
            }
          
            })
            .catch(err => {});
            
          }

          
         
        }
      })
      .catch(err => {});
  };

  
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  currentPlayer = id => {
    axios
      .get(`http://localhost:5500/players/${id}`)
      .then(response => {
        this.setState({ player: response.data, mTempid: response.data });
        this.setDungeon();
      })
      .catch(err => {});
  };
  setLocation(id) {
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
      .put(`http://localhost:5500/players/${this.state.player._id}`, player)
      .then(response => {})
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
 
    let player = {};
    player.currentLocation = id;
    player.tempMonster = "no temp"
    player.tempPlayer = "no temp"
    axios
      .put(`http://localhost:5500/players/${this.state.player._id}`, player)
      .then(response => {
        this.setState({ moved: true });
        this.currentRoom(id);
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
        } else {
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
  renderRedirect = (id) => {
    if (this.state.redirect) {
      return <Redirect to={`/battle/${id}`} />;
    }
  }
  movmentRender(){
if(this.state.area.south !== undefined){
    return(<Fragment>
      <div className="BlackHeart">
      {`You are currently in  the ${this.state.area.name}`}
      <br />
      <br />
      <button onClick={() => this.move("North")}>Go North</button>

      <br />
      <button onClick={() => this.move("West")}>Go West</button>
      <button onClick={() => this.move("East")}>Go East</button>
      <br />
      <button onClick={() => this.move("South")}>Go South</button>
    </div>
   </Fragment>)
}else{
  return(

   <div className="BlackHeart">
   <h3>You enter the room, looking around to find the next path.</h3>
   <img className="pathicon" src="https://orig00.deviantart.net/2205/f/2010/307/e/e/moria_throne_room_by_moondoodles-d322n02.jpg" />
   </div>
  )
}

  }
  render() {
    return (
    
      <Fragment>
          {this.renderRedirect(this.state.player._id)}
          {this.movmentRender()}
      </Fragment>
    );
  }
}

export default BlackHeart;