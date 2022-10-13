import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { setActiveChecker, setSelectedMove } from '../store/gameSlice'
import { getBestMove } from '../services/computerPlayerService'
import { players } from '../services/players'
import store from '../store'

function ComputerPlayer () {
  const checkers = useSelector(state => state.game.checkers)
  const computerIsPlaying = useSelector(state => state.game.computerPlayer)
  const currentPlayer = useSelector(state => state.game.currentPlayer)
  const winner = useSelector(state => state.game.winner)

  /* **************************************************************************
   * If the game is has a computer player and the current player is
   * the computer, start the computer's turn
   * **************************************************************************/
  useEffect(() => {
    if (!(computerIsPlaying && currentPlayer === players.b) || winner) {
      return
    }
    const computerMove = getBestMove(checkers, players.b)
    const { checker } = computerMove

    store.dispatch(setActiveChecker(checker))
    setTimeout(() => {
      store.dispatch(setSelectedMove(computerMove))
    }, 500)
  }, [checkers, computerIsPlaying, currentPlayer, winner])

  return null
}

export default ComputerPlayer;
