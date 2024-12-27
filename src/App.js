import React, { useState, useEffect } from "react";
import ChessboardWrapper from "./components/ChessboardWrapper";
import Chess from "chess.js";
import { getGameStatus } from "./components/gameStatusUtils";
import Confetti from "react-confetti"; 
import "./App.css";

function App() {
  const [game, setGame] = useState(new Chess());
  const [playerColor, setPlayerColor] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [promotionInfo, setPromotionInfo] = useState(null); // Tracks promotion details
  const [gameStatus, setGameStatus] = useState({ status: "", winner: "None" });
  const [showConfetti, setShowConfetti] = useState(false);

  const checkGameOver = () => {
    const { status, winner } = getGameStatus(game);
    if (status) {
      setGameStatus({ status, winner });
      setIsGameOver(true);
      if (["Checkmate!", "Stalemate!", "Draw!"].includes(status)) {
        setShowConfetti(true);
      }
    }
  };

  const makeComputerMove = () => {
    if (!game.game_over() && game.turn() !== playerColor[0]) {
      const moves = game.moves();
      if (moves.length > 0) {
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        game.move(randomMove);
        setGame(new Chess(game.fen()));
        checkGameOver();
      }
    }
  };

  const handlePieceDrop = (from, to) => {
    if (game.turn() === playerColor[0]) {
      const piece = game.get(from);

      // Check if a pawn is eligible for promotion
      const promotionRank = playerColor === "white" ? "8" : "1";
      if (piece?.type === "p" && to[1] === promotionRank) {
        setPromotionInfo({ from, to });
        return; // Stop the move temporarily for promotion
      }

      const move = game.move({ from, to });
      if (move) {
        setGame(new Chess(game.fen()));
        checkGameOver();
        setTimeout(makeComputerMove, 500);
      } else {
        console.log("Invalid move");
      }
    }
  };

  const handlePromotion = (promotionPiece) => {
    if (promotionInfo) {
      const { from, to } = promotionInfo;
      const move = game.move({
        from,
        to,
        promotion: promotionPiece, // Apply promotion
      });

      if (move) {
        setGame(new Chess(game.fen()));
        setPromotionInfo(null); // Clear promotion state
        checkGameOver();
        setTimeout(makeComputerMove, 500); // Computer's turn
      } else {
        console.log("Invalid promotion move");
      }
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setIsGameOver(false);
    setPlayerColor(null);
    setGameStatus({ status: "", winner: "None" });
    setShowConfetti(false);
    setPromotionInfo(null);
  };

  const handleColorSelection = (color) => {
    setPlayerColor(color);
    setBoardOrientation(color === "white" ? "white" : "black");
  };

  return (
    <div className="App">
      {showConfetti && <Confetti />}
      {!playerColor ? (
        <div className="color-selection">
          <h2>Select Your Color</h2>
          <button onClick={() => handleColorSelection("white")}>White</button>
          <button onClick={() => handleColorSelection("black")}>Black</button>
        </div>
      ) : (
        <>
          <h1>React Chess Game</h1>
          <ChessboardWrapper
            game={game}
            boardOrientation={boardOrientation}
            onPieceDrop={handlePieceDrop}
          />
          <button onClick={resetGame}>Reset Game</button>

          {promotionInfo && (
            <div className="promotion-modal">
              <h3>Promote your pawn:</h3>
              <button onClick={() => handlePromotion("q")}>Queen</button>
              <button onClick={() => handlePromotion("r")}>Rook</button>
              <button onClick={() => handlePromotion("b")}>Bishop</button>
              <button onClick={() => handlePromotion("n")}>Knight</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
