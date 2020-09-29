import React from "react";
function Square(props) {
  let winner = "square";
  if (props.onWinner) {
    winner += "Winner";
  }

  return (
    <button className={winner} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
