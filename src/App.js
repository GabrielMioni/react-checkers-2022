import './App.css';
import Board from './components/Board'
import './scss/app.scss'
import GameOver from './components/GameOver'

function App () {
  return (
    <div className="container">
      <Board />
      <GameOver />
    </div>
  );
}

export default App;
