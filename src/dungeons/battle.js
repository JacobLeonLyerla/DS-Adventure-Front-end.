import React, { Component, Fragment } from "react";
import {
  battleLayout,
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
  renderAdventurerStats,
  renderRedirect
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

  render() {
    this.battleLayout = battleLayout.bind(this);
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
    this.renderAdventurerStats = renderAdventurerStats.bind(this);
    this.renderRedirect = renderRedirect.bind(this);

    return <Fragment>{this.battleLayout()}</Fragment>;
  }
}

export default Battle;
