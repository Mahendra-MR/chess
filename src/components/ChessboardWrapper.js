import React from 'react';
import { Chessboard } from 'react-chessboard';

const ChessboardWrapper = ({ game, onPieceDrop }) => {
  const boardSize = Math.min(window.innerWidth * 0.6, 700); // Dynamically calculate size

  return (
    <div className="chessboard-wrapper">
      <Chessboard
        position={game.fen()}
        onPieceDrop={(from, to) => {
          onPieceDrop(from, to);
        }}
        boardWidth={boardSize} // Adjust dynamically for responsiveness
        arePiecesDraggable={!game.game_over()}
        boardOrientation="white"
      />
    </div>
  );
};

export default ChessboardWrapper;
