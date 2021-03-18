import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MatchState } from "../types";
import _ from "lodash";
import {
  teamOnePlayingX1,
  teamTwoPlayingX1
} from "../constants/players-constants";
import { ScoreCard } from "./score-card/score-card";
import { ScoreSheet } from "./score-sheet/score-sheet";

const INDEXES: Record<number, string> = {
  0: "INNINGS_{$}_PLAYER_ONE",
  1: "INNINGS_{$}_PLAYER_TWO",
  2: "INNINGS_{$}_PLAYER_THREE",
  3: "INNINGS_{$}_PLAYER_FOUR",
  4: "INNINGS_{$}_PLAYER_FIVE",
  5: "INNINGS_{$}_PLAYER_SIX",
  6: "INNINGS_{$}_PLAYER_SEVEN",
  7: "INNINGS_{$}_PLAYER_EIGHT",
  8: "INNINGS_{$}_PLAYER_NINE",
  9: "INNINGS_{$}_PLAYER_TEN",
  10: "INNINGS_{$}_PLAYER_ELEVEN"
};

const RUNS = [0, 1, 2, 3, 4, 6];

export const Container: React.FC<{}> = () => {
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
    let key = "ONE";
    if (match.current.innings === 2) {
      innings = inningsTwo.innings;
      key = "TWO";
    }
    dispatch({
      type: `INNINGS_${key}_PLAYER_ONE`,
      payload: { ...innings.playingX1[0], status: "NOT_OUT" }
    });
    dispatch({
      type: `INNINGS_${key}_PLAYER_TWO`,
      payload: { ...innings.playingX1[1], status: "NOT_OUT" }
    });
    dispatch({
      type: `INNINGS_${key}_UPDATE_TEAM_PLAYER_STATUS`,
      payload: { ...innings.playingX1[0], status: "NOT_OUT" }
    });
    dispatch({
      type: `INNINGS_${key}_UPDATE_TEAM_PLAYER_STATUS`,
      payload: { ...innings.playingX1[1], status: "NOT_OUT" }
    });
    dispatch({
      type: `INNINGS_${key}_UPDATE_PAIR`,
      payload: {
        strike: 0,
        nonStrike: 1,
        currentPair: [0, 1]
      }
    });
  };

  const playerScore = () => {
    const i = Math.floor(Math.random() * RUNS.length);
    let innings = inningsOne;
    let key = "ONE";
    if (match.current.innings === 2) {
      innings = inningsTwo;
      key = "TWO";
    }
    const striker = innings.batting.strike;
    const type = INDEXES[striker].replace("{$}", key);
    console.log(INDEXES[striker] + " " + type);
    if (striker > -1) {
      dispatch({
        type: type,
        payload: {
          run: RUNS[i]
        }
      });
      dispatch({
        type: `INNINGS_${key}_UPDATE_SCORE`,
        payload: {
          score: RUNS[i]
        }
      });
      dispatch({
        type: `INNINGS_${key}_SCORE`,
        payload: {
          currentScore: RUNS[i]
        }
      });
      if ([1, 3, 5].indexOf(RUNS[i]) > -1) {
        dispatch({
          type: `INNINGS_${key}_UPDATE_PAIR`,
          payload: {
            strike: innings.batting.nonStrike,
            nonStrike: innings.batting.strike
          }
        });
      }
    }
  };

  const makePlayerOut = () => {
    let { batting, innings } = inningsOne;
    let key = "ONE";
    if (match.current.innings === 2) {
      innings = inningsTwo.innings;
      batting = inningsTwo.batting;
      key = "TWO";
    }
    const type = INDEXES[batting.strike].replace("{$}", key);
    // const index = _.findIndex(innings.playingX1, { status: "NOT_OUT" });
    console.log(type);
    // if (index > -1) {
    dispatch({
      type,
      payload: {
        run: -1,
        status: "OUT"
      }
    });
    dispatch({
      type: `INNINGS_${key}_UPDATE_TEAM_PLAYER_STATUS`,
      payload: { ...innings.playingX1[batting.strike], status: "OUT" }
    });
    // }
  };

  const pickNextBatsmen = () => {
    let { batting, innings } = inningsOne;
    let key = "ONE";
    if (match.current.innings === 2) {
      innings = inningsTwo.innings;
      batting = inningsTwo.batting;
      key = "TWO";
    }
    const index = _.findIndex(innings.playingX1, { status: "DID_NOT_BAT" });
    const type = INDEXES[index].replace("{$}", key);
    console.log(type);
    if (index > -1) {
      dispatch({
        type: type,
        payload: { ...innings.playingX1[index], status: "NOT_OUT" }
      });
      dispatch({
        type: `INNINGS_${key}_UPDATE_TEAM_PLAYER_STATUS`,
        payload: { ...innings.playingX1[index], status: "NOT_OUT" }
      });
      dispatch({
        type: `INNINGS_${key}_UPDATE_PAIR`,
        payload: { strike: index, currentPair: [index, batting.nonStrike] }
      });
    }
  };

  React.useEffect(() => {
    Toss("India", "England");
  }, []);

  return (
    <React.Fragment>
      <ScoreCard />
      <ScoreSheet />
      <button onClick={pushOpeners}>Push Openers</button>
      <button onClick={() => playerScore()}>UPDATE PLAYER SCORE</button>
      <button onClick={() => makePlayerOut()}>MAKE BATSMEN OUT</button>
      <button onClick={pickNextBatsmen}>Pick Next Batsmen</button>
    </React.Fragment>
    //   <h2>SCORECARD</h2>
    //   {match.matchStatus === "LIVE" && (
    //     <p style={{ textTransform: "uppercase" }}>
    //       Toss won by {match.tossWon} and decided to do {match.decision} first
    //     </p>
    //   )}
    //   <textarea
    //     onChange={() => {}}
    //     rows={8}
    //     value={JSON.stringify(match, null, 4)}
    //   ></textarea>
    //   <h2>FIRST INNINGS</h2>
    //   <textarea
    //     onChange={() => {}}
    //     rows={12}
    //     value={JSON.stringify(inningsOne, null, 4)}
    //   ></textarea>
    //   <h2>SECOND INNINGS</h2>
    //   <textarea
    //     onChange={() => {}}
    //     rows={12}
    //     value={JSON.stringify(inningsTwo, null, 4)}
    //   ></textarea>
    //   <h2>SCORE SHEET</h2>
    //   <button onClick={() => Toss("India", "England")}>TOSS</button>
    //   <button onClick={pickNextBatsmen}>Pick Next Batsmen</button>
    //   <button onClick={() => playerScore()}>UPDATE PLAYER SCORE</button>
    // <button onClick={() => makePlayerOut()}>MAKE BATSMEN OUT</button>
    // </div>
  );
};
