import { createReducer } from "@reduxjs/toolkit";
import { Batsmen, Player } from "../types";

const INNINGS_ONE_PLAYER_ONE = "INNINGS_ONE_PLAYER_ONE";
const INNINGS_ONE_PLAYER_TWO = "INNINGS_ONE_PLAYER_TWO";
const INNINGS_ONE_PLAYER_THREE = "INNINGS_ONE_PLAYER_THREE";
const INNINGS_ONE_PLAYER_FOUR = "INNINGS_ONE_PLAYER_FOUR";
const INNINGS_ONE_PLAYER_FIVE = "INNINGS_ONE_PLAYER_FIVE";
const INNINGS_ONE_PLAYER_SIX = "INNINGS_ONE_PLAYER_SIX";
const INNINGS_ONE_PLAYER_SEVEN = "INNINGS_ONE_PLAYER_SEVEN";
const INNINGS_ONE_PLAYER_EIGHT = "INNINGS_ONE_PLAYER_EIGHT";
const INNINGS_ONE_PLAYER_NINE = "INNINGS_ONE_PLAYER_NINE";
const INNINGS_ONE_PLAYER_TEN = "INNINGS_ONE_PLAYER_TEN";
const INNINGS_ONE_PLAYER_ELEVEN = "INNINGS_ONE_PLAYER_ELEVEN";

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
    strikeRate: 0,
    run: -1,
    status: "DID_NOT_BAT"
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

const BUILD_REDUCERS_INNINGS_ONE_MAP: Array<Array<string>> = [
  [INNINGS_ONE_PLAYER_ONE, "playerOne"],
  [INNINGS_ONE_PLAYER_TWO, "playerTwo"],
  [INNINGS_ONE_PLAYER_THREE, "playerThree"],
  [INNINGS_ONE_PLAYER_FOUR, "playerFour"],
  [INNINGS_ONE_PLAYER_FIVE, "playerFive"],
  [INNINGS_ONE_PLAYER_SIX, "playerSix"],
  [INNINGS_ONE_PLAYER_SEVEN, "playerSeven"],
  [INNINGS_ONE_PLAYER_EIGHT, "playerEight"],
  [INNINGS_ONE_PLAYER_NINE, "playerNine"],
  [INNINGS_ONE_PLAYER_TEN, "playerTen"],
  [INNINGS_ONE_PLAYER_ELEVEN, "playerEleven"]
];

const buildCaseHelperReducer = (
  builder: any,
  reducerKey: string,
  objRef: string
) => {
  builder.addCase(
    reducerKey.toString(),
    (
      state: Record<string, any>,
      action: { type: string; payload: Batsmen }
    ) => {
      const {
        payload: { run }
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
        obj["score"] = obj["score"] + run;
      }
      //IF NO BALL DON'T ADD THE BALL COUNT
      obj["balls"] = state[objRef].balls + 1;
      obj["run"] = run;
      Object.assign(state[objRef], obj);
    }
  );
};

export const battingInningsOneReducer = createReducer(init(), (builder) => {
  for (const [ACTION_NAME, PROP_KEY] of BUILD_REDUCERS_INNINGS_ONE_MAP) {
    buildCaseHelperReducer(builder, ACTION_NAME, PROP_KEY);
  }
});

export const battingInningsTwoReducer = createReducer(init(), (builder) => {
  // builder.addCase(
  //   INNINGS_TWO_PLAYER_ONE.toString(),
  //   (state, action: { type: string; payload: Player }) => {
  //     Object.assign(state.playerOne, action.payload);
  //   }
  // );
  // builder.addCase(
  //   INNINGS_TWO_PLAYER_TWO.toString(),
  //   (state, action: { type: string; payload: Player }) => {
  //     Object.assign(state.playerTwo, action.payload);
  //   }
  // );
});
