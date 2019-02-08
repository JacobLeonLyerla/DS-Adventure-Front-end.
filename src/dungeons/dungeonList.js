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
