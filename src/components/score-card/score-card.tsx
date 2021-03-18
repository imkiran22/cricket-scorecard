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
  const inningsOneStriker = inningsOne.batting[MAP[inningsOne.batting.strike]];
  const inningsOneNonStriker =
    inningsOne.batting[MAP[inningsOne.batting.nonStrike]];
  const inningsTwoStriker = inningsTwo.batting[MAP[inningsTwo.batting.strike]];
  const inningsTwoNonStriker =
    inningsTwo.batting[MAP[inningsTwo.batting.nonStrike]];
  return (
    <div className="score-card-container">
      <h3>{match.matchStatus}</h3>
      <h1>
        {inningsOne.innings.teamName}: {inningsOne.innings.score}/
        {inningsOne.innings.wickets} {inningsOne.innings.overs} OVERS
      </h1>
      {
        <div>
          <p>{inningsOneStriker.name}</p>
          <p>
            {inningsOneStriker.score}* ({inningsOneStriker.balls})
          </p>

          <p>{inningsOneNonStriker.name}</p>
          <p>
            {inningsOneNonStriker.score} ({inningsOneNonStriker.balls})
          </p>
        </div>
      }
      <h1>
        {inningsTwo.innings.teamName}: {inningsTwo.innings.score}/
        {inningsTwo.innings.wickets} {inningsTwo.innings.overs} OVERS
      </h1>
      {
        <div>
          <p>{inningsTwoStriker.name}</p>
          <p>
            {inningsTwoStriker.score}* ({inningsTwoStriker.balls})
          </p>

          <p>{inningsTwoNonStriker.name}</p>
          <p>
            {inningsTwoNonStriker.score} ({inningsTwoNonStriker.balls})
          </p>
        </div>
      }
    </div>
  );
};
