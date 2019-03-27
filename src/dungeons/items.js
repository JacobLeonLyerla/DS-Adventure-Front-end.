import React, { Component, Fragment } from "react";


import { Progress } from "reactstrap";

import {
  currentRoom,
  currentPlayer,
  deleteItem,
  removeEquipment,
  classIcon
} from "../helpers/itemsHelper";

class Items extends Component {
  state = {
    player: {
      gear: [{ name: "" }],

      items: [{ name: "" }]
    },

    area: { items: [] }
  };

  componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
  }

  checkDuplicate(type, loot) {
    let dup = false;

    if (type === "Inventory") {
      this.state.player.gear.forEach(curItem => {
        if (curItem.slot === loot.slot) {
          dup = true;
        }
        if (loot.slot === "shield") {
          if (
            curItem.slot === "offHand" ||
            curItem.slot === "weaponTwoHand" ||
            curItem.slot === "charm"
          ) {
            dup = true;
          }
        }

        if (loot.slot === "offHand") {
          if (
            curItem.slot === "shield" ||
            curItem.slot === "weaponTwoHand" ||
            curItem.slot === "charm"
          ) {
            dup = true;
          }
        }

        if (loot.slot === "weaponTwoHand") {
          if (
            curItem.slot === "offHand" ||
            curItem.slot === "shield" ||
            curItem.slot === "charm"
          ) {
            dup = true;
          }
        }

        if (loot.slot === "charm") {
          if (
            curItem.slot === "offHand" ||
            curItem.slot === "weaponTwoHand" ||
            curItem.slot === "shield"
          ) {
            dup = true;
          }
        }

        if (loot.slot === "weaponTwoHand" && curItem.slot === "weaponOneHand") {
          dup = true;
        }

        if (
          curItem.slot === "weaponOneHand" &&
          curItem.slot === "weaponTwoHand"
        ) {
          dup = true;
        }
      });
    }

    if (dup === false) {
      this.deleteItem(type, loot);
    } else {
      if (
        loot.slot === "shield" ||
        loot.slot === "offHand" ||
        loot.slot === "charm"
      ) {
        return alert(
          "offHand, Shields and Charms all count as secondary weapons. you can only have one, and only if you don't have a Two Handed Weapon"
        );
      } else {
        return alert(`You cannot add another ${loot.slot} to your equipment`);
      }
    }
  }

  prgoressColor(value) {
    if (value > 70) {
      return "progress-high";
    } else if (value > 50) {
      return "progress-good";
    } else if (value > 30) {
      return "progress-mid";
    } else {
      return "progress-low";
    }
  }

  renderEquipment() {
    if (this.state.player.name !== undefined && this.state.player.name !== "") {
      return this.state.player.gear.map(item => {
        let total =
          item.health +
          item.endurance +
          item.intellect +
          item.strength +
          item.agility;

        return (
          <Fragment>
            <div
              className={`${item.rarity}itemCard-styles itemCard-styles ${
                this.state.player[item.slot] === "none" ? "not-equipped" : ""
              }`}
            >
              <div className="move-styles">
                <div
                  className="add-styles
      "
                  onClick={() => this.checkDuplicate("Equip", item)}
                >
                  <i class="fas fa-level-down-alt" />
                </div>
              </div>
              <div className="equip-Message">
                {this.state.player[item.slot] === "none" ? (
                  <div>Not Equipped</div>
                ) : (
                  ""
                )}
              </div>

              <div className="header-card">{item.name}</div>
              {/* style={{fontFamily:" Arial, Helvetica, sans-serif"}} */}

              <div
                style={{
                  fontFamily: " Arial, Helvetica, sans-serif"
                }}
              >
                {item.slot}
              </div>

              <div className={"progress-container"}>
                <br />

                {(item.health * 2) / 5 > 0 ? (
                  <Fragment>
                    <div className="text-left">Health</div>
                    <Progress
                      className={this.prgoressColor(
                        Math.round((item.health / total) * 100)
                      )}
                      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                      value={Math.round((item.health / total) * 100)}
                    >
                      {item.health}
                    </Progress>
                  </Fragment>
                ) : null}

                {(item.endurance * 2) / 5 > 0 ? (
                  <Fragment>
                    <div className="text-left">Endurance</div>
                    <Progress
                      className={this.prgoressColor(
                        Math.round((item.endurance / total) * 100)
                      )}
                      style={{
                        fontFamily: " Arial, Helvetica, sans-serif"
                      }}
                      value={Math.round((item.endurance / total) * 100)}
                    >
                      {item.endurance}
                    </Progress>
                  </Fragment>
                ) : null}

                {(item.intellect * 2) / 5 > 0 ? (
                  <Fragment>
                    <div className="text-left">Intellect</div>
                    <Progress
                      className={this.prgoressColor(
                        Math.round((item.intellect / total) * 100)
                      )}
                      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                      value={Math.round((item.intellect / total) * 100)}
                    >
                      {item.intellect}
                    </Progress>
                  </Fragment>
                ) : (
                  <Fragment />
                )}

                {(item.strength * 2) / 5 > 0 ? (
                  <Fragment>
                    <div className="text-left">Strength</div>
                    <Progress
                      className={this.prgoressColor(
                        Math.round((item.strength / total) * 100)
                      )}
                      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                      value={Math.round((item.strength / total) * 100)}
                    >
                      {item.strength}
                    </Progress>
                  </Fragment>
                ) : (
                  <Fragment />
                )}

                {(item.agility * 2) / 5 > 0 ? (
                  <Fragment>
                    <div className="text-left">Agility</div>
                    <Progress
                      className={this.prgoressColor(
                        Math.round((item.agility / total) * 100)
                      )}
                      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                      value={Math.round((item.agility / total) * 100)}
                    >
                      {item.agility}
                    </Progress>
                  </Fragment>
                ) : (
                  <Fragment />
                )}
              </div>
              <div className={`${item.rarity}Footer-styles footer`}>
                {item.rarity}
              </div>
            </div>
            <br />
          </Fragment>
        );
      });
    }
  }
  renderItems() {
    if (this.state.player.name !== undefined && this.state.player.name !== "") {
      return this.state.player.items.map(item => {
        let total =
          item.health +
          item.endurance +
          item.intellect +
          item.strength +
          item.agility;

        return (
          <Fragment>
            <div className={`${item.rarity}itemCard-styles itemCard-styles`}>
              <div className="move-styles">
                <div
                  className="add-styles
      "
                  onClick={() => this.checkDuplicate("Inventory", item)}
                >
                  <i class="fas fa-level-up-alt" />
                </div>

                <div
                  className="drop-styles"
                  onClick={() => this.deleteItem("Drop Item", item)}
                >
                  <i class="far fa-times-circle" />
                </div>
              </div>
              <div className="header-card">{item.name}</div>
              {/* style={{fontFamily:" Arial, Helvetica, sans-serif"}} */}

              <div
                style={{
                  fontFamily: " Arial, Helvetica, sans-serif"
                }}
              >
                {item.slot}
              </div>

              <div className={"progress-container"}>
                <br />

                {(item.health * 2) / 5 > 0 ? (
                  <Fragment>
                    <div className="text-left">Health</div>
                    <Progress
                      className={this.prgoressColor(
                        Math.round((item.health / total) * 100)
                      )}
                      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                      value={Math.round((item.health / total) * 100)}
                    >
                      {item.health}
                    </Progress>
                  </Fragment>
                ) : (
                  <Fragment />
                )}

                {(item.endurance * 2) / 5 > 0 ? (
                  <Fragment>
                    <div className="text-left">Endurance</div>
                    <Progress
                      className={this.prgoressColor(
                        Math.round((item.endurance / total) * 100)
                      )}
                      style={{
                        fontFamily: " Arial, Helvetica, sans-serif"
                      }}
                      value={Math.round((item.endurance / total) * 100)}
                    >
                      {item.endurance}
                    </Progress>
                  </Fragment>
                ) : (
                  <Fragment />
                )}

                {(item.intellect * 2) / 5 > 0 ? (
                  <Fragment>
                    <div className="text-left">Intellect</div>
                    <Progress
                      className={this.prgoressColor(
                        Math.round((item.intellect / total) * 100)
                      )}
                      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                      value={Math.round((item.intellect / total) * 100)}
                    >
                      {item.intellect}
                    </Progress>
                  </Fragment>
                ) : (
                  <Fragment />
                )}

                {(item.strength * 2) / 5 > 0 ? (
                  <Fragment>
                    <div className="text-left">Strength</div>
                    <Progress
                      className={this.prgoressColor(
                        Math.round((item.strength / total) * 100)
                      )}
                      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                      value={Math.round((item.strength / total) * 100)}
                    >
                      {item.strength}
                    </Progress>
                  </Fragment>
                ) : (
                  <Fragment />
                )}

                {(item.agility * 2) / 5 > 0 ? (
                  <Fragment>
                    <div className="text-left">Agility</div>
                    <Progress
                      className={this.prgoressColor(
                        Math.round((item.agility / total) * 100)
                      )}
                      style={{ fontFamily: " Arial, Helvetica, sans-serif" }}
                      value={Math.round((item.agility / total) * 100)}
                    >
                      {item.agility}
                    </Progress>
                  </Fragment>
                ) : (
                  <Fragment />
                )}
              </div>
              <div className={`${item.rarity}Footer-styles footer`}>
                {item.rarity}
              </div>
            </div>
            <br />
          </Fragment>
        );
      });
    }
  }

  render() {
    this.currentRoom = currentRoom.bind(this);
    this.currentPlayer = currentPlayer.bind(this);
    this.deleteItem = deleteItem.bind(this);
    this.removeEquipment = removeEquipment.bind(this);
    this.classIcon = classIcon
    return (
      <Fragment>
        <div className="bigItemHeader-styles">Items in room</div>

        <div className="Items">
          <br />

          <br />

          {this.state.area.items.map(item => {
            let total =
              item.health +
              item.endurance +
              item.intellect +
              item.strength +
              item.agility;

            return (
              <Fragment>
                <div
                  className={`${item.rarity}itemCard-styles itemCard-styles`}
                >
                  <div className="move-styles">
                    <div
                      className="add-styles
      "
                      onClick={() => this.checkDuplicate("Equip", item)}
                    >
                      <i class="fas fa-level-down-alt" />
                    </div>
                  </div>

                  <div className="header-card">{item.name}</div>

                  {/* style={{fontFamily:" Arial, Helvetica, sans-serif"}} */}

                  <div
                    style={{
                      fontFamily: " Arial, Helvetica, sans-serif"
                    }}
                  >
                    {item.slot}
                  </div>

                  <div className={"progress-container"}>
                    <br />

                    {(item.health * 2) / 5 > 0 ? (
                      <Fragment>
                        <div className="text-left">Health</div>
                        <Progress
                          className={this.prgoressColor(
                            Math.round((item.health / total) * 100)
                          )}
                          style={{
                            fontFamily: " Arial, Helvetica, sans-serif"
                          }}
                          value={Math.round((item.health / total) * 100)}
                        >
                          {item.health}
                        </Progress>
                      </Fragment>
                    ) : null}

                    {(item.endurance * 2) / 5 > 0 ? (
                      <Fragment>
                        <div className="text-left">Endurance</div>
                        <Progress
                          className={this.prgoressColor(
                            Math.round((item.endurance / total) * 100)
                          )}
                          style={{
                            fontFamily: " Arial, Helvetica, sans-serif"
                          }}
                          value={Math.round((item.endurance / total) * 100)}
                        >
                          {item.endurance}
                        </Progress>
                      </Fragment>
                    ) : null}

                    {(item.intellect * 2) / 5 > 0 ? (
                      <Fragment>
                        <div className="text-left">Intellect</div>
                        <Progress
                          className={this.prgoressColor(
                            Math.round((item.intellect / total) * 100)
                          )}
                          style={{
                            fontFamily: " Arial, Helvetica, sans-serif"
                          }}
                          value={Math.round((item.intellect / total) * 100)}
                        >
                          {item.intellect}
                        </Progress>
                      </Fragment>
                    ) : null}

                    {(item.strength * 2) / 5 > 0 ? (
                      <Fragment>
                        <div className="text-left">Strength</div>
                        <Progress
                          className={this.prgoressColor(
                            Math.round((item.strength / total) * 100)
                          )}
                          style={{
                            fontFamily: " Arial, Helvetica, sans-serif"
                          }}
                          value={Math.round((item.strength / total) * 100)}
                        >
                          {item.strength}
                        </Progress>
                      </Fragment>
                    ) : null}

                    {(item.agility * 2) / 5 > 0 ? (
                      <Fragment>
                        <div className="text-left">Agility</div>
                        <Progress
                          className={this.prgoressColor(
                            Math.round((item.agility / total) * 100)
                          )}
                          style={{
                            fontFamily: " Arial, Helvetica, sans-serif"
                          }}
                          value={Math.round((item.agility / total) * 100)}
                        >
                          {item.agility}
                        </Progress>
                      </Fragment>
                    ) : null}
                  </div>
                  <div className={`${item.rarity}Footer-styles footer`}>
                    {item.rarity}
                  </div>
                </div>

                <br />
              </Fragment>
            );
          })}
        </div>

        <div className="class-styles">
          <img
            className={"classIcon-styles"}
            src={this.classIcon(this.state.player.class)}
          />
          <br />
          {this.state.player.name}
          <br />
          Level: {this.state.player.level}
          <br />
          {` Health: ${this.state.player.health} Endurance: ${
            this.state.player.endurance
          }`}
          <br />
          {`Strength: ${this.state.player.strength} Agility: ${
            this.state.player.agility
          } Intellect: ${this.state.player.intellect}`}
        </div>

        <div className={"bigItemHeader-styles"}>Items in equipped</div>

        <div className="Items">{this.renderEquipment()}</div>

        <div className={"bigItemHeader-styles"}>Items in inventory</div>
        <div className="Items">
          <br />
          <br />

          {this.renderItems()}
        </div>
      </Fragment>
    );
  }
}

export default Items;
