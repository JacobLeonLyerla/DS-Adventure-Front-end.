import React, { Component, Fragment } from "react";
import { Redirect,Link} from "react-router-dom";
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
      .get(`http://localhost:5500/players/${id}`)
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
      .put(`http://localhost:5500/players/${id}`, player)
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
          <button onClick={() => this.updatePlayer(this.state.player._id)}>
            Update Character
          </button>
        </form>
      );
    }
    return (
      <Fragment>
        <Link to={`/dungeons/${this.state.player._id}`}><button>Dungeons</button></Link>
          <div className="info-styles">
        <div>
          Name: {this.state.player.name}
          <br />
          Class: {this.state.player.class} <br />
          Age: {this.state.player.age} <br />
          Gender: {this.state.player.gender}
          <br />
          <br />
          Combat Stats<br />
          Health: {` ${this.state.player.health}  `}
          Endurance: {`${this.state.player.endurance} `}
          <br/>
          Agiltiy: {` ${this.state.player.agility} `}
          intellect: {` ${this.state.player.intellect} `}
          Strength: {` ${this.state.player.strength} `}
          <br />
          <br />
          Bio: {this.state.player.bio}
          <br />
          <br/>
          <div>
 
            Equipment:
            <br/><br/>
            
              {this.itemsRender()}
          </div>
          <br/>
          <div>
 
            Bags:
            <br/><br/>
            
                {this.state.player.items.map(bag => (<Fragment>
                <div>{bag.name}</div><br/>
               

            </Fragment>))} 
          </div>
        </div>
        <button onClick={() => this.setState({ visible: !this.state.visible })}>
          Edit hero
        </button>
        <br />
        {element}

        <br />
        </div>
      </Fragment>
    );
  }
}

export default Info;
