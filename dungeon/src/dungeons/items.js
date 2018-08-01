import React, { Component,Fragment } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
class Items extends Component {
state={
    player:{gear:[],items:[]},
    area:{items:[]}
}
componentDidMount() {
    let { id } = this.props.match.params;
    this.currentPlayer(id);
 
  }
  currentRoom = id => {
    axios
      .get(`http://localhost:5500/blackheart/${id}`)
      .then(response => {
        this.setState({ area: response.data });
      })
      .catch(err => {});
  };
  currentPlayer = id => {
    axios
      .get(`http://localhost:5500/players/${id}`)
      .then(response => {
        this.setState({ player: response.data });
        this.currentRoom(this.state.player.currentLocation._id)
      })
      .catch(err => {
      });
  };
render(){

console.log(this.state.area)

    return (<Fragment>
      <div className={"bigItemHeader-styles"}>Items in room</div>
      <div className="Items">
      
            <br/><br/>
            
                {this.state.area.items.map(item => (<Fragment>
                <div className="itemCard-styles">
                    <div className="itemsHeader-styles">{item.name}</div>
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    <br/>
                    {` Health: ${item.health} Endurance: ${item.endurance}`}<br/>
                    {` Intellect: ${item.intellect} Strength: ${item.strength}`}
                   <br/>{` Agility: ${item.agility}`}
                    </div><br/>
               

            </Fragment>))}
            </div > 
          
             
            <div className={"bigItemHeader-styles"}>Items in equipped</div>
            
              <div className="Items">
            {this.state.player.gear.map(item => (<Fragment>
                <div className="itemCard-styles">
                    <div className="itemsHeader-styles">{item.name}</div>
                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                    <br/>
                    {` Health: ${item.health} Endurance: ${item.endurance}`}<br/>
                    {` Intellect: ${item.intellect} Strength: ${item.strength}`}
                   <br/>{` Agility: ${item.agility}`}
                    </div><br/>
               

            </Fragment>))} 
</div>
                  <div className={"bigItemHeader-styles"}>Items in inventory</div>
                  <div className="Items">
      
      <br/><br/>
      
          {this.state.player.items.map(item => (<Fragment>
          <div className="itemCard-styles">
              <div className="itemsHeader-styles">{item.name}</div>
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              <br/>
              {` Health: ${item.health} Endurance: ${item.endurance}`}<br/>
              {` Intellect: ${item.intellect} Strength: ${item.strength}`}
             <br/>{` Agility: ${item.agility}`}
              </div><br/>
         

      </Fragment>))}
      </div > 
   </Fragment> );
  }
}


export default Items;
