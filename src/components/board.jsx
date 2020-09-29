import React, { Component } from "react";
import Square from "./square";

class Board extends Component {
  renderSquare(i) {
    let winner = false;
    for (let j = 0; j < 3; j++) {
      if (this.props.onWinner === null) continue;
      if (this.props.onWinner[j] === i) {
        winner = true;
      }
    }

    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        onWinner={winner}
      ></Square>
    );
  }

  render() {
    return (
      <div>
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

export default Board;
