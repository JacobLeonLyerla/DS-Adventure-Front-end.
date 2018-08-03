import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Battle extends Component {
  state = {
    player: {attacks:[]},
    monster: {attacks:[]},
    playerTemp: "",
    attacks:[],
    
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
  }
  currentPlayer = id => {
    axios
      .get(`http://localhost:5500/players/${id}`)
      .then(response => {
        this.setState({
          player: response.data,
          playerTemp: response.data,
         
          attacks:response.data.attacks
        });
        id = this.state.player.currentBattle[0]._id

       axios
       .get(`http://localhost:5500/monsters/${id}`)
       .then(response =>{
             this.setState({ monster: response.data})
       })
     
      })
      .catch(err => {});
  };
  check() {
  }
  renderOpponent() {
    return (<Fragment>
        <div className="oppenent-styles">
      <img
        className={this.state.monster.rarity}
        src={this.state.monster.photo}
      />
      </div>
   </Fragment> );
  }
  renderAdventurer() {
    return (<Fragment>
        <div className="adventurer-styles">
      <img
        className={this.state.player.class}
        src="https://static.giantbomb.com/uploads/scale_small/1/17172/1078894-paladin.jpg"
      />

      </div>
    </Fragment>);
  }

  

  
  renderStats() {
    return (<Fragment>
        
        <div className={this.state.monster.rarity +"Stats-styles"}>
        <div className={this.state.monster.rarity +"Rarity-styles"}>{this.state.monster.rarity}</div>
        <div className="battleheader-styles">{this.state.monster.name}</div>
        <br/>
        <div>{`Health: ${this.state.monster.health} Endurance: ${this.state.monster.endurance} `}</div>
               <br/>
   <div>{`Strength: ${this.state.player.strength} Intellect: ${this.state.player.intellect} Agility: ${this.state.player.agility} `}</div>
   <div>{`Health: ${this.state.player.health} Endurance: ${this.state.player.endurance} `}</div>  
   <br/>
   <div className="battleheader-styles">{this.state.player.name}</div>
      </div>
    </Fragment>);
  }

  adventurerAttacks(){

    return this.state.attacks.map(attack => (<Fragment>
        <div  className={this.state.monster.rarity +"Stats-styles"}>{attack.name}
        <div>{`cost: ${attack.cost}`}</div>
        <br/>
        <div>damage: {attack.damage}</div>
        <br/>
        <div>{attack.description}</div>
        <br/>
        attack<br/>
<img className="attack-styles" src="https://d30y9cdsu7xlg0.cloudfront.net/png/12864-200.png"/>
        
        
        </div>
        
    </Fragment>))
}
opponentAttacks(){
    return this.state.monster.attacks.map(attack => (<Fragment>
        <div  className={this.state.monster.rarity +"Stats-styles"}>{attack.name}
        <div>{`cost: ${attack.cost}`}</div>
        <br/>
        <div>damage: {attack.damage}</div>
        <br/>
        <div>{attack.description}</div>
        <br/>
        attack<br/>
<img className="attack-styles" src="https://d30y9cdsu7xlg0.cloudfront.net/png/12864-200.png"/>
        
        
        </div>
        
    </Fragment>))
}

  render() {
    return (
      <Fragment>
        {this.renderOpponent()}
        <br /><div className="middleBattle-styles">
        {this.adventurerAttacks()}
        {this.renderStats()}
         {this.opponentAttacks()}
        </div>
        <br/>
        {this.renderAdventurer()}
      </Fragment>
    );
  }
}

export default Battle;
