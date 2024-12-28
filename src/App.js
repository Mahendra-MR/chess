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
      if (status === "Checkmate!" || status === "Stalemate!" || status === "Draw!") {
        setIsGameOver(true); // Stop the game if it's checkmate, stalemate, or draw
        if (["Checkmate!", "Stalemate!", "Draw!"].includes(status)) {
          setShowConfetti(true); // Trigger confetti for checkmate or draw
        }
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
        if (playerColor === "black") {
          // If player is black, make the computer move after their turn
          setTimeout(makeComputerMove, 500);
        }
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

  // Trigger computer move when player selects either color
  useEffect(() => {
    if (playerColor) {
      // If player selects white, computer plays black, and vice versa
      setTimeout(() => {
        if (game.turn() !== playerColor[0]) {
          makeComputerMove(); // Make the computer's move immediately after the player selects their color
        }
      }, 500); // Delay to simulate a smoother game flow
    }
  }, [playerColor, game.turn()]); // Run when playerColor changes or game.turn() changes

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

          {/* Show game over status */}
          {isGameOver && (
            <div className="overlay">
              {/* Show the status only if the game is really over */}
              {(gameStatus.status === "Checkmate!" || gameStatus.status === "Stalemate!" || gameStatus.status === "Draw!") && (
                <>
                  <h2>{gameStatus.status}</h2>
                  <h3>Winner: {gameStatus.winner}</h3>
                  <button onClick={resetGame}>Play Again</button>
                </>
              )}
            </div>
          )}

          {/* Add blur effect when game is over (checkmate, stalemate, draw) */}
          {isGameOver && (
            <div className="blur-background"></div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
