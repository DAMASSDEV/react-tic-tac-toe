import React, { useState } from "react";
import ArenaLayout from "../components/layouts/ArenaLayout";
import Board from "../components/fragments/board-game/Board";
import History from "../components/fragments/history/History";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const onPlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const calculateWinner = (square) => {
    // for winner , diagonal * 2, row * 3, column * 3
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

    for (const line of lines) {
      const [a, b, c] = line;
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return {
          square: square[a],
          line: line,
        };
      }
    }
    return null;
  };

  //   make status (nextPlayer, win, draw) and line
  const resultWinner = calculateWinner(currentSquares);
  const winner = resultWinner?.square;
  const line = resultWinner?.line;
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!currentSquares?.includes(null)) {
    status = "It's a Draw!";
  } else {
    status = xIsNext ? "Next Player: X" : "Next Player: O";
  }

  return (
    <ArenaLayout textPlayer={status}>
      <ArenaLayout.BoxLeft>
        <Board
          squares={currentSquares}
          xIsNext={xIsNext}
          onPlay={onPlay}
          calculateWinner={winner}
          lineWinner={line}
        />
      </ArenaLayout.BoxLeft>
      <ArenaLayout.BoxRight>
        <History history={history} onJumpTo={jumpTo} />
      </ArenaLayout.BoxRight>
    </ArenaLayout>
  );
};

export default Game;
