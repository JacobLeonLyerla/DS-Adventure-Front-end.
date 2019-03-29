import React, { Fragment } from "react";
import Player from "../player/player";

import Create from "../player/createPlayer";

import Info from "../player/info";

import Equip from "../player/equipment";

import DungeonList from "../dungeons/dungeonList";

import BlackHeart from "../dungeons/loadBHDungeon";

import Items from "../dungeons/items";

import Battle from "../dungeons/battle";
import { Route } from "react-router-dom";
export function routes (){
    return (<Fragment>
        <Route
        exact
        path="/"
        render={props => (
          <Player
            {...this.state}
            handleInput={this.handleInput}
            findPlayer={this.findPlayer}
            loadPlayer={this.loadPlayer}
          />
        )}
      />

      <Route
        path="/create"
        render={props => <Create setPlayer={this.setPlayer} />}
      />

      <Route
        path="/info/:id"
        render={props => <Info {...props} player={this.state.player} />}
      />

      <Route
        path="/dungeons/:id"
        render={props => (
          <DungeonList {...props} player={this.state.player} />
        )}
      />

      <div className={this.bhbackground()}>
        <Route
          path="/blackheart/:id"
          render={props => (
            <BlackHeart {...props} player={this.state.player} />
          )}
        />

        <Route
          path="/blackheart/:id"
          render={props => <Items {...props} player={this.state.player} />}
        />

        <Route
          path="/battle/:id"
          render={props => <Battle {...props} player={this.state.player} />}
        />
        <Route
          path="/equip/:id"
          render={props => <Equip {...props} player={this.state.player} />}
        />
      </div>
      </Fragment>
        )
}