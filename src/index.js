import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import calc_winner from './js/calc_winner.js';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

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
          {this.props.length}
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

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      newGame: false
    };
  }
  render() {
    let lengthProp = this.props.lengthBoard;
    let lengthBoardInput = lengthProp > 2 ? lengthProp : 3;
    return (
      <div className="game">

        <div className="game-board">
          <Board length={lengthBoardInput} />
        </div>
        <div className="game-info">
          <div>
            <button
              onClick={() => this.setState({ newGame: true })}
            >
              Nuevo juego
            </button>
          </div>
        </div>
      </div>
    );
    <SweetAlert
      show={this.state.newGame}
      title="Ingrese el tamaño de su tablero"
      text="Ejemplo: Si desea un tablero de 3x3 ingrese '3'"
      placeholder=""
      type="input"
      onConfirm={inputValue => {
        if (inputValue && !isNaN(inputValue)) {
          this.setState({ newGame: false });
          <Game lengthBoard={inputValue} />
        }
      }}
    />
  }
}

// ========================================

ReactDOM.render(
  <SweetAlert
    show={true}
    title="Ingrese el tamaño de su tablero"
    text="Ejemplo: Si desea un tablero de 3x3 ingrese '3'"
    inputPlaceholder=""
    type="input"
    onConfirm={inputValue => {
      <ValidInput render={1} lengthBoard={inputValue} />
    }}
  />,
  document.getElementById('root')
);

function ValidInput(props) {
  let lengthBoard = props.lengthBoard;
  if (lengthBoard && !isNaN(lengthBoard)) {
    if(props.render === 1){
      return <Game lengthBoard={lengthBoard} />
    }else{

    }
    
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