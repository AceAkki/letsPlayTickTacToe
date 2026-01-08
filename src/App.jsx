import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

import "./App.css";
import Form from "../components/Form";
import Section from "../components/Section";
import Square from "../components/Square";

export default function App() {
  let [spaces, setSpaces] = useState(createSpace());
  let [users, setUsers] = useState([]);
  const { width, height } = useWindowSize()

  function createSpace() {
    return Array(9)
      .fill(0)
      .map((num, i) => {
        return { type: " ", id: `${i}`, won:false };
      });
  }

  function newGame() {
    setSpaces(createSpace());
    //console.log(getWinner());
  }

  function getUsers(formData) {
    let { userX, userO } = Object.fromEntries(formData.entries());
    // setUsers((oldUsers) =>
    //   oldUsers.map((user) => {
    //     return user.type === "X"
    //       ? { ...user, username: userX }
    //       : { ...user, username: userO };
    //   })
    // );
    setUsers([
      {
        username: userX,
        type: "X",
        isTurn: true,
        wins:0,
        loss:0,
      },
      {
        username: userO,
        type: "O",
        isTurn: false,
        wins:0,
        loss:0,
      },
    ]);
  }

  function playTurn(event) {
    let currentUser = users.find((obj) => obj.isTurn);
    // console.log(currentUser);
    if (spaces[event.target.id].type === " " && getWinner() === null) {
      setSpaces((oldspaces) =>
        oldspaces.map((space) => {
          return event.target.id === space.id && space.type === " "
            ? { ...space, type: currentUser.type }
            : space;
        })
      );
      setUsers((oldUsers) =>
        oldUsers.map((user) => {
          return user.isTurn
            ? { ...user, isTurn: !user.isTurn }
            : { ...user, isTurn: true };
        })
      );
    }
  }

  let elemArr = spaces.map((el) => (
    <Square key={el.id} id={el.id} onClick={playTurn} type={el.type} wonClass={el.won} />
  ));

  function gameCompletion() {
    return spaces.every((space) => space.type !== " ");
  }

  function getWinner() {
    let winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    // let filled = spaces.filter((space) => {
    //   if (space.type !== " ") {
    //     return space;
    //   }
    // });

    // let xList = filled
    //   .filter((space) => {
    //     if (space.type === "X") {
    //       return space;
    //     }
    //   })
    //   .map((elm) => parseInt(elm.id));
    // let oList = filled
    //   .filter((space) => {
    //     if (space.type === "O") {
    //       return space;
    //     }
    //   })
    //   .map((elm) => parseInt(elm.id));

    // // console.log(filled, "list", xList, oList);

    // let gameWinner = checkWinner(winConditions, xList, oList);
    // return gameWinner !== undefined ? gameWinner : null;
   

    for (let [a, b, c] of winConditions) {
      if (spaces[a].type !== " " && 
      spaces[a].type === spaces[b].type && spaces[a].type === spaces[c].type) {
        return { winner:spaces[a].type, winnerPattern:[a, b, c] }
      }
    }
    return null
  }

  // function checkWinner(checker, xList, oList) {
  //   let winner;
  //   if (checker.find((arr) => arr.every((elm, index) => xList.includes(elm)))) {
  //     winner = "X";
  //   } else if (
  //     checker.find((arr) => arr.every((elm, index) => oList.includes(elm)))
  //   ) {
  //     winner = "O";
  //   }
  //   return winner;
  // }

  useEffect(() => {
    const winnerInfo = getWinner()
   
    if (winnerInfo) {
      const {winner, winnerPattern} = getWinner();
      console.log(getWinner())
      if (!spaces[winnerPattern[0]].won) {
        setSpaces(prev => prev.map((space, i) => 
          winnerPattern.includes(i) ? { ...space, won: true } : space
        ));
        setUsers(oldUsers => oldUsers.map(user => {
           return (user.type === winner) ? {...user, wins:user.wins + 1} : {...user, loss:user.loss + 1}
         }))
      } 
    }
    // if (getWinner() !== null || gameCompletion()) return
   // console.log("ran useEffect", spaces);
    
  }, [spaces]);

  return (
    <>
      {getWinner() !== null ? <Confetti
      width={width}
      height={height}
    /> : null}
    <main>
      <h1>letsPlay : TicTacToe</h1>
      {users.length <= 0 ? (
        <Form Submit={getUsers} />
      ) : (
        <Section
          elemArr={elemArr}
          userData={users}
          getWinnerName={getWinner}
          newGame={newGame}
          completeGame={gameCompletion}
        />
      )}

    </main>
    </>
  );
}
