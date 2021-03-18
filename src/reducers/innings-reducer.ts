import { createReducer } from "@reduxjs/toolkit";
import _ from "lodash";
import { Player } from "../types";

const INNINGS_ONE_UPDATE_TEAM = "INNINGS_ONE_UPDATE_TEAM";
const INNINGS_TWO_UPDATE_TEAM = "INNINGS_TWO_UPDATE_TEAM";

const INNINGS_ONE_UPDATE_TEAM_PLAYER_STATUS =
  "INNINGS_ONE_UPDATE_TEAM_PLAYER_STATUS";
const INNINGS_TWO_UPDATE_TEAM_PLAYER_STATUS =
  "INNINGS_TWO_UPDATE_TEAM_PLAYER_STATUS";

const INNINGS_ONE_UPDATE_WICKETS = "INNINGS_ONE_UPDATE_WICKETS";
const INNINGS_TWO_UPDATE_WICKETS = "INNINGS_TWO_UPDATE_WICKETS";

const INNINGS_ONE_UPDATE_SCORE = "INNINGS_ONE_UPDATE_SCORE";
const INNINGS_TWO_UPDATE_SCORE = "INNINGS_TWO_UPDATE_SCORE";

const init = () => {
  return {
    teamName: "",
    overs: 0,
    score: 0,
    wickets: 0,
    playingX1: [] as Player[],
    fallOfWickets: []
  };
};

export const inningsOneReducer = createReducer(init(), (builder) => {
  builder.addCase(
    INNINGS_ONE_UPDATE_TEAM.toString(),
    (
      state,
      action: {
        type: string;
        payload: { teamName: string; playingX1: Array<Player> };
      }
    ) => {
      Object.assign(state, { ...action.payload });
    }
  );
  builder.addCase(
    INNINGS_ONE_UPDATE_TEAM_PLAYER_STATUS.toString(),
    (
      state: any,
      action: {
        type: string;
        payload: {
          name: string;
          status: string;
        };
      }
    ) => {
      const index = _.findIndex(state.playingX1, {
        name: action.payload.name
      });
      state.playingX1[index].status = action.payload.status;
    }
  );

  builder.addCase(
    INNINGS_ONE_UPDATE_WICKETS.toString(),
    (
      state: any,
      action: {
        type: string;
        payload: {
          wickets: number;
        };
      }
    ) => {
      state.wickets += action.payload.wickets;
    }
  );

  builder.addCase(
    INNINGS_ONE_UPDATE_SCORE.toString(),
    (
      state: any,
      action: {
        type: string;
        payload: {
          score: number;
        };
      }
    ) => {
      state.score += action.payload.score;
    }
  );
});

export const inningsTwoReducer = createReducer(init(), (builder) => {
  builder.addCase(
    INNINGS_TWO_UPDATE_TEAM.toString(),
    (
      state,
      action: {
        type: string;
        payload: { teamName: string; playingX1: Array<Player> };
      }
    ) => {
      Object.assign(state, { ...action.payload });
    }
  );
  builder.addCase(
    INNINGS_TWO_UPDATE_TEAM_PLAYER_STATUS.toString(),
    (
      state: any,
      action: {
        type: string;
        payload: {
          name: string;
          status: string;
        };
      }
    ) => {
      const index = _.findIndex(state.playingX1, {
        name: action.payload.name
      });
      state.playingX1[index].status = action.payload.status;
    }
  );

  builder.addCase(
    INNINGS_TWO_UPDATE_WICKETS.toString(),
    (
      state: any,
      action: {
        type: string;
        payload: {
          wickets: number;
        };
      }
    ) => {
      state.wickets += action.payload.wickets;
    }
  );

  builder.addCase(
    INNINGS_TWO_UPDATE_SCORE.toString(),
    (
      state: any,
      action: {
        type: string;
        payload: {
          score: number;
        };
      }
    ) => {
      state.score += action.payload.score;
    }
  );
});
