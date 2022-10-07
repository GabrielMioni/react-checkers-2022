import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { setComputerTurn, setSelectedMove } from '../store/gameSlice'
import { players } from '../services/players'
import store from '../store'

function BoardLogic () {
  const computerIsPlaying = useSelector(state => state.game.computerPlayer)
  const currentPlayer = useSelector(state => state.game.currentPlayer)

  /* **************************************************************************
   * If the game is has a computer player and the current player is
   * the computer, start the computer's turn
   * **************************************************************************/
  useEffect(() => {
    if (!(computerIsPlaying && currentPlayer === players.b)) {
      return
    }
    setTimeout(() => {
      store.dispatch(setComputerTurn())
    }, 0)

  }, [computerIsPlaying, currentPlayer])

  /* **************************************************************************
   * If a computer move is present, use it to find the available move and
   * pass it to setSelectedMove
   * **************************************************************************/
  const computerMove = useSelector(state => state.game.computerMove)
  const availableMoves = useSelector(state => state.game.availableMoves)

  if (computerMove && availableMoves) {
    setTimeout(() => {
      const selectedMove = availableMoves[computerMove.movementId]
      store.dispatch(setSelectedMove(selectedMove))
    }, 500)
  }

  return null
}

export default BoardLogic;
