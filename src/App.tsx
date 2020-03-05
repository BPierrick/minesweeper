import React from "react";
import "./App.css";
import Game from './components/game/game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <GameBoard
          size={5}
          numberOfMines={5}
        /> */}
        <Game/>
      </header>
    </div>
  );
}

export default App;
