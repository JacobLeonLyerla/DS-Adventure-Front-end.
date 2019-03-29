import React, { Component, Fragment } from "react";
import axios from "axios";
import { Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";

import {
  currentPlayer,
  setTemps,
  fetchTemps,
  startBattle,
  attacked,
  death,
  renderOpponent,
  renderAdventurer,
  renderStats,
  adventurerAttacks,
  changeSpell,
  opponentAttacks,
  renderOpponentStats,
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
    this.adventurerAttacks = adventurerAttacks.bind(this);
    this.changeSpell = changeSpell.bind(this);
    this.opponentAttacks = opponentAttacks.bind(this);
    this.renderOpponentStats = renderOpponentStats.bind(this);

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
