import { PlayerType } from "./player";

export interface Batsmen {
  name: string;
  type: PlayerType;
  score: number;
  minutes: number;
  dots: number;
  ones: number;
  twos: number;
  threes: number;
  fours: number;
  sixes: number;
  balls: number;
  strikeRate: number;
}
