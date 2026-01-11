const History = ({ history, onJumpTo }) => {
  return (
    <div className="game-info">
      <h1>Game History</h1>
      <ol>
        {history.map((square, move) => {
          let statusTeks;
          if (move > 0) {
            statusTeks = "Go to move #" + move;
          } else {
            statusTeks = "Go to game start";
          }
          return (
            <li key={square}>
              <button
                onClick={() => {
                  onJumpTo(move);
                }}>
                {statusTeks}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default History;
