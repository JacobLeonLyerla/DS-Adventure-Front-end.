import  React, { Component,Fragment } from 'react';
import {Redirect} from'react-router-dom'


class Info extends Component {
    state ={
        player:this.props.player,
        redirect:false
    }
    setRedirect =() =>{
        if(this.state.player === undefined){
            this.setState({redirect:true})
        }
    }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/'/>
        }
      }
  render() {
      console.log(this.state)
    return (<Fragment>
        {this.setRedirect()}
        {this.renderRedirect()}

      <div>
       Name: {this.state.player.name}<br/>
       Class: {this.state.player.class} <br/>
       Age: {this.state.player.age} <br/>
       Gender: {this.state.player.gender}<br/>
       Health: {this.state.player.health}<br/>
       Endurence: {this.state.player.endurence}<br/>
       Bio: {this.state.player.bio}<br/>
      </div>
    </Fragment>);
  }
}

export default Info;
