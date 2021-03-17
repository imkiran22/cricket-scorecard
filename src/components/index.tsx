import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MatchState } from "../types";
import _ from "lodash";
import {
  teamOnePlayingX1,
  teamTwoPlayingX1
} from "../constants/players-constants";

const INDEXES: Record<number, string> = {
  0: "INNINGS_ONE_PLAYER_ONE",
  1: "INNINGS_ONE_PLAYER_TWO",
  2: "INNINGS_ONE_PLAYER_THREE",
  3: "INNINGS_ONE_PLAYER_FOUR",
  4: "INNINGS_ONE_PLAYER_FIVE",
  5: "INNINGS_ONE_PLAYER_SIX",
  6: "INNINGS_ONE_PLAYER_SEVEN",
  7: "INNINGS_ONE_PLAYER_EIGHT",
  8: "INNINGS_ONE_PLAYER_NINE",
  9: "INNINGS_ONE_PLAYER_TEN",
  10: "INNINGS_ONE_PLAYER_ELEVEN"
};

const RUNS = [0, 1, 2, 3, 4, 6];

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

  const Toss = (teamOneName: string, teamTwoName: string) => {
    const current = { innings: 1, batting: "", bowling: "" };
    const arr = [1, 2];
    let index = Math.floor(Math.random() * arr.length);
    const tossWon = index === 1 ? teamOneName : teamTwoName;
    index = Math.floor(Math.random() * arr.length);
    const decision = index === 1 ? "BATTING" : "FIELDING";
    //UPDATE TEAM NAMES
    if (
      (teamOneName === tossWon && decision === "BATTING") ||
      (teamTwoName === tossWon && decision === "FIELDING")
    ) {
      dispatch({
        type: "INNINGS_ONE_UPDATE_TEAM",
        payload: {
          teamName: teamOneName,
          playingX1: [...teamOnePlayingX1]
        }
      });
      dispatch({
        type: "INNINGS_TWO_UPDATE_TEAM",
        payload: {
          teamName: teamTwoName,
          playingX1: [...teamTwoPlayingX1]
        }
      });
      current.batting = "teamOne";
      current.bowling = "teamTwo";
    } else if (
      (teamOneName === tossWon && decision === "FIELDING") ||
      (teamTwoName === tossWon && decision === "BATTING")
    ) {
      dispatch({
        type: "INNINGS_ONE_UPDATE_TEAM",
        payload: {
          teamName: teamTwoName,
          playingX1: [...teamTwoPlayingX1]
        }
      });
      dispatch({
        type: "INNINGS_TWO_UPDATE_TEAM",
        payload: {
          teamName: teamOneName,
          playingX1: [...teamOnePlayingX1]
        }
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
          name: teamOneName
        },
        teamTwo: {
          name: teamTwoName
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
    let innings = inningsOne.innings;
    if (match.current.innings === 2) {
      innings = inningsTwo.innings;
    }
    dispatch({
      type: "INNINGS_ONE_PLAYER_ONE",
      payload: { ...innings.playingX1[0], status: "NOT_OUT" }
    });
    dispatch({
      type: "INNINGS_ONE_PLAYER_TWO",
      payload: { ...innings.playingX1[1], status: "NOT_OUT" }
    });
    dispatch({
      type: "INNINGS_ONE_UPDATE_TEAM_PLAYER_STATUS",
      payload: { ...innings.playingX1[0], status: "NOT_OUT" }
    });
    dispatch({
      type: "INNINGS_ONE_UPDATE_TEAM_PLAYER_STATUS",
      payload: { ...innings.playingX1[1], status: "NOT_OUT" }
    });
  };

  const playerScore = () => {
    const i = Math.floor(Math.random() * RUNS.length);
    let innings = inningsOne.innings;
    if (match.current.innings === 2) {
      innings = inningsTwo.innings;
    }
    const index = _.findIndex(innings.playingX1, { status: "NOT_OUT" });
    alert(INDEXES[index]);
    if (index > -1) {
      dispatch({
        type: INDEXES[index],
        payload: {
          run: RUNS[i]
        }
      });
    }
  };

  const makePlayerOut = () => {
    let innings = inningsOne.innings;
    if (match.current.innings === 2) {
      innings = inningsTwo.innings;
    }
    const index = _.findIndex(innings.playingX1, { status: "NOT_OUT" });
    alert(INDEXES[index]);
    if (index > -1) {
      dispatch({
        type: INDEXES[index],
        payload: {
          run: -1,
          status: "OUT"
        }
      });
      dispatch({
        type: "INNINGS_ONE_UPDATE_TEAM_PLAYER_STATUS",
        payload: { ...innings.playingX1[index], status: "OUT" }
      });
    }
  };

  const pickNextBatsmen = () => {
    let innings = inningsOne.innings;
    if (match.current.innings === 2) {
      innings = inningsTwo.innings;
    }
    const index = _.findIndex(innings.playingX1, { status: "DID_NOT_BAT" });
    alert(INDEXES[index]);
    if (index > -1) {
      dispatch({
        type: INDEXES[index],
        payload: { ...innings.playingX1[index], status: "NOT_OUT" }
      });
      dispatch({
        type: "INNINGS_ONE_UPDATE_TEAM_PLAYER_STATUS",
        payload: { ...innings.playingX1[index], status: "NOT_OUT" }
      });
    }
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
      <button onClick={() => Toss("India", "England")}>TOSS</button>
      <button onClick={pushOpeners}>Push Openers</button>
      <button onClick={pickNextBatsmen}>Pick Next Batsmen</button>
      <button onClick={() => playerScore()}>UPDATE PLAYER SCORE</button>
      <button onClick={() => makePlayerOut()}>MAKE BATSMEN OUT</button>
    </div>
  );
};
