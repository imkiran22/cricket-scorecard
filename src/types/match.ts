type MatchStatus = "SCHEDULED" | "LIVE" | "STUMPS" | "RESULT";

export interface MatchState {
  matchStatus: MatchStatus;
  oversLimit: number;
  matchAbandoned: {
    status: boolean;
    reason: string;
  };
}
