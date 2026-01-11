
const Square = ({value, onSquareClick, squares, lineWinner}) => {
    let textColor;
    let boxWinner;
    if (squares === "X") {
        textColor = "cross";
    } else {
        textColor = "circle";
    }
    if (lineWinner) boxWinner = "winner" ;
  return (
    <button className={`square ${textColor} ${boxWinner}`} onClick={onSquareClick}>
      {value}
    </button>
  )
}

export default Square
