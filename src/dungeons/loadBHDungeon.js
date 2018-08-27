import React, { Component, Fragment } from "react";
import { Redirect} from "react-router-dom";
import{Modal} from "reactstrap"
import axios from "axios";
import Map from "../dungeons/map.js"
class BlackHeart extends Component {
  constructor(){
super();
      this.state = {
    areas: undefined,
    area: {},
    player: { currentLocation: { _id: 0 } },
    pPempId:"",
    mTempid:"",
    id: 0,
    redirect: false,
    moved: false,
    modal:false
  };
  this.toggle = this.toggle.bind(this);

  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //************************************************** AXIOS
  setDungeon = reload => {
    if (this.state.player.currentLocation === undefined) {
      axios
        .get("https://dungeon-run.herokuapp.com/blackheart")
        .then(response => {
          this.currentRoom(response.data[0]._id);
          this.setState({ players: response.data,  });

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
  currentRoom = id => {
    axios
      .get(`https://dungeon-run.herokuapp.com/blackheart/${id}`)
      .then(response => {
        this.setState({ area: response.data });
        if (this.state.moved === true) {
          this.setState({ moved: false });
          let battle ={}
          if (this.state.area.monsters) {
            let randomInt = this.getRandomInt(700);
            if (randomInt <= 250 &&
              this.state.area.monsters.length >= 1) {

              battle.currentBattle = this.state.area.monsters[0]

            } else if (
              randomInt >= 251 &&
              randomInt <= 450 &&
              this.state.area.monsters.length >= 2
            ) {

              battle.currentBattle = this.state.area.monsters[1]
            } else if (
              randomInt >= 451 &&
              randomInt <= 600 &&
              this.state.area.monsters.length >= 3
            ) {
              battle.currentBattle = this.state.area.monsters[2]

            } else if (
              randomInt >= 600 &&
              randomInt <= 700 &&
              this.state.area.monsters.length >= 4
            ) {
              battle.currentBattle = this.state.area.monsters[3]

            }else if (
              randomInt >= 0 &&
              randomInt <= 1000 &&
              this.state.area.monsters.length >= 5
            ) {
              battle.currentBattle = this.state.area.monsters[4]

            } else {
              battle.currentBattle =[]
              this.setState({
                redirect: false
              });
            }
            axios
            .put(`https://dungeon-run.herokuapp.com/players/${this.state.player._id}`, battle)
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
      .get(`https://dungeon-run.herokuapp.com/players/${id}`)
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
      .put(`https://dungeon-run.herokuapp.com/players/${this.state.player._id}`, player)
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
 
    if(this.state.player.tempPlayer !== "no temp"){
    let id = this.state.player.tempPlayer 
      axios
      .delete(`https://dungeon-run.herokuapp.com/temps/${id}`)
      .then(response =>{
        let id = this.state.player.tempMonster 
        axios
        .delete(`https://dungeon-run.herokuapp.com/temps/${id}`)
        .then(response =>{
          
        })    
      })
    }
    let player = {};
    player.currentLocation = id;
    
    player.tempMonster = "no temp"
    player.tempPlayer = "no temp"
    player.defeatedName = "none";
    player.experienceGained = 0;
    player.itemWon = "none";
    player.leveled = false
    axios
      .put(`https://dungeon-run.herokuapp.com/players/${this.state.player._id}`, player)
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
      <br/>
      <div className="BlackHeart">
      {`You are currently in  the ${this.state.area.name}`}
      <br />
      <br />
      
      <i  onClick={() => this.move("North")} className="fas fa-chevron-circle-up movmenticons-styles"></i>
      <br />
      <div className="westEast-styles">
      <i  onClick={() => this.move("West")} className="fas fa-chevron-circle-left movmenticons-styles"></i>
      <i  onClick={() => this.move("East")} className="fas fa-chevron-circle-right movmenticons-styles"></i>
      </div>
      <i  onClick={() => this.move("South")} className="fas fa-chevron-circle-down movmenticons-styles"></i>

        <br/>
    <br/>
    <button className="btn" color="danger" onClick={this.toggle}>MAP</button>
    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
    <Map name={this.state.area.name}/>
    </Modal>
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
  winnings(){
    if(this.state.player.itemWon !== "none" && this.state.player.itemWon !== undefined && this.state.player.itemWon !=="lost"){
      return(<Fragment>
       <div className="winnings-styles">
       <div>{`${this.state.player.name} defeated the ${this.state.player.defeatedName}`}</div>
        <div>{`earing ${this.state.player.experienceGained} experience`}</div>
      <div>{`and looted ${this.state.player.itemWon}`}</div>
      
       </div> 
     </Fragment> )
    }else if (this.state.player.itemWon === "lost" && this.state.player.itemWon !== undefined) {
      return(
        <Fragment>
       <div className="losing-styles">
       <div>{`${this.state.player.name} was defeated by the ${this.state.player.defeatedName}`}</div>
        <div>{`earing ${this.state.player.experienceGained} experience`}</div>
      <div>{`You were returned to the ${this.state.area.name}`}</div>
      
       </div> 
     </Fragment> 
      )
    }
  }
  ding(){
    if(this.state.player.leveled ===true && this.state.player.leveled !== undefined){
      return(
        
      <div className="leveled-styles">{`Congradulations! you are now level ${this.state.player.level}`}
        </div>
      )
    }
  }
  render() {
    return (
    
      <Fragment>
        
          {this.renderRedirect(this.state.player._id)}
          {this.movmentRender()}
          {this.ding()}
          {this.winnings()}
       
      </Fragment>
    );
  }
}

export default BlackHeart;
