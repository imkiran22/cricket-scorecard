import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const ScoreCard: React.FC<{}> = () => {
  const match = useSelector((state: any) => state.match);
  const inningsOne = useSelector((state: any) => state.firstInnings);
  const inningsTwo = useSelector((state: any) => state.secondInnings);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: "MATCH_INIT",
      payload: {}
    });
  }, []);

  const dispatchFn = () => {
    dispatch({
      type: "MATCH_UPDATE",
      payload: {
        matchStatus: "LIVE",
        oversLimit: 20,
        matchAbandoned: {
          status: false,
          reason: ""
        }
      }
    });
    dispatch({
      type: "INNINGS_ONE_UPDATE_NAME",
      payload: "India"
    });
    dispatch({
      type: "INNINGS_TWO_UPDATE_NAME",
      payload: "England"
    });
    dispatch({
      type: "INNINGS_ONE_PLAYER_ONE_NAME",
      payload: "Kiran"
    });
    dispatch({
      type: "INNINGS_ONE_PLAYER_TWO_NAME",
      payload: "Harish"
    });
  };

  const playerOneScore = () => {
    dispatch({
      type: "INNINGS_ONE_PLAYER_ONE_SCORE",
      payload: 6
    });
  };

  const playerTwoScore = () => {
    dispatch({
      type: "INNINGS_ONE_PLAYER_TWO_SCORE",
      payload: 4
    });
  };

  return (
    <div>
      <h1>{JSON.stringify(match)}</h1>
      <h1>{JSON.stringify(inningsOne)}</h1>
      <h1>{JSON.stringify(inningsTwo)}</h1>
      <button onClick={dispatchFn}>UPDATE</button>
      <button onClick={playerOneScore}>UPDATE PLAYER ONE SCORE</button>
      <button onClick={playerTwoScore}>UPDATE PLAYER TWO SCORE</button>
    </div>
  );
};
