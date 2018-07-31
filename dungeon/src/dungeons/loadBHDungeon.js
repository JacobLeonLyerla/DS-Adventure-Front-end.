import React, { Component,Fragment } from "react";
import { Route,Redirect } from "react-router-dom";
import axios from 'axios'
class BlackHeart extends Component {
     state = {
      areas: undefined,
      area:{north:{name:"aaaaa"}},
      player:"",
      id: 0,
      name:'',
      redirect:false
    };
    componentDidMount(){
      let {id} = this.props.match.params
      this.currentPlayer(id)
      this.setDungeon()
  

      
  }
    setDungeon =(reload)=>{
 
      axios
      .get("http://localhost:5500/blackheart")
      .then(response=>{
    this.currentRoom(response.data[0]._id)
          this.setState({players:response.data})
          if(reload ==="reload"){
            window.location.reload()
          }
      })
      .catch(err=>{
      })
  }

      north(){
        let north =""
        for (let index = 0; index < this.state.area.north.length; index++) {
         north = this.state.area.north[0].name
        
        }
        return north
      }
  currentRoom = id => {
    axios
      .get(`http://localhost:5500/blackheart/${id}`)
      .then(response => {
        this.setState({ area: response.data });
      })
      .catch(err => {
      });
  };
  currentPlayer = id => {
    

    axios
      .get(`http://localhost:5500/players/${id}`)
      .then(response => {
        this.setState({ player: response.data });
      })
      .catch(err => {
        console.log(err)
      });
  };
setLocation(id){

  let player ={}
player.currentLocation = this.state.area._id

  axios
  .put(`http://localhost:5500/players/${this.state.player._id}`, player)
  .then(response => {
console.log("set")
  })
  .catch(err => {
  });
}
  render() {

    return (<Fragment>
      {this.setLocation(this.state.area._id)}
      <div className="BlackHeart">
{this.state.area.name}
<br/>
{this.north()}

      </div>
   </Fragment> );
  }
}


export default BlackHeart;
