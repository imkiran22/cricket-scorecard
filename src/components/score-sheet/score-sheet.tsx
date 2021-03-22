import "./score-sheet.scss";
import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
const INDEXES: Record<number, string> = {
  0: "INNINGS_{$}_PLAYER_ONE",
  1: "INNINGS_{$}_PLAYER_TWO",
  2: "INNINGS_{$}_PLAYER_THREE",
  3: "INNINGS_{$}_PLAYER_FOUR",
  4: "INNINGS_{$}_PLAYER_FIVE",
  5: "INNINGS_{$}_PLAYER_SIX",
  6: "INNINGS_{$}_PLAYER_SEVEN",
  7: "INNINGS_{$}_PLAYER_EIGHT",
  8: "INNINGS_{$}_PLAYER_NINE",
  9: "INNINGS_{$}_PLAYER_TEN",
  10: "INNINGS_{$}_PLAYER_ELEVEN"
};
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
const RunItems = [
  {
    id: 1,
    label: "ONE",
    value: 1
  },
  {
    id: 2,
    label: "TWO",
    value: 2
  },
  {
    id: 3,
    label: "THREE",
    value: 3
  },
  {
    id: 4,
    label: "FOUR",
    value: 4
  },
  {
    id: 6,
    label: "SIX",
    value: 6
  },
  {
    id: 0,
    label: "DOT",
    value: 0
  },
  {
    id: "custom",
    label: "CUSTOM",
    value: -1
  }
];
Modal.setAppElement("body");
export const ScoreSheet: React.FC<{}> = () => {
  const match = useSelector((state: any) => state.match);
  const [currentRun, setCurrentRun] = React.useState(0);
  const inningsOne = useSelector((state: any) => state.firstInnings);
  const inningsTwo = useSelector((state: any) => state.secondInnings);
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const runListener = (data: any) => {
    const { value: run } = data;
    if (run !== -1) {
      setCurrentRun(run);
    } else {
      setIsOpen(true);
    }
  };

  const onSubmit = (ev: any) => {
    ev.preventDefault();
    const val = ev.target[0]?.value;
    if (val) {
      const run = parseInt(val, 10);
      setCurrentRun(run);
      setIsOpen(false);
    }
  };

  const score = () => {
    let innings = inningsOne;
    let key = "ONE";
    if (match.current.innings === 2) {
      innings = inningsTwo;
      key = "TWO";
    }
    const striker = innings.batting.strike;
    const type = INDEXES[striker].replace("{$}", key);
    console.log(INDEXES[striker] + " " + type);
    if (striker > -1) {
      dispatch({
        type: type,
        payload: {
          run: currentRun
        }
      });
      dispatch({
        type: `INNINGS_${key}_UPDATE_SCORE`,
        payload: {
          score: currentRun
        }
      });
      dispatch({
        type: `INNINGS_${key}_SCORE`,
        payload: {
          currentScore: currentRun
        }
      });
      if ([1, 3, 5].indexOf(currentRun) > -1) {
        dispatch({
          type: `INNINGS_${key}_UPDATE_PAIR`,
          payload: {
            strike: innings.batting.nonStrike,
            nonStrike: innings.batting.strike
          }
        });
      }
    }
  };

  const onRun = (ev: React.MouseEvent<HTMLButtonElement>) => {
    //DISPATCH CURRENT RUN
    score();
    setCurrentRun(0);
  };

  return (
    <div className="score-sheet" id="score-sheet">
      <div className="run-score-wrapper">
        <div>
          <input
            title="This field is not editable"
            type="number"
            value={currentRun}
          />
          <button onClick={onRun}>Submit Run</button>
        </div>
        <div>
          {RunItems.map((run, index) => (
            <button key={index} onClick={(e) => runListener(run)}>
              {run.label}
            </button>
          ))}
        </div>
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setIsOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <form noValidate={true} onSubmit={onSubmit}>
              <input id="custom" type="number" step="1" />
              <button type="submit">Submit</button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};
