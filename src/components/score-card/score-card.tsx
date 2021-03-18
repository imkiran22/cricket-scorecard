import "./score-card.scss";
import React from "react";
import { useSelector } from "react-redux";

const MAP: { [key: number]: string } = {
  0: "playerOne",
  1: "playerTwo",
  2: "playerThree",
  3: "playerFour",
  4: "playerFive",
  5: "playerSix",
  6: "playerSeven",
  7: "playerEight",
  8: "playerNine",
  9: "playerTen",
  10: "playerEleven"
};

export const ScoreCard: React.FC<{}> = () => {
  const match = useSelector((state: any) => state.match);
  const inningsOne = useSelector((state: any) => state.firstInnings);
  const inningsTwo = useSelector((state: any) => state.secondInnings);
  // console.log(match, inningsOne, inningsTwo)
  const striker = inningsOne.batting[MAP[inningsOne.batting.strike]];
  const nonStriker = inningsOne.batting[MAP[inningsOne.batting.nonStrike]];
  console.log(inningsOne, inningsTwo);
  return (
    <div className="score-card-container">
      <h1>
        {inningsOne.innings.teamName}: {inningsOne.innings.score}/
        {inningsOne.innings.wickets} {inningsOne.innings.overs} OVERS
      </h1>
      {
        <div>
          <p>{striker.name}</p>
          <p>{striker.score}*</p>

          <p>{nonStriker.name}</p>
          <p>{nonStriker.score}</p>
        </div>
      }
      <h1>
        {inningsTwo.innings.teamName}: {inningsTwo.innings.score}/
        {inningsOne.innings.wickets} {inningsTwo.innings.overs} OVERS
      </h1>
    </div>
  );
};
