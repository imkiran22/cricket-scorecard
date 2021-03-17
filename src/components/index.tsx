import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MatchState } from "../types";
import {
  teamOnePlayingX1,
  teamTwoPlayingX1
} from "../constants/players-constants";

export const ScoreCard: React.FC<{}> = () => {
  const match = useSelector((state: any) => state.match);
  const inningsOne = useSelector((state: any) => state.firstInnings);
  const inningsTwo = useSelector((state: any) => state.secondInnings);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: "MATCH_INIT",
      payload: {}
    });
  }, []);

  const Toss = (
    teamOneName: string,
    teamTwoName: string,
    tossWon: string,
    decision: string
  ) => {
    const current = { innings: 1, batting: "", bowling: "" };
    //UPDATE TEAM NAMES
    if (
      (teamOneName === tossWon && decision === "BATTING") ||
      (teamTwoName === tossWon && decision === "FIELDING")
    ) {
      dispatch({
        type: "INNINGS_ONE_UPDATE_TEAM_NAME",
        payload: teamOneName
      });
      dispatch({
        type: "INNINGS_TWO_UPDATE_TEAM_NAME",
        payload: teamTwoName
      });
      current.batting = "teamOne";
      current.bowling = "teamTwo";
    } else if (
      (teamOneName === tossWon && decision === "FIELDING") ||
      (teamTwoName === tossWon && decision === "BATTING")
    ) {
      dispatch({
        type: "INNINGS_ONE_UPDATE_TEAM_NAME",
        payload: teamTwoName
      });
      dispatch({
        type: "INNINGS_TWO_UPDATE_TEAM_NAME",
        payload: teamOneName
      });
      current.batting = "teamTwo";
      current.bowling = "teamOne";
    }

    dispatch({
      type: "MATCH_UPDATE",
      payload: {
        matchStatus: "LIVE",
        oversLimit: 20,
        current,
        teamOne: {
          name: teamOneName,
          playingX1: [...teamOnePlayingX1]
        },
        teamTwo: {
          name: teamTwoName,
          playingX1: [...teamTwoPlayingX1]
        },
        tossWon,
        decision,
        matchAbandoned: {
          status: false,
          reason: ""
        }
      } as MatchState
    });
  };

  const pushOpeners = () => {
    const currentBattingTeam = match.current.batting;
    console.log(currentBattingTeam);
    dispatch({
      type: "INNINGS_ONE_PLAYER_ONE",
      payload: { ...match[currentBattingTeam].playingX1[0] }
    });
    dispatch({
      type: "INNINGS_ONE_PLAYER_TWO",
      payload: { ...match[currentBattingTeam].playingX1[1] }
    });
  };

  const playerOneScore = (run: number) => {
    dispatch({
      type: "INNINGS_ONE_PLAYER_ONE",
      payload: {
        run
      }
    });
  };

  const playerTwoScore = (run: number) => {
    dispatch({
      type: "INNINGS_ONE_PLAYER_TWO",
      payload: {
        run
      }
    });
  };

  return (
    <div>
      <h2>SCORECARD</h2>
      {match.matchStatus === "LIVE" && (
        <p style={{ textTransform: "uppercase" }}>
          Toss won by {match.tossWon} and decided to do {match.decision} first
        </p>
      )}
      <textarea
        onChange={() => {}}
        rows={8}
        value={JSON.stringify(match, null, 4)}
      ></textarea>
      <h2>FIRST INNINGS</h2>
      <textarea
        onChange={() => {}}
        rows={12}
        value={JSON.stringify(inningsOne, null, 4)}
      ></textarea>
      <h2>SECOND INNINGS</h2>
      <textarea
        onChange={() => {}}
        rows={12}
        value={JSON.stringify(inningsTwo, null, 4)}
      ></textarea>
      <h2>SCORE SHEET</h2>
      <button onClick={() => Toss("India", "England", "England", "FIELDING")}>
        TOSS
      </button>
      <button onClick={pushOpeners}>Push Openers</button>
      <button onClick={() => playerOneScore(4)}>UPDATE PLAYER ONE SCORE</button>
      <button onClick={() => playerTwoScore(6)}>UPDATE PLAYER TWO SCORE</button>
    </div>
  );
};
