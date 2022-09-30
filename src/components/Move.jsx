import React from 'react';
import { setSelectedMove } from '../store/gameSlice'
import '../scss/move.scss'
import store from '../store'

const clickMove = (event, occupyingMove) => {
  event.stopPropagation()
  store.dispatch(setSelectedMove(occupyingMove))
}

function Move ({ occupyingMove }) {
  return (
    <div
      className="move"
      onClick={e => clickMove(e, occupyingMove)}
    />
  );
}

export default Move;