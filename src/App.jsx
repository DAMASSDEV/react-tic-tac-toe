import "./App.css";

import React, { useState } from "react";

const Square = ({ value, onSquareClick, winner }) => {
  let colorFont;
  let bgWinner;
  if (value === "X") {
    colorFont = "cross";
  } else {
    colorFont = "circle";
    if (winner) bgWinner = "winner";
  }
  if (winner) bgWinner = "winner";

  return (
    <button
      className={`square ${colorFont} ${bgWinner}`}
      onClick={onSquareClick}>
      {value}
    </button>
  );
};

const Board = ({ squares, xIsNext, onPlay, winner }) => {
  const handleClick = (num) => {
    if (squares[num] || winner) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[num] = "X";
    } else {
      nextSquares[num] = "O";
    }
    onPlay(nextSquares);
  };

  return (
    <div className="board">
      <div className="board-game">
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            winner={winner?.includes(index)}
            onSquareClick={() => {
              handleClick(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

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
  const calculateWinner = (squares) => {
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
        squares[a] === squares[c]
      ) {
        return {
          player: squares[a],
          line: lines[i],
        };
      }
    }
    return null;
  };

  const result = calculateWinner(currentSquares);
  const winner = result?.player;
  const winningLine = result?.line;
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!currentSquares.includes(null)) {
    status = "It's Draw";
  } else {
    status = xIsNext ? "Next Player: X" : "Next Player: O";
  }

  return (
    <>
      <header>
        <h1>Damas Tic Tac Toe</h1>
        <div>
          <p className={winner ? "winner" : ""}>{status}</p>
        </div>
      </header>
      <main className="game">
        <div>
          <Board
            squares={currentSquares}
            xIsNext={xIsNext}
            onPlay={onPlay}
            winner={winningLine}
          />
        </div>
        <div className="game-info">
          <h1>Game History</h1>
          <ol>
            {history.map((squares, move) => {
              let description;
              const isLastMove = move === history.length - 1;
              const isFinished = winner || !squares.includes(null);
              if (isFinished && isLastMove) {
                description = "You are finished at move #" + move;
              } else if (move > 0) {
                description = "Go to Move #" + move;
              } else {
                description = "Go to game start";
              }
              return (
                <li key={move}>
                  <button
                    onClick={() => {
                      jumpTo(move);
                    }}>
                    {description}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </main>
    </>
  );
};

const App = () => {
  return (
    <>
      <main>
        <Game />
      </main>
    </>
  );
};

export default App;
