import React from "react";
import { Chessboard } from "react-chessboard";

const ChessboardWrapper = ({ game, boardOrientation, onPieceDrop }) => {
  const boardSize = Math.min(window.innerWidth * 0.6, 700);

  return (
    <div className="chessboard-wrapper">
      <Chessboard
        position={game.fen()}
        onPieceDrop={(from, to) => {
          onPieceDrop(from, to);
        }}
        boardWidth={boardSize}
        arePiecesDraggable={!game.game_over()}
        boardOrientation={boardOrientation} // Adjust orientation based on player color
      />
    </div>
  );
};

export default ChessboardWrapper;
