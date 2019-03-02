import React, { Component, Fragment } from "react";

import { Redirect } from "react-router-dom";

import { setButtonStyle, setClass, addPlayer } from "../helpers/createHelpers";

import { handleInput } from "../helpers/commonHelpers";

import CreateForm from "../helpers/createForm";

class Create extends Component {
  state = {
    name: "",

    email: "",

    age: "",

    class: "",

    bio: "",

    password: "",

    password2: "",

    gender: "",

    redirect: false,

    endurance: 0,

    health: 0,

    agility: 0,

    intellect: 0,

    strength: 0,

    preview: ""
  };

  // this is a redirect render if the user ever sets redirect on state to true
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <Fragment>
        {/* this is a div that sits above the form, and when a class is selected
        it sets preview to a string that is not empty that allows the terneray to pass
        when it passes it imports the gif from the assets folder and displays it above the form */}
        <div className="loginbackground-styles">
          {this.state.preview !== "" ? (
            <div style={{ height: "15vh" }}>
              <img
                style={{ height: "100%" }}
                src={require(`../assets/${this.state.preview}.gif`)}
              />
            </div>
          ) : (
            <div style={{ height: "15vh" }} />
          )}
          {/* this allows the renderRedirect to work, it's been called over and over
     and if this.state.redirect is ever true it allows that function to exicute  */}
          {this.renderRedirect()}
          <CreateForm
            {...this.state}
            addPlayer={addPlayer.bind(this)}
            handleInput={handleInput.bind(this)}
            setButtonStyle={setButtonStyle}
            setClass={setClass.bind(this)}
            class={this.state.class}
          />
        </div>
      </Fragment>
    );
  }
}

export default Create;
