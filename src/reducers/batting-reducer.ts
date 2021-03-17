import { createReducer } from "@reduxjs/toolkit";
import { Batsmen, Player } from "../types";

const INNINGS_ONE_PLAYER_ONE = "INNINGS_ONE_PLAYER_ONE";
const INNINGS_ONE_PLAYER_TWO = "INNINGS_ONE_PLAYER_TWO";
const INNINGS_TWO_PLAYER_ONE = "INNINGS_TWO_PLAYER_ONE";
const INNINGS_TWO_PLAYER_TWO = "INNINGS_TWO_PLAYER_TWO";
// const INNINGS_ONE_PLAYER_ONE_SCORE = "INNINGS_ONE_PLAYER_ONE_SCORE";
// const INNINGS_ONE_PLAYER_TWO_SCORE = "INNINGS_ONE_PLAYER_TWO_SCORE";
const getPlayerInit = () =>
  <Batsmen>{
    name: "",
    type: "batsmen",
    score: 0,
    minutes: 0,
    dots: 0,
    ones: 0,
    twos: 0,
    threes: 0,
    fours: 0,
    sixes: 0,
    balls: -1,
    strikeRate: 0
  };
const init = () => {
  return {
    currentScore: 0,
    runRate: 0.0,
    playerOne: getPlayerInit(),
    playerTwo: getPlayerInit(),
    playerThree: getPlayerInit(),
    playerFour: getPlayerInit(),
    playerFive: getPlayerInit(),
    playerSix: getPlayerInit(),
    playerSeven: getPlayerInit(),
    playerEight: getPlayerInit(),
    playerNine: getPlayerInit(),
    playerTen: getPlayerInit(),
    playerEleven: getPlayerInit(),
    didNotBat: []
  };
};

const buildCaseHelperReducer = (
  builder: any,
  reducerKey: string,
  objRef: string
) => {
  builder.addCase(
    reducerKey.toString(),
    (state: Record<string, any>, action: { type: string; payload: Player }) => {
      const {
        payload: { run = -1 }
      } = action;
      const obj = { ...state[objRef], ...action.payload };
      if (run === 1) {
        obj["ones"] = state[objRef].ones + 1;
      } else if (run === 2) {
        obj["twos"] = state[objRef].twos + 1;
      } else if (run === 3) {
        obj["threes"] = state[objRef].threes + 1;
      } else if (run === 4) {
        obj["fours"] = state[objRef].fours + 1;
      } else if (run === 6) {
        obj["sixes"] = state[objRef].sixes + 1;
      } else if (run === 0) {
        obj["dots"] = state[objRef].dots + 1;
      }
      if (run > 0) {
        obj["score"] += run;
      }
      //IF NO BALL DON'T ADD THE BALL COUNT
      obj["balls"] = state[objRef].balls + 1;
      Object.assign(state[objRef], obj);
    }
  );
};

export const battingInningsOneReducer = createReducer(init(), (builder) => {
  buildCaseHelperReducer(builder, INNINGS_ONE_PLAYER_ONE, "playerOne");
  buildCaseHelperReducer(builder, INNINGS_ONE_PLAYER_TWO, "playerTwo");
});

// export const battingInningsTwoReducer = createReducer(init(), (builder) => {
//   builder.addCase(
//     INNINGS_TWO_PLAYER_ONE.toString(),
//     (state, action: { type: string; payload: Player }) => {
//       Object.assign(state.playerOne, action.payload);
//     }
//   );
//   builder.addCase(
//     INNINGS_TWO_PLAYER_TWO.toString(),
//     (state, action: { type: string; payload: Player }) => {
//       Object.assign(state.playerTwo, action.payload);
//     }
//   );
// });
