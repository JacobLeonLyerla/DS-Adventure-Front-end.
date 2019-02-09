import React, {Fragment} from "react";

import { Form, Alert, Label, Input, Col, Row } from "reactstrap";
const CreateForm = props =>{

    return(
        <Form className="create-styles" onSubmit={props.addPlayer}>
            {props.class !== "" ? (
              <Fragment>
                <Alert color="success">
                  {`You have selected a ${
                    props.class
                  }, adventure lies ahead champion.`}
                </Alert>
              </Fragment>
            ) : null}

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
                  type="text"
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
                  Email:
                </Label>

                <Input
                  name="email"
                  value={props.email}
                  onChange={props.handleInput}
                />
              </Col>
            </Row>

            <Row style={{ margin: "1%" }}>
              <Col md="6">
                <Label
                  style={{ width: "90%" }}
                  className="text-left"
                  for="password"
                >
                  Password:
                </Label>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={props.password}
                  onChange={props.handleInput}
                />
              </Col>
              <Col md="6">
                <Label
                  style={{ width: "90%" }}
                  className="text-left"
                  for="password2"
                >
                  Re-type Password:
                </Label>

                <Input
                  id="pwassword2"
                  name="password2"
                  type="password"
                  value={props.password2}
                  onChange={props.handleInput}
                />
              </Col>
            </Row>
            <div style={{ margin: "1%" }}>
              <Label style={{ width: "97%" }} className="text-left" for="lore">
                Lore:
              </Label>

              <Input
                type="textarea"
                id="lore"
                name="bio"
                placeholder="Give a backstory"
                value={props.bio}
                onChange={props.handleInput}
                style={{ height: "20vh" }}
              />
            </div>
            {/* these buttons  on click set the class state and the button state as well as the preview state,
              
              NOTE TO SELF: the button and class states are the same so we don't really need them both
              i will fix tihs once i am back online i can't really code because all my data is hosted on mlab */}
            <div>
              <button
                type="button"
                className={`btn ${props.setButtonStyle("Warrior")}`}
                onClick={() =>
                    props.setClass("Warrior","warrioridle")
                }
              >
                Warrior
              </button>
              <button
                type="button"
                className={`btn ${props.setButtonStyle("Ranger")}`}
                onClick={() =>
                  props.setClass("Ranger","rangeridle")
                }
              >
                Ranger
              </button>
              <button
                type="button"
                className={`btn ${props.setButtonStyle("Mage")}`}
                onClick={() =>
                    props.setClass("Mage","mageidle")
                }
              >
                Mage
              </button>
            </div>
            <button className="btn btn-create" type="submit">
              Create Character
            </button>
          </Form>
    )

}
export default CreateForm;