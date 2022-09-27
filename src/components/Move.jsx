import React from 'react';
import { setCheckerMoved } from '../store/gameSlice'
import '../scss/available-move.scss'
import store from '../store'

const clickMove = (occupyingMove) => {
  store.dispatch(setCheckerMoved(occupyingMove))
}

function Move ({ occupyingMove }) {
  return (
    <div
      className="available-move"
      onClick={() => clickMove(occupyingMove)}
    />
  );
}

export default Move;