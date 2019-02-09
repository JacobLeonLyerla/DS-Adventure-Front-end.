import React from "react"
import { Form, Alert, Label, Input, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

const LoginForm = props =>{

    return(
        <Form
            className="login-styles"
            onClick={e =>
              props.loadPlayer(e, props.name, props.password)
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
                  value={props.name}
                  onChange={props.handleInput}
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
                  value={props.password}
                  onChange={props.handleInput}
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
    )
}
export default LoginForm