import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Battle extends Component {
  state = {
    player: { attacks: [], tempPlayer:{_id:""} },
    monster: { attacks: [] },
    tempPlayer: "",
    tempMonster:"",
    attacks: [],
    attacked: false,
    monsterAttacks: []
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
          attacks: response.data.attacks
        });
        id = this.state.player.currentBattle[0]._id;

        axios.get(`http://localhost:5500/monsters/${id}`).then(response => {
          this.setState({
            monster: response.data,
            monsterAttacks: response.data.attacks
          });
          if (this.state.player.tempPlayer === "no temp") {
            this.setTemps();
          } else {
            this.fetchTemps();
          }
        });
      })
      .catch(err => {});
  };

  setTemps() {
    // we get the id from the player  on state
    let id = this.state.player._id;
    // setting up an object to post in
    let temp = {};
    // we post in the data we wwant to save inside of the temp collection
    temp.health = this.state.player.health;
    temp.endurance = this.state.player.endurance;
    // if the tempPlayer that is set to state is not defined than allow this to run,
    // we set it to undefined when we move rooms so if we are moving into a room and starting a battle
    // this should always be un defined

    axios
      .post(`http://localhost:5500/temps`, temp)
      .then(response => {

        temp = {};
        let id = response.data._id;
        temp.health = this.state.monster.health;
        temp.endurance = this.state.monster.endurance;
        axios
          .post(`http://localhost:5500/temps`, temp)
          .then(response => {
            temp = {};
            temp.tempPlayer = id;
            temp.tempMonster = response.data._id;
            axios
              .put(
                `http://localhost:5500/players/${this.state.player._id}`,
                temp
              )
              .then(response => {
                this.setState({
                  player: response.data
                });

                this.fetchTemps();
              })
              .catch(err => {});
          })
          .catch(err => {});
      })
      .catch(err => {});
  }

  fetchTemps() {
    let id = this.state.player.tempPlayer;
    axios
      .get(`http://localhost:5500/temps/${id}`)
      .then(response => {
        this.setState({ tempPlayer: response.data });
      })
      .catch(err => {});
    id = this.state.player.tempMonster;
    if (this.state.player.tempMonster._id !== undefined) {
      id = this.state.player.tempMonster._id;
    }
    axios
      .get(`http://localhost:5500/temps/${id}`)
      .then(response => {
        this.setState({ tempMonster: response.data });
      })
      .catch(err => {});
  }
  damageOpponent(damage, cost) {

    damage = Math.round(damage  +
      10 * this.state.player.level +
      this.state.player.strength / 1.5 +
      this.state.player.intellect / 2.5 +
      this.state.player.agility / 2);
     
  console.log(this.state.tempMonster.health - damage )
    if( (this.state.tempMonster.health - damage) <=0 ){
    alert(`You killed a ${this.state.monster.name}`)
    }
    let id = this.state.player.tempMonster;
    if (this.state.player.tempMonster._id !== undefined) {
      id = this.state.player.tempMonster._id;
    }
    let dmg = {};
    dmg.health = this.state.tempMonster.health - damage
     dmg.attacked = true;
     axios
      .put(`http://localhost:5500/temps/${id}`, dmg)
      .then(response => {
        this.setState({ tempMonster: response.data });
        let id = this.state.player.tempPlayer;
        if (this.state.player.tempPlayer._id !== undefined) {
          id = this.state.player.tempPlayer._id;
        }

        let cast = {};
        cast.endurance = this.state.tempPlayer.endurance - Math.round(cost -
            this.state.player.intellect / 3 -
            this.state.player.agility / 5 -
            this.state.player.strength / 7
        );

        axios
          .put(`http://localhost:5500/temps/${id}`, cast)
          .then(response => {
            this.attacked();
          })
          .catch(err => {});
      })
      .catch(err => {});
  }
  attacked() {
    if (this.state.tempMonster.attacked === true) {
      let id = this.state.player.tempMonster;
      if (this.state.player.tempMonster._id !== undefined) {
        id = this.state.player.tempMonster._id;
      }
      let damage = this.state.monsterAttacks.filter(attack => {
        let index = Math.floor(
          Math.random() * Math.floor(this.state.monsterAttacks.length)
        );

        return attack === this.state.monsterAttacks[index];
      });

      let attack = {};
      attack.attacked = false;
      attack.endurance = this.state.tempMonster.endurance - damage[0].cost;

      axios
        .put(`http://localhost:5500/temps/${id}`, attack)
        .then(response => {
          let id = this.state.player.tempPlayer;
          if (this.state.player.tempPlayer._id !== undefined) {
            id = this.state.player.tempPlayer._id;
          }

          let dmg = {};
          dmg.health = this.state.tempPlayer.health - damage[0].damage;
          axios
            .put(`http://localhost:5500/temps/${id}`, dmg)
            .then(response => {
              window.location.reload();
            })
            .catch(err => {});
        })
        .catch(err => {});
    }
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ RENDERS
  renderOpponent() {
    return (
      <Fragment>
        <div className="oppenent-styles">
          <img
            className={this.state.monster.rarity}
            src={this.state.monster.photo}
          />
        </div>
      </Fragment>
    );
  }

  renderAdventurer() {
    return (
      <Fragment>
        <div className="adventurer-styles">
          <img
            className={this.state.player.class}
            src="https://static.giantbomb.com/uploads/scale_small/1/17172/1078894-paladin.jpg"
          />
        </div>
      </Fragment>
    );
  }

  renderStats() {
    return (
      <Fragment>
        <div className={this.state.monster.rarity + "Stats-styles"}>
          <div className={this.state.monster.rarity + "Rarity-styles"}>
            {this.state.monster.rarity}
          </div>
          <br />
          <div className="battleheader-styles">{this.state.monster.name}</div>
          <br />
          <div>{`Health: ${this.state.tempMonster.health} Endurance: ${
            this.state.tempMonster.endurance
          } `}</div>
          <br />
          <div>{`Strength: ${this.state.player.strength} Intellect: ${
            this.state.player.intellect
          } Agility: ${this.state.player.agility} `}</div>
          <div>{`Health: ${this.state.tempPlayer.health} Endurance: ${
            this.state.tempPlayer.endurance
          } `}</div>
          <br />
          <div className="battleheader-styles">{this.state.player.name}</div>
        </div>
      </Fragment>
    );
  }

  adventurerAttacks() {
    return this.state.attacks.map(attack => (
      <Fragment>
        <div className={this.state.monster.rarity + "Stats-styles"}>
          {attack.name} 
        
          <div>{`cost: ${Math.round(
            attack.cost -
              this.state.player.intellect / 3 -
              this.state.player.agility / 5 -
              this.state.player.strength / 7
          )}`}</div>
          <br />
          <div>
            damage:{" "}
            {Math.round(
              attack.damage +
                10 * this.state.player.level +
                this.state.player.strength / 1.5 +
                this.state.player.intellect / 2.5 +
                this.state.player.agility / 2
            )}
          </div>
          <br />
          <div>{attack.description}</div>
          <br />
          attack<br />
          <img
            onClick={() => this.damageOpponent(attack.damage, attack.cost)}
            className="attack-styles"
            src="https://d30y9cdsu7xlg0.cloudfront.net/png/12864-200.png"
          />
        </div>
      </Fragment>
    ));
  }

  opponentAttacks() {
    return this.state.monster.attacks.map(attack => (
      <Fragment>
        <div className={this.state.monster.rarity + "Stats-styles"}>
          <div className="opponentAttacks-styles">
            <div>{`${this.state.monster.name} cast `}</div>
            <div className="attackName-styles">{attack.name}</div>
            <br />
            Cost : {attack.cost}
            <br />
            Damage: {attack.damage}
            <br />
            <br />
            <div>{attack.description}</div>
          </div>
        </div>
      </Fragment>
    ));
  }

  render() {
    return (
      <Fragment>
        {this.renderOpponent()}
        <br />
        <div className="middleBattle-styles">
          {this.adventurerAttacks()}
          {this.renderStats()}
          {this.opponentAttacks()}
        </div>
        <br />
        {this.renderAdventurer()}
      </Fragment>
    );
  }
}

export default Battle;
