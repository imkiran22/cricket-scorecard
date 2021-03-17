import { createReducer } from "@reduxjs/toolkit";

const INNINGS_ONE_UPDATE_TEAM_NAME = "INNINGS_ONE_UPDATE_TEAM_NAME";
const INNINGS_TWO_UPDATE_TEAM_NAME = "INNINGS_TWO_UPDATE_TEAM_NAME";

const init = () => {
  return {
    teamName: "",
    overs: 0,
    score: 0,
    players: [],
    fallOfWickets: []
  };
};

export const inningsOneReducer = createReducer(init(), (builder) => {
  builder.addCase(
    INNINGS_ONE_UPDATE_TEAM_NAME.toString(),
    (state, action: { type: string; payload: string }) => {
      state.teamName = action.payload;
    }
  );
});

export const inningsTwoReducer = createReducer(init(), (builder) => {
  builder.addCase(
    INNINGS_TWO_UPDATE_TEAM_NAME.toString(),
    (state, action: { type: string; payload: string }) => {
      state.teamName = action.payload;
    }
  );
});
