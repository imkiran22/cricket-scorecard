import { Batsmen, Bowler } from "./types";

export const AppState = {
  match: {
    matchStatus: "LIVE",
    oversLimit: 20,
    matchAbandoned: {
      status: false,
      reason: ""
    }
  },
  inningsOne: {
    teamName: "",
    overs: 0,
    score: 0,
    players: [],
    batting: {
      currentScore: 0,
      runRate: 0.0,
      playerOne: <Batsmen>{},
      playerTwo: <Batsmen>{},
      didNotBat: []
    },
    bowling: {
      totalBalls: 120,
      currentOver: 0,
      currentBall: 0,
      wickets: 0,
      currentBowler: <Bowler>{},
      extras: {
        wide: 0,
        legBye: 0,
        noBall: 0
      }
    },
    fallOfWickets: []
  },
  inningsTwo: {
    teamName: "",
    overs: 0,
    score: 0,
    players: [],
    batting: {
      currentScore: 0,
      runRate: 0.0,
      playerOne: <Batsmen>{},
      playerTwo: <Batsmen>{},
      didNotBat: []
    },
    bowling: {
      totalBalls: 120,
      currentOver: 0,
      currentBall: 0,
      wickets: 0,
      currentBowler: <Bowler>{},
      extras: {
        wide: 0,
        legBye: 0,
        noBall: 0
      }
    },
    fallOfWickets: []
  }
};
