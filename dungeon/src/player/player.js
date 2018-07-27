import React, { Component,Fragment } from 'react';
import axios from "axios"
import {Link} from "react-router-dom"

class Player extends Component {
    props={

    }
  
    

  render() {
    return (<Fragment>
       <br/><br/>
    Name:
   <input 
   name="name"
   placeholder ="Enter a character name"
   value={this.props.name}
   onChange={this.props.handleInput}
   />   
        password:
      <input 
   name="password"
   type="password"
   placeholder ="Enter a character password"
   value={this.props.password}
   onChange={this.props.handleInput}
   /><br/>
   <button onClick={()=>this.props.findPlayer(this.props.name,this.props.password)}>Find Player</button>

   <Link to ="/create"><button>create a character</button></Link>
   </Fragment> );
   
  }
}

export default Player;
