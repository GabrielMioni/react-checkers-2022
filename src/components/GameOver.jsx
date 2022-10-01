import React from 'react';
import Dialog from './common/dialog/Dialog'
import { useSelector } from 'react-redux'
import Card from './common/card/Card'
import store from '../store'
import { setGame } from '../store/gameSlice'

function GameOver (props) {
  const winner = useSelector(state => state.game.winner)

  if (!winner) {
    return
  }

  return (
    <div className="game-over">
      <Dialog>
        <Card
          height="250px"
          toolbar="Congrats!">
          <h3>Player '{ winner.toUpperCase() }' won!</h3>
          <p>Would you like to play another game?</p>
          <div>
            <button
              className="button"
              onClick={() => store.dispatch(setGame())}>
              Play Again
            </button>
          </div>
        </Card>
      </Dialog>
    </div>
  );
}

export default GameOver;