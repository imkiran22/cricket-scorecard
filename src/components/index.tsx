import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const ScoreCard: React.FC<{}> = () => {
  const state = useSelector((state: any) => state.sample);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({
      type: "PUSH",
      payload: new Date().toLocaleDateString()
    });
  }, []);
  return (
    <div>
      <h1>{JSON.stringify(state)}</h1>
      <button
        onClick={() =>
          dispatch({
            type: "PUSH",
            payload: new Date().toLocaleDateString()
          })
        }
      >
        UPDATE
      </button>
    </div>
  );
};
