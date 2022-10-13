import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { setActiveChecker, setSelectedMove } from '../store/gameSlice'
import { getBestMove } from '../services/computerPlayerService'
import { players } from '../services/players'
import store from '../store'

function ComputerPlayer () {
  const computerIsPlaying = useSelector(state => state.game.computerPlayer)
  const currentPlayer = useSelector(state => state.game.currentPlayer)
  const multiJumpActive = useSelector(state => state.game.multiJumpActive)
  const checkers = useSelector(state => state.game.checkers)

  /* **************************************************************************
   * If the game is has a computer player and the current player is
   * the computer, start the computer's turn
   * **************************************************************************/
  useEffect(() => {
    if (!(computerIsPlaying && currentPlayer === players.b)) {
      return
    }
    const computerMove = getBestMove(checkers, players.b)
    const { checker } = computerMove

    store.dispatch(setActiveChecker(checker))
    setTimeout(() => {
      store.dispatch(setSelectedMove(computerMove))
    }, 500)
  }, [checkers, computerIsPlaying, currentPlayer, multiJumpActive])

  return null
}

export default ComputerPlayer;
