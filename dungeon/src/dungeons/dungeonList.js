import React, { Component,Fragment } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
class DungeonList extends Component {


render(){
    return (<Fragment>
      <div className="DungeonList">
    <Link to ={`/blackHeart/${this.props.match.params.id}`}><button>Black Heart Keep</button></Link>

      </div>
   </Fragment> );
  }
}


export default DungeonList;
