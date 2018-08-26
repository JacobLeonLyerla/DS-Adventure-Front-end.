import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import paladin from "./img/paladinportrait.jpg";
import rogue from "./img/rogueportrait.jpg";
import mage from "./img/mageportrait.jpg";
import warrior from "./img/warriorportrait.jpg";
import ranger from "./img/rangerportrait.jpg";
import necro from "./img/necromancerportrait.jpg";
import {Progress} from'reactstrap'

class Battle extends Component {
  state = {
    player: { attacks: [], tempPlayer: { _id: "" } },
    monster: { attacks: [] },
    tempPlayer: "",
    tempMonster: "",
    attacks: [],
    attacked: false,
    monsterAttacks: [],
    currentSpell: 0,
    currentLocation: "",
    tempMonHP:0,
    redirect: false
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
  }
  currentPlayer = id => {
    axios
      .get(`https://dungeon-run.herokuapp.com/players/${id}`)
      .then(response => {
        this.setState({
          player: response.data,
          attacks: response.data.attacks,
          currentLocation: response.data.currentLocation._id
        });
        id = this.state.player.currentBattle[0]._id;

        axios.get(`https://dungeon-run.herokuapp.com/monsters/${id}`).then(response => {
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
      .post(`https://dungeon-run.herokuapp.com/temps`, temp)
      .then(response => {
        temp = {};
        let id = response.data._id;
        temp.health = this.state.monster.health;
        temp.endurance = this.state.monster.endurance;
        axios
          .post(`https://dungeon-run.herokuapp.com/temps`, temp)
          .then(response => {
            temp = {};
            temp.tempPlayer = id;
            temp.tempMonster = response.data._id;
            axios
              .put(
                `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`,
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
      .get(`https://dungeon-run.herokuapp.com/temps/${id}`)
      .then(response => {
        this.setState({ tempPlayer: response.data });
      })
      .catch(err => {});
    id = this.state.player.tempMonster;
    if (this.state.player.tempMonster._id !== undefined) {
      id = this.state.player.tempMonster._id;
    }
    axios
      .get(`https://dungeon-run.herokuapp.com/temps/${id}`)
      .then(response => {
        let raisedhp = Math.round(response.data.health +( response.data.health * this.state.player.level /25))
        this.setState({ tempMonster: response.data, tempMonHP:raisedhp });
      })
      .catch(err => {});
  }
  startBattle(damage, cost, hitChance, name) {
   
      hitChance = Math.round(
        hitChance +
          this.state.player.agility * 1 +
          this.state.player.intellect * 0.5 +
          this.state.player.strength * 0.3 +
          (this.state.player.level - this.state.monster.level) * 10
      );
      let hit = Math.floor(Math.random() * Math.floor(100));
      let dmg = {};
      let id = this.state.player.tempMonster;
      if (this.state.player.tempMonster._id !== undefined) {
        id = this.state.player.tempMonster._id;
      }

      if (
        this.state.tempPlayer.endurance -
          Math.round(
            cost *this.state.player.level  - 
              this.state.player.intellect / 3 -
              this.state.player.agility / 5 -
              this.state.player.strength / 7 * this.state.player.level
          ) >
        0
      ) {
        if (hit <= hitChance) {
          damage = Math.round(
            damage +
              10 * this.state.player.level +
              this.state.player.strength / 1.5 +
              this.state.player.intellect / 2.5 +
              this.state.player.agility / 2
          );

          dmg.combat = "hit";
          dmg.health = this.state.tempMonHP - damage;
        }
        if (hit > hitChance) {
          dmg.combat = "missed";
        }
      } else {
        dmg.combat = "out of endurance to cast";
      }
      dmg.attacked = true;
      dmg.spellUsed = name;
      axios
        .put(`https://dungeon-run.herokuapp.com/temps/${id}`, dmg)
        .then(response => {
          this.setState({ tempMonster: response.data, tempMonHP:response.data.health });
          if (response.data.health <= 0) {
            this.death("Monster");
          }
          let id = this.state.player.tempPlayer;
          if (this.state.player.tempPlayer._id !== undefined) {
            id = this.state.player.tempPlayer._id;
          }

          let cast = {};
          if (
            this.state.tempPlayer.endurance -
              Math.round(
                cost *this.state.player.level  -
                  this.state.player.intellect / 3 -
                  this.state.player.agility / 5 -
                  this.state.player.strength / 7
              ) >
            0
          ) {
            cast.endurance =
              this.state.tempPlayer.endurance -
              Math.round(
                cost *this.state.player.level  -
                  this.state.player.intellect / 3 -
                  this.state.player.agility / 5 -
                  this.state.player.strength / 7
              );
          } else {
            cast.endurance = this.state.player.endurance
          }
          axios
            .put(`https://dungeon-run.herokuapp.com/temps/${id}`, cast)
            .then(response => {
              this.setState({ tempPlayer: response.data });
              if(this.state.tempMonHP >0){
              this.attacked();
              }
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
      let remainingEnd = this.state.tempMonster.endurance - damage[0].cost;
      if (this.state.tempMonster.endurance - damage[0].cost > 0) {
        attack.endurance = this.state.tempMonster.endurance - damage[0].cost;
      } else {
        attack.endurance = this.state.monster.level * 75;
      }
      axios
        .put(`https://dungeon-run.herokuapp.com/temps/${id}`, attack)
        .then(response => {
          this.setState({ tempMonster: response.data });
          let id = this.state.player.tempPlayer;
          if (this.state.player.tempPlayer._id !== undefined) {
            id = this.state.player.tempPlayer._id;
          }
          let hit = Math.floor(Math.random() * Math.floor(100));

          let dmg = {};
          if (remainingEnd > 0) {
            if (
              hit <=
              damage[0].hitChance * 2 +
                this.state.monster.level -
                this.state.player.level 
            ) {
              dmg.health = this.state.tempPlayer.health - Math.round(damage[0].damage * this.state.player.level *50 ) ;
              dmg.combat = "hit";
            } else {
              dmg.combat = "missed";
            }
          } else {
            dmg.combat = "out of endurance to cast";
          }
          dmg.spellUsed = damage[0].name;
          axios
            .put(`https://dungeon-run.herokuapp.com/temps/${id}`, dmg)
            .then(response => {
              this.setState({ tempPlayer: response.data });
              if (response.data.health <= 0) {
                this.death("Player");
              }
              //window.location.reload();
            })
            .catch(err => {});
        })
        .catch(err => {});
    }
  }

  death(died) {
    if (died === "Player") {
      let fail = {};
      fail.defeatedName = this.state.monster.name;
      fail.experienceGained = 0;
      fail.itemWon = "lost";
      fail.currentLocation = "5b60093b9a47813e2cdd30d1";
      axios
        .put(`https://dungeon-run.herokuapp.com/players/${this.state.player._id}`, fail)
        .then(response => {
          this.setState({
            currentlocation: response.data.currentlocation,
            redirect: true
          });
        });
    } else {
      let index = Math.floor(
        Math.random() * Math.floor(this.state.monster.items.length)
      );
      let item = this.state.monster.items[index];
      this.state.player.items.push(this.state.monster.items[index]);
      let playerlevel = this.state.player.level;
      let victory = {};
      if (
        this.state.player.experience + this.state.monster.experience >=
        playerlevel * 1000
      ) {
        victory.level = playerlevel + 1;
        victory.leveled = true;
        victory.health = this.state.player.health +  playerlevel + 1 *100
        victory.endurance = this.state.player.endurance + playerlevel +1 *100
      }

      let myItems = this.state.player.items;

      victory.defeatedName = this.state.monster.name;
      victory.experienceGained = this.state.monster.experience;
      victory.itemWon = item.name;
      victory.items = myItems;
      victory.experience =
        this.state.player.experience + this.state.monster.experience;

      axios
        .put(`https://dungeon-run.herokuapp.com/players/${this.state.player._id}`, victory)
        .then(response => {
          this.setState({
            currentlocation: response.data.currentlocation,
            redirect: true
          });
        });
    }
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/blackheart/${this.state.player._id}`} />;
    }
  };
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
            src={this.pickPortrait(this.state.player.class)}
          />
        </div>
      </Fragment>
    );
  }
  pickPortrait(classname){
    if (classname === "Paladin") return paladin;
    if (classname === "Ranger") return ranger;
    if (classname === "Mage") return mage;
    if (classname === "Necromancer") return necro;
    if (classname === "Warrior") return warrior;
    if (classname === "Rogue") return rogue;

  }

  renderStats() {
    let currentpercent = Math.round( this.state.tempMonHP/(this.state.monster.health +Math.round(this.state.monster.health * this.state.player.level /25)) *100)
    let currentPlayerhp = Math.round( this.state.tempPlayer.health/this.state.player.health *100)
    let monsterend = Math.round( this.state.tempMonster.endurance/this.state.monster.endurance *100)
    let playerend = Math.round( this.state.tempPlayer.endurance/this.state.player.endurance *100)
    return (
      <Fragment>

        <div className={this.state.monster.rarity + "Stats-styles"}>
          <div >
          <Progress color="success" value ={currentpercent}> {`${this.state.tempMonHP}`}</Progress>   
          <br/>
          <Progress color="info" value ={monsterend}> {`${this.state.tempMonster.endurance}`}</Progress>  
          </div>
          <br />
          <div className="combatLog-styles">
            <div>{`${this.state.monster.name} ${
              this.state.tempPlayer.combat
            } with ${this.state.tempPlayer.spellUsed}`}</div>
            <br />
            <div>{`${this.state.player.name} ${
              this.state.tempMonster.combat
            } with ${this.state.tempMonster.spellUsed}`}</div>
          </div>
    <Progress color="info" value ={playerend}> {`${this.state.tempPlayer.endurance}`}</Progress> 
          <br/> 
          <Progress color="success" value ={currentPlayerhp}> {`${this.state.tempPlayer.health}`}</Progress>  
          <div>
        
          </div>
        </div>
      </Fragment>
    );
  }

  // adventurerAttacks() {
  //   return this.state.attacks.map(attack => (
  //     <Fragment>
  //       <div className={this.state.monster.rarity + "Stats-styles"}>
  //         {attack.name}

  //         <div>{`cost: ${Math.round(
  //           attack.cost -
  //             this.state.player.intellect / 3 -
  //             this.state.player.agility / 5 -
  //             this.state.player.strength / 7
  //         )}`}</div>
  //         <br />
  //         <div>
  //           damage:{" "}
  //           {Math.round(
  //             attack.damage +
  //               10 * this.state.player.level +
  //               this.state.player.strength / 1.5 +
  //               this.state.player.intellect / 2.5 +
  //               this.state.player.agility / 2
  //           )}
  //         </div>
  //         <br />
  //         <div>{attack.description}</div>
  //         <br />
  //         attack<br />
  //         <img
  //           onClick={() => this.startBattle(attack.damage, attack.cost)}
  //           className="attack-styles"
  //           src="https://d30y9cdsu7xlg0.cloudfront.net/png/12864-200.png"
  //         />
  //       </div>
  //     </Fragment>
  //   ));
  // }
  adventurerAttacks() {
    let attack = { name: "" };
    if (this.state.attacks !== []) {
      attack = this.state.attacks[this.state.currentSpell];
      if (attack !== undefined) {
        return (
          <Fragment>
            <div className={this.state.monster.rarity + "Stats-styles"}>
              {attack.name}
              <br />
              <br />
              <div>
                Damage:{" "}
                {Math.round(
                  attack.damage +
                    10 * this.state.player.level +
                    this.state.player.strength / 1.5 +
                    this.state.player.intellect / 2.5 +
                    this.state.player.agility / 2
                )}
                <br />Cost:{" "}
                {Math.round(
                  attack.cost *this.state.player.level 
                  -
                    this.state.player.intellect / 3 -
                    this.state.player.agility / 5 -
                    this.state.player.strength / 7 
                )}
              </div>
              <br />
              <br />
              <div className="centerSpell-styles">
                <i
                  onClick={() => this.changeSpell("Left")}
                  class="fas fa-long-arrow-alt-left"
                />
                <img
                  onClick={() =>
                    this.startBattle(
                      attack.damage,
                      attack.cost,
                      attack.hitChance,
                      attack.name
                    )
                  }
                  className="attack-styles"
                  src="https://d30y9cdsu7xlg0.cloudfront.net/png/12864-200.png"
                />
                <i
                  onClick={() => this.changeSpell("Right")}
                  class="fas fa-long-arrow-alt-right"
                />
              </div>
              <div style={{ color: "lightcoral" }}>Attack</div>
              <br />
              <br />
              <div>{attack.description}</div>
            </div>
          </Fragment>
        );
      }
    }
  }
  // changeSpell(direction) {
  //   let spell = {};
  //   if (direction === "Right") {
  //     if (this.state.player.currentSpell + 1 < this.state.attacks.length) {
  //       spell.currentSpell = this.state.player.currentSpell + 1;
  //     } else {
  //       spell.currentSpell = 0;
  //     }
  //   } else {
  //     if (this.state.player.currentSpell - 1 !== -1) {
  //       spell.currentSpell = this.state.player.currentSpell - 1;
  //     } else {
  //       spell.currentSpell = this.state.attacks.length - 1;
  //     }
  //   }
  //   axios
  //     .put(`http://localhost:5500/players/${this.state.player._id}`, spell)
  //     .then(response => {
  //       window.location.reload();
  //     })
  //     .catch(err => {});
  // }
  changeSpell(direction) {
    let spell = {};
    if (direction === "Right") {
      if (this.state.currentSpell + 1 < this.state.attacks.length) {
        spell.currentSpell = this.state.currentSpell + 1;
      } else {
        spell.currentSpell = 0;
      }
    } else {
      if (this.state.currentSpell - 1 !== -1) {
        spell.currentSpell = this.state.currentSpell - 1;
      } else {
        spell.currentSpell = this.state.attacks.length - 1;
      }
    }
    axios
      .put(`https://dungeon-run.herokuapp.com/players/${this.state.player._id}`, spell)
      .then(response => {
        this.setState({ currentSpell: response.data.currentSpell });
      })
      .catch(err => {});
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
            Damage: {Math.round(attack.damage * this.state.player.level *50) }
            <br />
            <br />
            <div>{attack.description}</div>
          </div>
        </div>
      </Fragment>
    ));
  }
  renderOpponentStats() {
    if (this.state.monster.attacks !== []) {
      return (
        <Fragment>
          <div className={this.state.monster.rarity + "Stats-styles"}>
          <div className="portraitStats-styles">
            <div className={this.state.monster.rarity + "Rarity-styles"}>
              {this.state.monster.rarity}
            </div>
            <br />
            <div className="battleheader-styles">{this.state.monster.name}</div>
            <br />
            
            <div>{`Health: ${this.state.tempMonHP} Endurance: ${
              this.state.tempMonster.endurance
            } `}</div>
            </div>
          </div>
        </Fragment>
      );
    }
  }
  renderAdventurerStats() {
    if (this.state.monster.attacks !== []) {
      return (
        <Fragment>
          <div className={this.state.monster.rarity + "Stats-styles"}>
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
  }

  render() {
    return (
      <Fragment>
        {this.renderRedirect()}
        {this.renderOpponent()}
        <br />
        {this.renderOpponentStats()}
        <div className="middleBattle-styles">
          {this.adventurerAttacks()}
          {this.renderStats()}
          {this.opponentAttacks()}
        </div>
        <br />
        {this.renderAdventurerStats()}
        {this.renderAdventurer()}
      </Fragment>
    );
  }
}

export default Battle;
