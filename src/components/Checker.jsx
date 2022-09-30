import React from 'react';
import store from '../store'
import { setActiveChecker, setCheckerMoved } from '../store/gameSlice'
import crown from '../assets/crown.png'
import '../scss/checker.scss'
import { useSelector } from 'react-redux'

const clickChecker = (event, checker) => {
  event.stopPropagation()
  store.dispatch(setActiveChecker(checker))
}

const renderCheckerContent = (isKing, row, square) => {
  return isKing
    ? <img src={crown} alt="crown"/>
    : `${row},${square}`
}

const buildCheckerClasses = (checker, activeChecker, selectedMove) => {
  const { id, player } = checker

  const classes = [`checker player-${player}`]
  const isActive = id === activeChecker?.id

  if (selectedMove && isActive) {
    const { movementId, kill } = selectedMove
    classes.push(`active moving-${movementId}${kill ? ' jump' : ''}`)
  }

  return  classes.join(' ')
}

function Checker ({ checker }) {
  const { row, square, isKing } = checker

  const selectedMove = useSelector(state => state.game.selectedMove)
  const activeChecker = useSelector(state => state.game.activeChecker)

  return (
    <div
      className={buildCheckerClasses(checker, activeChecker, selectedMove )}
      onClick={e => clickChecker(e, checker)}
      onAnimationEnd={() => store.dispatch(setCheckerMoved())}>
      <div className="checker__piece">
        { renderCheckerContent(isKing, row, square) }
      </div>
    </div>
  );
}

export default Checker;