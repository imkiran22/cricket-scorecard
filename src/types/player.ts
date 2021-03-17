export type PlayerType =
  | "batsmen"
  | "all_rounder"
  | "bowler"
  | "wicket_keeper/batsmen";

export type Player = {
  name: string;
  playerType: PlayerType;
  age: number;
  run: number;
  highestScore?: number;
};
