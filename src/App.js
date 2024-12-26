import React, { useState, useEffect } from "react";
import ChessboardWrapper from "./components/ChessboardWrapper";
import Chess from "chess.js";
import { getGameStatus } from "./components/gameStatusUtils";
import Confetti from "react-confetti"; 
import { handlePawnPromotion } from "./components/pawnPromotion"; // Import the pawn promotion handler
import "./App.css";

function App() {
  const [game, setGame] = useState(new Chess());
  const [playerColor, setPlayerColor] = useState(null); // Player's selected color
  const [isGameOver, setIsGameOver] = useState(false);
  const [boardOrientation, setBoardOrientation] = useState("white"); // Default board orientation
  const [gameStatus, setGameStatus] = useState({ status: "", winner: "None" });
  const [showConfetti, setShowConfetti] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [winner, setWinner] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  // Check game status and trigger confetti if necessary
  const checkGameOver = () => {
    const { status, winner } = getGameStatus(game);

    if (status) {
      if (status === "Checkmate!" || status === "Stalemate!" || status === "Draw!") {
        setStatusMessage(status);
        setWinner(winner);
        setGameStatus({ status, winner });
        setIsGameOver(true);
        setShowOverlay(true);
        if (status === "Checkmate!" || status === "Stalemate!" || status === "Draw!") {
          setShowConfetti(true);
        }
      }
    }
  };

  // Make a computer move if it's the computer's turn
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

  // Handle piece drops (player moves)
  const handlePieceDrop = (from, to) => {
    if (game.turn() === playerColor[0]) {
      const move = game.move({ from, to });
      if (move) {
        // Call the pawn promotion handler
        const updatedGame = handlePawnPromotion(game, from, to);

        if (updatedGame) {
          setGame(new Chess(updatedGame.fen())); // Update the game state after pawn promotion
        } else {
          setGame(new Chess(game.fen())); // No promotion, update the game normally
        }

        checkGameOver();
        setTimeout(makeComputerMove, 500); // Allow some delay for computer moves
      } else {
        console.log("Invalid move");
      }
    } else {
      console.log("It's not your turn");
    }
  };

  const resetGame = () => {
    setGame(new Chess());
    setIsGameOver(false);
    setPlayerColor(null);
    setGameStatus({ status: "", winner: "None" });
    setShowConfetti(false);
    setStatusMessage("");
    setWinner("");
    setShowOverlay(false);
  };

  useEffect(() => {
    if (playerColor && game.turn() !== playerColor[0]) {
      setTimeout(makeComputerMove, 500);
    }
  }, [playerColor, game]);

  // Update board orientation based on player's color selection
  const handleColorSelection = (color) => {
    setPlayerColor(color);
    setBoardOrientation(color === "white" ? "white" : "black"); // Change board orientation based on color
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
            boardOrientation={boardOrientation} // Set the board orientation based on selected color
            onPieceDrop={handlePieceDrop}
          />
          <button onClick={resetGame}>Reset Game</button>

          {showOverlay && (
            <div className="overlay">
              <h2>{statusMessage}</h2>
              {winner && <p>{winner !== "None" ? `${winner} Wins!` : "It's a draw!"}</p>}
              <button onClick={resetGame}>Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
