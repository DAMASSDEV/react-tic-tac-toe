import Square from "../../elements/square"

const Board = ({squares, xIsNext, onPlay, calculateWinner, lineWinner}) => {

    const handleClick = (i) => {
        if (squares[i] || calculateWinner) return;
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
        
    }
    
  return (
    <div className="board">
        <div className="board-game">
            {squares.map((square, index) => (
                <Square key={index} value={square} onSquareClick={() => {handleClick(index) 
                }} squares={square} lineWinner={lineWinner?.includes(index)}/>
            ))}
        </div>
    </div>
  )
}

export default Board
