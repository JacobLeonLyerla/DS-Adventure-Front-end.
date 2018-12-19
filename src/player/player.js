import React, { Component,Fragment } from 'react';
import axios from "axios"
import {Link} from "react-router-dom"
import Map from "../dungeons/map.js"
class Player extends Component {

  
  

  render() {
    return (<Fragment><div className="loginbackground-styles">
       <br/><br/>
       <br/><br/>
       <br/><br/>
       <br/><br/>
       <div className="title-styles">Dungeon Race</div>
       <br/><br/>
       <div className="testing">VERY BROKEN</div>
       <br/><br/>
       <br/><br/>
       <br/><br/>
       <br/><br/>
       <br/><br/>
    
       <br/><br/>
      
       <form className="login-styles">

    Name:
   <input 
   className="loginInput-styles"
   name="name"
   placeholder ="Enter a name"
   value={this.props.name}
   onChange={this.props.handleInput}
   />   
        Password:

      <input 
      className="loginInput-styles"
   name="password"
   type="password"
   placeholder ="Enter a password"
   value={this.props.password}
   onChange={this.props.handleInput}
   /><br/>
   <Link to="/"><button className="btn" onClick={()=>this.props.loadPlayer(this.props.name,this.props.password)}>Log On</button></Link>

   <Link to ="/create"><button className="btn">Create</button></Link>
      </form>
  </div>
   </Fragment> );
   
  }
}

export default Player;
