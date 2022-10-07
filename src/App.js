import './App.css';
import Board from './components/Board'
import './scss/app.scss'
import GameOver from './components/GameOver'
import BoardLogic from './components/BoardLogic'

function App () {
  return (
    <div className="container">
      <BoardLogic />
      <Board />
      <GameOver />
    </div>
  );
}

export default App;
