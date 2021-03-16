import { Batsmen } from "./batsmen";
import { Bowler } from "./bowler";
import { FOW } from "./fow";

export interface Innings {
  teamName: string;
  overs: number;
  score: number;
  players: Array<Batsmen>;
  batting: {
    currentScore: number;
    runRate: number;
    playerOne: Batsmen;
    playerTwo: Batsmen;
    didNotBat: Array<string>;
  };
  bowling: {
    totalBalls: number;
    currentOver: number;
    currentBall: number;
    wickets: number;
    currentBowler: Bowler;
    extras: {
      wide: number;
      legBye: number;
      noBall: number;
    };
  };
  fallOfWickets: Array<FOW>;
}
