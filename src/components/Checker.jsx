import React from 'react';
import store from '../store'
import { setActiveChecker, setCheckerMoved, checkerHasPossibleMove } from '../store/gameSlice'
import crown from '../assets/crown.png'
import '../scss/checker.scss'
import { useSelector } from 'react-redux'

const clickChecker = (event, checker, hasPossibleMove) => {
  event.stopPropagation()
  const setValue = hasPossibleMove ? checker : null
  store.dispatch(setActiveChecker(setValue))
}

const renderCheckerContent = (isKing, row, square) => {
  return isKing
    ? <img src={crown} alt="crown"/>
    : `${row},${square}`
}

const buildCheckerClasses = (checker, activeChecker, selectedMove, hasPossibleMove) => {
  const { id, player } = checker

  const classes = [`checker player-${player}`]

  if (hasPossibleMove && !activeChecker) {
    classes.push('has-possible-move')
  }

  const isActive = id === activeChecker?.id

  if (!selectedMove && isActive) {
    classes.push('active')
  }

  if (selectedMove && isActive) {
    const { movementId, kill } = selectedMove
    classes.push(`moving-${movementId}${kill ? ' jump' : ''}`)
  }

  return  classes.join(' ')
}

function Checker ({ checker }) {
  const { row, square, isKing } = checker

  const selectedMove = useSelector(state => state.game.selectedMove)
  const activeChecker = useSelector(state => state.game.activeChecker)
  const possibleMoves = useSelector(state => state.game.possibleMoves)

  const hasPossibleMove = checkerHasPossibleMove(possibleMoves, checker)

  return (
    <div
      className={buildCheckerClasses(checker, activeChecker, selectedMove, hasPossibleMove )}
      onClick={e => clickChecker(e, checker, hasPossibleMove)}
      onAnimationEnd={() => store.dispatch(setCheckerMoved())}>
      <div className="checker__piece">
        { renderCheckerContent(isKing, row, square) }
      </div>
    </div>
  );
}

export default Checker;