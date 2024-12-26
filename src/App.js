import React, { useState, useEffect } from 'react';
import ChessboardWrapper from './components/ChessboardWrapper';
import Chess from 'chess.js';
import { getGameStatus } from './components/gameStatusUtils'; // Game status utility
import Confetti from 'react-confetti';
import './App.css';

function App() {
  const [game, setGame] = useState(new Chess());
  const [isGameOver, setIsGameOver] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [winner, setWinner] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);

  const checkGameOver = () => {
    const { status, winner } = getGameStatus(game);

    if (status) {
      setStatusMessage(status);
      setWinner(winner);
      setIsGameOver(true);
      setShowOverlay(true);
    }
  };

  useEffect(() => {
    if (game instanceof Chess) {
      checkGameOver();
    }
  }, [game]);

  const onPieceDrop = (from, to) => {
    const move = { from, to };
    const moveResult = game.move(move);

    if (moveResult) {
      setGame(new Chess(game.fen()));
      checkGameOver();
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setIsGameOver(false);
    setStatusMessage('');
    setWinner('');
    setShowOverlay(false);
  };

  return (
    <div className="App">
      {isGameOver && <Confetti />}
      <h1>React Chess Game</h1>
      <div className="chessboard-wrapper">
        <ChessboardWrapper
          game={game}
          onPieceDrop={onPieceDrop}
          className="chessboard"
        />
      </div>
      <button onClick={resetGame}>Reset Game</button>

      {showOverlay && (
        <div className="overlay">
          <h2>{statusMessage}</h2>
          {winner && <p>{`${winner} Wins!`}</p>}
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
