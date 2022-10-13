import './App.css';
import Board from './components/Board'
import './scss/app.scss'
import GameOver from './components/GameOver'
import ComputerPlayer from './components/ComputerPlayer'
import { useSelector } from 'react-redux'

function App () {
  const computerIsPlaying = useSelector(state => state.game.computerPlayer)

  return (
    <div className="container">
      { computerIsPlaying && <ComputerPlayer/> }
      <Board />
      <GameOver />
    </div>
  );
}

export default App;
