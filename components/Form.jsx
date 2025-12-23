export default function Form(props) {
  return (
    <form action={props.Submit}>
      <div>
        <label htmlFor="userX">Gamer X</label>
        <input type="text" name="userX" id="userX" required />
      </div>
      <div>
        <label htmlFor="userO">Gamer O</label>
        <input type="text" name="userO" id="userO" required />
      </div>
      <button> Start Game</button>
    </form>
  );
}
