import { combineReducers, createAction, createReducer } from "@reduxjs/toolkit";
const pushActionCreator = createAction("PUSH");

const sampleReducer = createReducer([] as Array<string>, (builder) => {
  builder.addCase(
    pushActionCreator.toString(),
    (state, action: { type: string; payload: string }) => {
      state.push(action.payload);
    }
  );
});

export const rootReducer = combineReducers({
  sample: sampleReducer
});
