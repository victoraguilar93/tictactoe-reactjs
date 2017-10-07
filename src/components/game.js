import React, { Component } from 'react';
import Board from './board.js'

class Game extends React.Component {
    constructor() {
      super();
      this.state = {
        newGame: true
      };
    }
    render() {
      return (
        <div className="game">
  
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>
            </div>
          </div>
        </div>
      );
    }
  }

  
  export default Game;