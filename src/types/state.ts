import { Innings } from "./innings";

type MatchStatus = "LIVE" | "STUMPS" | "RESULT";

export interface AppState {
  matchStatus: MatchStatus;
  oversLimit: number;
  inningsOne: Innings;
  inningsTwo: Innings;
  matchAbandoned: {
    status: boolean;
    reason: string;
  };
}
