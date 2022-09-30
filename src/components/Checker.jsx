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
  const activeId = activeChecker?.id

  const isActive = id === activeId

  let classesString = `checker player-${player}`
  if (isActive) {
    classesString += ' active'
  }

  if (!isActive) {
    return classesString
  }

  if (selectedMove) {
    const { movementId, kill } = selectedMove
    classesString += ` moving-${movementId}`
    if (kill) {
      classesString += ' jump'
    }
  }

  return classesString
}

const animationEnd = () => {
  store.dispatch(setCheckerMoved())
}

function Checker ({ checker }) {
  const { row, square, isKing } = checker

  const selectedMove = useSelector(state => state.game.selectedMove)
  const activeChecker = useSelector(state => state.game.activeChecker)

  return (
    <div
      className={buildCheckerClasses(checker, activeChecker, selectedMove )}
      onClick={e => clickChecker(e, checker)}
      onAnimationEnd={() => animationEnd()}>
      <div className="checker__piece">
        { renderCheckerContent(isKing, row, square) }
      </div>
    </div>
  );
}

export default Checker;