import React, {Fragment} from "react";

import { Form, Alert, Label, Input, Col, Row } from "reactstrap";
const CreateForm = props =>{
   const  inputs =["name","email","password","password2" ]
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
            {inputs.map(title =>(
              <Col md="6">
                <Label
                  for={title}
                  style={{ width: "90%" }}
                  className="text-left"
                >
                  {(title !== "password2") ? <div>{(title.charAt(0).toUpperCase() + title.slice(1))}:</div> : <div>Re-type Password:</div>}
                </Label>

                <Input
                  type={(title !== "password" && title !== "password2") ? "title":"password"}
                  name="name"
                  id="name"
                  value={props.title}
                  onChange={props.handleInput}
                />
              </Col>
              ))}
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