import React from 'react';
import store from '../store'
import { setActiveChecker } from '../store/gameSlice'
import crown from '../assets/crown.png'
import '../scss/checker.scss'

const clickChecker = (event, checker) => {
  event.stopPropagation()
  store.dispatch(setActiveChecker(checker))
}

const renderCheckerContent = (isKing, row, square) => {
  return isKing
    ? <img src={crown} alt="crown"/>
    : `${row},${square}`
}

function Checker ({ checker }) {
  const { row, square, player, isKing } = checker

  return (
    <div
      className={`checker player-${player}`}
      onClick={e => clickChecker(e, checker)}>
      <div className="checker__piece">
        { renderCheckerContent(isKing, row, square) }
      </div>
    </div>
  );
}

export default Checker;