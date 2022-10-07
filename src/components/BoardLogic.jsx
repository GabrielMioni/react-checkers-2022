import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { setComputerTurn } from '../store/gameSlice'
import { players } from '../services/players'
import store from '../store'

function BoardLogic () {
  const computerIsPlaying = useSelector(state => state.game.computerPlayer)
  const currentPlayer = useSelector(state => state.game.currentPlayer)

  useEffect(() => {
    if (!(computerIsPlaying && currentPlayer === players.b)) {
      return
    }
    setTimeout(() => {
      store.dispatch(setComputerTurn())
    }, 0)

  }, [computerIsPlaying, currentPlayer])

  return null
}

export default BoardLogic;
