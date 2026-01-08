export default function Square(props) {
  let ifWon = props.wonClass ? "wonClass" : ""
  return (
    <button className={`square ${props.type} ${ifWon}`} onClick={props.onClick} id={props.id}>
      {props.type}
    </button>
  );
}
