import { PlayerType } from "./player";

type BowlingType = "spin" | "pace" | "medium";

export interface Bowler {
  name: string;
  type: PlayerType;
  bowlerType: BowlingType;
  dots: number;
  fours: number;
  sixes: number;
  wickets: number;
  overs: number;
  maidens: number;
  runs: number;
  economy: number;
  extras: {
    wide: number;
    noBall: number;
  };
}
