import { createReducer } from "@reduxjs/toolkit";
import { MatchState, MatchStatus } from "../types";

const MATCH_INIT = "MATCH_INIT";
const MATCH_UPDATE = "MATCH_UPDATE";
const MATCH_UPDATE_INNINGS = "MATCH_UPDATE_INNINGS";
const MATCH_UPDATE_STATUS = "MATCH_UPDATE_STATUS";
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
  builder.addCase(
    MATCH_UPDATE_INNINGS.toString(),
    (
      state,
      action: {
        type: string;
        payload: { innings: number; batting: string; bowling: "" };
      }
    ) => {
      console.log("INNINGS UPDATE", action.payload);
      state.current = action.payload;
    }
  );
  builder.addCase(
    MATCH_UPDATE_STATUS.toString(),
    (
      state,
      action: {
        type: string;
        payload: { status: MatchStatus };
      }
    ) => {
      state.matchStatus = action.payload.status;
    }
  );
});
