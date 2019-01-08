import React, { Component, Fragment } from "react";
import { Redirect,Link} from "react-router-dom";
import{Progress} from "reactstrap";
import axios from "axios";

class Info extends Component {

  state = {
    player: {gear:[],items:[]},
    name: "",
    age: "",
    class: "",
    bio: "",
    password: "",
    gender: "",
    redirect: false,
    visible: false
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    this.setCurrentPlayer(id);
  }
  setCurrentPlayer = id => {
    axios
      .get(`https://dungeon-run.herokuapp.com/players/${id}`)
      .then(response => {
        this.setState({ player: response.data });
      })
      .catch(err => {
      });
  };

  updatePlayer = id => {
    const player = {};
    if (this.state.name !== "") {
      player.name = this.state.name;
    }
    if (this.state.bio !== "") {
      player.bio = this.state.bio;
    }
    axios
      .put(`https://dungeon-run.herokuapp.com/players/${id}`, player)
      .then(response => {
        this.setState({
          name: "",
          bio: ""
        });
        this.setCurrentPlayer(id);
      })
      .catch(err => {
      });
  };
  handleInput = input => {
    this.setState({ [input.target.name]: input.target.value });
  };
  handleClass = input => {
    if (this.state.class === "") {
      this.setState({ class: input });
    }
  };
itemsRender(){
  if(this.state.player.items !==[]){
  return (this.state.player.items.map(item => (<Fragment>
                
    <div>{item.name}</div><br/>
   

</Fragment>)) 
  )
}

}
gearRender(){
  if(this.state.player.items !==[]){
  return (this.state.player.gear.map(item => (<Fragment>
                
    <div>{item.name}</div><br/>
   

</Fragment>)) 
  )
}

}
prgoressColor(value) {
  if (value > 70){
    return "progress-high"
  }else if( value >50){
    return "progress-good"
  } else if(value> 30){
    return"progress-mid"
  
  }else{
    return "progress-low"
  }
  
    }
  render() {
    let element = null;
    if (this.state.visible) {
      element = (
        <form>
          <label>
            Name:
            
            <input
              name="name"
              placeholder="Enter a character name"
              value={this.state.name}
              onChange={this.handleInput}
            />
          </label><br/>
          Lore:
          <input
            name="bio"
            placeholder="Give your adventurer a backstory"
            value={this.state.bio}
            onChange={this.handleInput}
          />
          <br />
          {/* <button onClick={() => this.updatePlayer(this.state.player._id)}>
            Update Character
          </button> */}
        </form>
      );
    }  
    let health = this.state.player.health
    let endurance = this.state.player.endurance
    let intellect = this.state.player.intellect
    let strength = this.state.player.strength
    let agility = this.state.player.agility
    let total = this.state.player.health + this.state.player.endurance + this.state.player.intellect + this.state.player.strength + this.state.player.agility
  
    return (
      <Fragment><div className="loginbackground-styles">
       <br/>
          <div className="info-styles">
        <div>
         
         <div className="name-info">{this.state.player.name}
         </div>
          <div className={`${this.state.player.class}class-info`}>
           {this.state.player.class} <br />
    </div>
       


{(health * 2) / 5 > 0 ? (
  <Fragment>
    <div className="text-left">Health</div>
    <Progress
    className={`${this.prgoressColor(Math.round((health / total) * 100))} progress-info`}
      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
      value={Math.round((health / total) * 100)}
    >
      {health}
    </Progress>
  </Fragment>
) : (
  <Fragment />
)}

{(endurance * 2) / 5 > 0 ? (
  <Fragment>
    <div className="text-left">Endurance</div>
    <Progress
    className={`${this.prgoressColor(Math.round((endurance / total) * 100))} progress-info`}
      style={{
        fontFamily: " Arial, Helvetica, sans-serif",
      
      }}
      value={Math.round((endurance / total) * 100)}
    >
      {endurance}
    </Progress>
  </Fragment>
) : (
  <Fragment />
)}

{(intellect * 2) / 5 > 0 ? (
  <Fragment>
    <div className="text-left">Intellect</div>
    <Progress
  className={`${this.prgoressColor(Math.round((intellect / total) * 100))} progress-info`}
      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
      value={Math.round((intellect / total) * 100)}
    >
      {intellect}
    </Progress>
  </Fragment>
) : (
  <Fragment />
)}

{(strength * 2) / 5 > 0 ? (
  <Fragment>
    <div className="text-left">Strength</div>
    <Progress
 className={`${this.prgoressColor(Math.round((strength / total) * 100))} progress-info`}
      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
      value={Math.round((strength / total) * 100)}
    >
      {strength}
    </Progress>
  </Fragment>
) : (
  <Fragment />
)}

{(agility * 2) / 5 > 0 ? (
  <Fragment>
    <div className="text-left">Agility</div>
    <Progress
className={`${this.prgoressColor(Math.round((agility / total) * 100))} progress-info`}
      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
      value={Math.round((agility / total) * 100)}
    >
      {agility}
    </Progress>
  </Fragment>
) : (
  <Fragment />
)}

          <br />
          Lore
          <div className="lore" >
          {this.state.player.bio}
          </div>
         
          {/* <div>
 
            Equipment:
            <br/><br/>
            
              {this.itemsRender()}
          </div> */}
          <br/>
          {/* <div>
 
            Bags:
            <br/><br/>
            
                {this.state.player.items.map(bag => (<Fragment>
                <div>{bag.name}</div><br/>
               

            </Fragment>))} 
          </div> */}
        </div>
        
        {/* <button onClick={() => this.setState({ visible: !this.state.visible })}>
          Edit hero
        </button> */}
        <br />
        {element}

        <br />
        </div>
        <br/>
        <Link to={`/dungeons/${this.state.player._id}`}><button className="btn dungeons-styles" >Dungeons</button></Link>
        </div>
      </Fragment>
    );
  }
}

export default Info;
