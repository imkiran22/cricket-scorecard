import { createReducer } from "@reduxjs/toolkit";
import { MatchState } from "../types";

const MATCH_INIT = "MATCH_INIT";
const MATCH_UPDATE = "MATCH_UPDATE";
const init = () => {
  return <MatchState>{
    matchStatus: "SCHEDULED",
    oversLimit: 20,
    current: {
      innings: 0,
      batting: "",
      bowling: ""
    },
    teamOne: {
      name: ""
      // playingX1: []
    },
    teamTwo: {
      name: ""
      // playingX1: []
    },
    tossWon: "",
    decision: "",
    matchAbandoned: {
      status: false,
      reason: ""
    }
  };
};

export const matchReducer = createReducer(init(), (builder) => {
  builder.addCase(
    MATCH_INIT.toString(),
    (state, action: { type: string; payload: string }) => {
      Object.assign(state, action.payload);
    }
  );
  builder.addCase(
    MATCH_UPDATE.toString(),
    (state, action: { type: string; payload: MatchState }) => {
      Object.assign(state, action.payload);
    }
  );
});
