import React, { Component } from "react";
import "./App.css";
import Board from "./components/board";

class App extends Component {
  state = {
    history: [{ squares: Array(9).fill(null) }],
    historyMove: [].fill(null).concat(undefined),
    winnerPosition: [].fill(null),
    stepNumber: 0,
    xIsNext: true,
  };

  handleClick = (i, winner) => {
    const newHistory = this.state.history.slice(0, this.state.stepNumber + 1);
    const newHistoryMove = this.state.historyMove.slice(
      0,
      this.state.stepNumber + 1
    );
    const current = newHistory[newHistory.length - 1];
    const newSquares = [...current.squares];

    if (this.calculateWinner(newSquares) || newSquares[i]) return;
    newSquares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: newHistory.concat([
        {
          squares: newSquares,
        },
      ]),
      stepNumber: newHistory.length,
      winnerPosition: winner,
      xIsNext: !this.state.xIsNext,
      historyMove: newHistoryMove.concat(i),
    });
  };

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return lines[i];
      }
    }
    return null;
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  calculateHistory(c) {
    let row = 1,
      col = 0;

    col = c + 1;

    if (c === undefined) return <span>null</span>;
    if (c > 5) {
      col -= 6;
      row += 2;
    } else if (c > 2) {
      col -= 3;
      ++row;
    }

    return (
      <span key={c}>
        ({col}, {row})
      </span>
    );
  }

  render() {
    const current = this.state.history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    let drawStatus = false;
    if (this.state.history.length === 10) drawStatus = true;
    const moves = this.state.history.map((step, move) => {
      const desc = move ? "Go To Move #" + move : "Go To Game Start";
      const history = this.calculateHistory(this.state.historyMove[move]);
      return (
        <li key={move}>
          <button className="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
          {history === null
            ? this.calculateHistory(this.state.historyMove[move])
            : ""}
        </li>
      );
    });

    let status;

    if (winner) status = "THE WINNER IS " + current.squares[winner[0]];
    else if (drawStatus) status = "DRAW";
    else status = "Next Player Is " + (this.state.xIsNext ? "X" : "O");

    return (
      <React.Fragment>
        <div className="app">
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i, winner)}
                onWinner={winner}
              ></Board>
            </div>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol className="list__none">{moves}</ol>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
