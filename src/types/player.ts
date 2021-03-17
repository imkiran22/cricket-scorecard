export type PlayerType =
  | "batsmen"
  | "all_rounder"
  | "bowler"
  | "wicket_keeper/batsmen";

type PlayerStatus = "NOT_OUT" | "OUT" | "RETIRED_HUT" | "DID_NOT_BAT";

export interface Player {
  name: string;
  playerType: PlayerType;
  age: number;
  run: number;
  status: PlayerStatus;
  highestScore?: number;
}
