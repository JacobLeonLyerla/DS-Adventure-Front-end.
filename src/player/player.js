import React, { Component,Fragment } from 'react';
import axios from "axios"
import {Link} from "react-router-dom"

class Player extends Component {

  
    

  render() {
    return (<Fragment><div className="loginbackground-styles">
       <br/><br/>
       <br/><br/>
       <br/><br/>
       <br/><br/>
       <div className="title-styles">Dungeon Race</div>
       <br/><br/>
       <br/><br/>
       <br/><br/>
       <br/><br/>
       <br/><br/>
       <br/><br/>
    
       <br/><br/>
      
       <form className="login-styles">
<div className="a">
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
   <button className="btn" onClick={()=>this.props.findPlayer(this.props.name,this.props.password)}>Log On</button>

   <Link to ="/create"><button className="btn">Create</button></Link>
   </div>
      </form>
  </div> </Fragment> );
   
  }
}

export default Player;
