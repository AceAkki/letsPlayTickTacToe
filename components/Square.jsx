export default function Square(props) {
  return (
    <button className={`square ${props.type}`} onClick={props.onClick} id={props.id}>
      {props.type}
    </button>
  );
}
