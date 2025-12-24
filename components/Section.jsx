export default function Section(props) {
  // console.log(
  //   props.getWinnerName() !== null || props.completeGame(),
  //   props.getWinnerName(),
  //   props.userData.find((obj) => obj.isTurn)
  // );
  function userNameStyle(value) {
    return {
      background: props.userData[value].isTurn ? "var(--clr-highlight)" : "transparent",
    };
  }

  return (
    <section>
      <div className="game-wrap">{props.elemArr}</div>
      <div className="users-wrap">
        <div style={userNameStyle(0)} className="player-name">
          player "X" : {props.userData[0].username} 
          <p>
             <span>Wins Count: {props.userData[0].wins}</span> &nbsp;
          <span>Lost Count: {props.userData[0].loss}</span>
          </p>
         
        </div>
        <br />
        <div style={userNameStyle(1)} className="player-name">
          player "O" : {props.userData[1].username} 
          <p>
           <span>Wins Count: {props.userData[1].wins}</span> &nbsp;
          <span>Lost Count: {props.userData[1].loss}</span>

          </p>
        </div>
      </div>
      {props.getWinnerName() !== null || props.completeGame() ? (
        <div className="status-wrap">
          <p className="status">
            {props.getWinnerName() !== null
              ? `${props.getWinnerName()} has won this game !`
              : `Game is draw`}
          </p>
          <button onClick={props.newGame}> New Game</button>
        </div>
      ) : null}
    </section>
  );
}
