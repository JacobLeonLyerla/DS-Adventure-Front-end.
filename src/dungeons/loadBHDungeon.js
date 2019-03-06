import React, { Component, Fragment } from "react";

import { Redirect } from "react-router-dom";

import { Modal, Col, Row } from "reactstrap";
import { currentRoom, setLocation, move } from "../helpers/loadDHelper";
import axios from "axios";

import Map from "../dungeons/map.js";

class BlackHeart extends Component {
  constructor() {
    super();
    this.state = {
      areas: undefined,

      area: {},

      player: {
        currentLocation: { _id: 0 }
      },

      pPempId: "",

      mTempid: "",

      id: 0,

      redirect: false,

      moved: false,

      modal: false
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
          this.setState({ players: response.data });

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

  renderRedirect = id => {
    if (this.state.redirect) {
      return <Redirect to={`/battle/${id}`} />;
    }
  };

  movmentRender() {
    if (this.state.area.south !== undefined) {
      return (
        <Fragment>
          <br />

          <div className="BlackHeart">
            {`You are currently in  the ${this.state.area.name}`}
            <br />

            <Row>
              <Col md="12">
                <i
                  onClick={() => this.move("North")}
                  className="fas fa-chevron-circle-up movmenticons-styles"
                />
              </Col>
              <Col md="12">
                <Row style={{ justifyContent: "center" }}>
                  <Col xs="3" sm="3" md="2">
                    <i
                      onClick={() => this.move("West")}
                      className="fas fa-chevron-circle-left movmenticons-styles"
                    />
                  </Col>
                  <Col xs="3" sm="3" md="2">
                    <i
                      onClick={() => this.move("East")}
                      className="fas fa-chevron-circle-right movmenticons-styles"
                    />
                  </Col>
                </Row>
              </Col>
              <Col md="12">
                <i
                  onClick={() => this.move("South")}
                  className="fas fa-chevron-circle-down movmenticons-styles"
                />
              </Col>
            </Row>

            <button className="btn" color="danger" onClick={this.toggle}>
              MAP
            </button>

            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <Map name={this.state.area.name} />
            </Modal>
          </div>
        </Fragment>
      );
    } else {
      return (
        <div className="BlackHeart">
          <h3>You enter the room, looking around to find the next path.</h3>
          <img
            className="pathicon"
            src="https://orig00.deviantart.net/2205/f/2010/307/e/e/moria_throne_room_by_moondoodles-d322n02.jpg"
          />
        </div>
      );
    }
  }

  winnings() {
    if (
      this.state.player.itemWon !== "none" &&
      this.state.player.itemWon !== undefined &&
      this.state.player.itemWon !== "lost"
    ) {
      return (
        <Fragment>
          <div className="winnings-styles">
            <div>{`${this.state.player.name} defeated the ${
              this.state.player.defeatedName
            }`}</div>
            <div>{`earing ${
              this.state.player.experienceGained
            } experience`}</div>
            <div>{`and looted ${this.state.player.itemWon}`}</div>
          </div>
        </Fragment>
      );
    } else if (
      this.state.player.itemWon === "lost" &&
      this.state.player.itemWon !== undefined
    ) {
      return (
        <Fragment>
          <div className="losing-styles">
            <div>{`${this.state.player.name} was defeated by the ${
              this.state.player.defeatedName
            }`}</div>
            <div>{`earning ${
              this.state.player.experienceGained
            } experience`}</div>
            <div>{`You were returned to the ${this.state.area.name}`}</div>
          </div>
        </Fragment>
      );
    }
  }

  ding() {
    if (
      this.state.player.leveled === true &&
      this.state.player.leveled !== undefined
    ) {
      return (
        <div className="leveled-styles">
          {`congratulations! you are now level ${this.state.player.level}`}
        </div>
      );
    }
  }

  render() {
    this.currentRoom = currentRoom.bind(this);
    this.setLocation = setLocation.bind(this);
    this.move = move.bind(this);
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
