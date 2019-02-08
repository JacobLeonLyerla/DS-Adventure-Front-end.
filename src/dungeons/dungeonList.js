/*
lets remove the breaks make this an element instead of a class,
than we should render it inside of the info page,
it does not need to be it's own page.
*/

import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

class DungeonList extends Component {
  render() {
    return (
      <Fragment>
        <div className="DungeonList loginbackground-styles">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Link to={`/blackheart/${this.props.match.params.id}`}>
            <button className="btn btnPick-styles sample">
              Black Heart Keep
            </button>
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default DungeonList;
