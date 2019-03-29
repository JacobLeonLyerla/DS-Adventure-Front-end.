import React, { Component, Fragment } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

import { Progress } from "reactstrap";
import {
  currentPlayer,
  setTemps,
  fetchTemps,
  startBattle,
  attacked,
  death,
  renderOpponent,
  renderAdventurer,
  renderStats
} from "../helpers/battleHelpers";
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
    tempMonHP: 0,
    redirect: false,

    battle: false
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/blackheart/${this.state.player._id}`} />;
    }
  };
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ RENDERS



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
            <div
              className={this.state.monster.rarity + "Stats-styles mid-battle"}
            >
              <div className={`spell ${this.state.player.class}-spell`}>
                {attack.name}
              </div>

              <div>
                <div className="damage">
                  Damage:{" "}
                  {Math.round(
                    attack.damage +
                      10 * this.state.player.level +
                      this.state.player.strength / 1.5 +
                      this.state.player.intellect / 2.5 +
                      this.state.player.agility / 2
                  )}
                </div>
                <div className="cost">
                  Cost:{" "}
                  {Math.round(
                    attack.cost * this.state.player.level -
                      this.state.player.intellect / 3 -
                      this.state.player.agility / 5 -
                      this.state.player.strength / 7
                  )}
                </div>
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
      .put(
        `https://dungeon-run.herokuapp.com/players/${this.state.player._id}`,
        spell
      )
      .then(response => {
        this.setState({ currentSpell: response.data.currentSpell });
      })
      .catch(err => {});
  }
  opponentAttacks() {
    return this.state.monster.attacks.map(attack => (
      <Fragment>
        <div className="opponentAttacks-styles">
          <div className="attackName-styles">{attack.name}</div>

          <div className="opponent-damage">
            Damage:{" "}
            {Math.round(
              attack.damage + (attack.damage * this.state.player.level) / 7
            )}
          </div>
          <div className="opponent-cost">Cost : {attack.cost}</div>
        </div>
      </Fragment>
    ));
  }
  renderOpponentStats() {
    if (this.state.monster.attacks !== []) {
      return (
        <Fragment>
          <div className={this.state.monster.rarity + "Stats-styles stats"}>
            <div className="portraitStats-styles">
              <div
                style={{ width: "80%" }}
                className={this.state.monster.rarity + "Rarity-styles"}
              >
                {this.state.monster.rarity}
              </div>
              <br />
              <div className="battleheader-styles">
                {this.state.monster.name}
              </div>

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
          <div
            className={this.state.monster.rarity + "Stats-styles stats"}
            style={{ borderRadius: "10vw 100vw 10vw 10vw" }}
          >
            <div>{`Strength: ${this.state.player.strength} Intellect: ${
              this.state.player.intellect
            } Agility: ${this.state.player.agility} `}</div>
            <div>{`Health: ${this.state.tempPlayer.health} Endurance: ${
              this.state.tempPlayer.endurance
            } `}</div>

            <div className="battleheader-styles">{this.state.player.name}</div>
          </div>
        </Fragment>
      );
    }
  }

  render() {
    this.currentPlayer = currentPlayer.bind(this);
    this.setTemps = setTemps.bind(this);
    this.fetchTemps = fetchTemps.bind(this);
    this.startBattle = startBattle.bind(this);
    this.attacked = attacked.bind(this);
    this.death = death.bind(this);
    this.renderOpponent = renderOpponent.bind(this);
    this.renderAdventurer = renderAdventurer.bind(this);
    this.renderStats = renderStats.bind(this);

    return (
      <Fragment>
        {this.renderRedirect()}
        <Row className="fighters">
          <Col md="5">
            {this.renderAdventurer()}
            <br />
            {this.renderAdventurerStats()}
          </Col>
          <Col md="5">
            {this.renderOpponent()}
            <br />
            {this.renderOpponentStats()}
          </Col>
        </Row>

        <Row className="middleBattle-styles">
          <Col md="3" className="mid-col">
            {this.adventurerAttacks()}
          </Col>

          <Col md="3" className="mid-col">
            {this.renderStats()}
          </Col>
          <Col md="3" className="mid-col">
            <div
              className={this.state.monster.rarity + "Stats-styles mid-battle"}
            >
              {this.opponentAttacks()}
            </div>
          </Col>
        </Row>
        <br />
      </Fragment>
    );
  }
}

export default Battle;
