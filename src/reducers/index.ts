import { combineReducers } from "@reduxjs/toolkit";
import { matchReducer } from "./match-reducer";
import { inningsOneReducer, inningsTwoReducer } from "./innings-reducer";
import {
  battingInningsOneReducer,
  battingInningsTwoReducer
} from "./batting-reducer";
export const rootReducer = combineReducers({
  match: matchReducer,
  firstInnings: combineReducers({
    innings: inningsOneReducer,
    batting: battingInningsOneReducer
  }),
  secondInnings: combineReducers({
    innings: inningsTwoReducer,
    batting: battingInningsTwoReducer
  })
});
