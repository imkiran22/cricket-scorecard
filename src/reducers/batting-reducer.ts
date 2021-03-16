import { createReducer } from "@reduxjs/toolkit";
import { Batsmen } from "../types";

const INNINGS_ONE_PLAYER_ONE_NAME = "INNINGS_ONE_PLAYER_ONE_NAME";
const INNINGS_ONE_PLAYER_TWO_NAME = "INNINGS_ONE_PLAYER_TWO_NAME";
const INNINGS_TWO_PLAYER_ONE_NAME = "INNINGS_TWO_PLAYER_ONE_NAME";
const INNINGS_TWO_PLAYER_TWO_NAME = "INNINGS_TWO_PLAYER_TWO_NAME";

const INNINGS_ONE_PLAYER_ONE_SCORE = "INNINGS_ONE_PLAYER_ONE_SCORE";
const INNINGS_ONE_PLAYER_TWO_SCORE = "INNINGS_ONE_PLAYER_TWO_SCORE";

const init = () => {
  return {
    currentScore: 0,
    runRate: 0.0,
    playerOne: <Batsmen>{
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
      balls: 0,
      strikeRate: 0
    },
    playerTwo: <Batsmen>{
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
      balls: 0,
      strikeRate: 0
    },
    didNotBat: []
  };
};

export const battingInningsOneReducer = createReducer(init(), (builder) => {
  console.log("INIT");
  builder.addCase(
    INNINGS_ONE_PLAYER_ONE_NAME.toString(),
    (state, action: { type: string; payload: string }) => {
      console.log(state, action.payload);
      state.playerOne.name = action.payload;
    }
  );

  builder.addCase(
    INNINGS_ONE_PLAYER_TWO_NAME.toString(),
    (state, action: { type: string; payload: string }) => {
      state.playerTwo.name = action.payload;
    }
  );

  builder.addCase(
    INNINGS_ONE_PLAYER_ONE_SCORE.toString(),
    (state, action: { type: string; payload: number }) => {
      state.playerOne.score += action.payload;
    }
  );

  builder.addCase(
    INNINGS_ONE_PLAYER_TWO_SCORE.toString(),
    (state, action: { type: string; payload: number }) => {
      state.playerTwo.score += action.payload;
    }
  );
});

export const battingInningsTwoReducer = createReducer(init(), (builder) => {
  builder.addCase(
    INNINGS_TWO_PLAYER_ONE_NAME.toString(),
    (state, action: { type: string; payload: string }) => {
      state.playerOne.name = action.payload;
    }
  );
  builder.addCase(
    INNINGS_TWO_PLAYER_TWO_NAME.toString(),
    (state, action: { type: string; payload: string }) => {
      state.playerTwo.name = action.payload;
    }
  );
});
