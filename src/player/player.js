import React, { Component, Fragment } from "react";
import axios from "axios";
import { Form, Alert, Label, Input, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import Map from "../dungeons/map.js";


class Player extends Component {
  render() {
    return (
      <Fragment>


        <div className="loginbackground-styles">
          <br />

          <div className="title-styles">Dungeon Run</div>
        {/* Log in form for the player passes the data back to app.js */}
          <Form
            className="login-styles"
            onClick={e =>
              this.props.loadPlayer(e, this.props.name, this.props.password)
            }
          >
            <Row style={{ margin: "1%" }}>
              <Col md="6">
                <Label
                  for="name"
                  style={{ width: "90%" }}
                  className="text-left"
                >
                  Name:
                </Label>

                <Input
                  className="loginInput-styles"
                  name="name"
                  id="name"
                  value={this.props.name}
                  onChange={this.props.handleInput}
                />
              </Col>
              <Col md="6">
                <Label
                  style={{ width: "90%" }}
                  className="text-left"
                  for="email"
                >
                  Password:
                </Label>

                <Input
                  className="loginInput-styles"
                  name="password"
                  type="password"
                  id="password"
                  value={this.props.password}
                  onChange={this.props.handleInput}
                />
              </Col>
            </Row>

            <Link to="/">
              <button className="btn" type="submit">
                Log On
              </button>
              <br />
            </Link>
            <Link to="/create">
              <button className="btn btn-register">Create An Adventurer</button>
            </Link>
               

       
          </Form>
        </div>

       
      </Fragment>
    );
  }
}

export default Player;
