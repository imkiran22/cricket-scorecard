import { Player, PlayerType } from "./player";

type MatchStatus = "SCHEDULED" | "LIVE" | "STUMPS" | "RESULT";

type PlayingDecision = "BATTING" | "FIELDING" | "";

type TeamMeta = {
  name: string;
  playingX1: Array<Player>;
};

export interface MatchState {
  matchStatus: MatchStatus;
  oversLimit: number;
  current: {
    innings: number;
    batting: string;
    bowling: string;
  };
  teamOne: TeamMeta;
  teamTwo: TeamMeta;
  tossWon: string;
  decision: PlayingDecision;
  matchAbandoned: {
    status: boolean;
    reason: string;
  };
}
