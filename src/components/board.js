import React, { Component } from 'react';
import Square from './square.js'
import calc_winner from './../js/calc_winner.js';

class Board extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            hasWinner: false
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        let winner = false;

        if (this.state.hasWinner || squares[i]) {
            return false;
        } else if (!this.state.hasWinner) {
            squares[i] = this.state.xIsNext ? 'X' : 'O';

            winner = calculateWinner(squares);
        }

        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            hasWinner: winner,
        });
    }
    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }
    render() {
        const winner = this.state.hasWinner
        let status;
        if (winner) {
            status = "Ganador: " + winner;
        } else {
            status = "Siguiente jugador:  " + (this.state.xIsNext ? 'X' : 'O');
        }

        return (

            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}


function calculateWinner(squares) {
    let squares2 = squares.slice();
    squares2.forEach(function (val, index, array) {
        if (!val) {
            array[index] = ' ';
        }
    });
    let squaresString = squares2.join('').toLowerCase();
    return calc_winner(3, squaresString).winner;

    // console.log(utils.findWinner(3, squaresString));
    // const lines = [
    //   [0, 1, 2],
    //   [3, 4, 5],
    //   [6, 7, 8],
    //   [0, 3, 6],
    //   [1, 4, 7],
    //   [2, 5, 8],
    //   [0, 4, 8],
    //   [2, 4, 6],
    // ];
    // for (let i = 0; i < lines.length; i++) {
    //   const [a, b, c] = lines[i];
    //   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //     return squares[a];
    //   }
    // }
}


export default Board;