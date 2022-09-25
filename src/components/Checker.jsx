import React from 'react';
import store from '../store'
import { setActiveChecker } from '../store/gameSlice'
import '../scss/checker.scss'

const clickChecker = (event, checker) => {
  event.stopPropagation()
  store.dispatch(setActiveChecker(checker))
}

function Checker ({ checker }) {
  const { row, square, player } = checker

  return (
    <div
      className={`checker player-${player}`}
      onClick={e => clickChecker(e, checker)}>
      <div className="checker__piece">
        {`${row},${square}`}
      </div>
    </div>
  );
}

export default Checker;