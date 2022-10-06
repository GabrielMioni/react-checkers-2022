import React, { useEffect } from 'react';
import Row from './Row'
import store from '../store'
import { setGame, setSelectedMove } from '../store/gameSlice'
import '../scss/board.scss'
import { useSelector } from 'react-redux'

function Board () {

  const iterateValue = 8

  useEffect(() => {
    store.dispatch(setGame())
  }, [])

  const computerMove = useSelector(state => state.game.computerMove)
  const availableMoves = useSelector(state => state.game.availableMoves)

  if (computerMove && availableMoves) {
    setTimeout(() => {
      const selectedMove = availableMoves[computerMove.movementId]
      store.dispatch(setSelectedMove(selectedMove))
    }, 500)
  }

  return (
    <div className="board">
      {Array(iterateValue).fill('').map((row, rowIndex) => (
        <Row
          key={`row_${rowIndex}`}
          row={rowIndex}
          iterateValue={iterateValue}
        />
      ))}
    </div>
  );
}

export default Board;