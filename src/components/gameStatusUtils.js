// src/utils/gameStatusUtils.js
import Chess from 'chess.js';

export const getGameStatus = (game) => {
  if (game.in_checkmate()) {
    const winner = game.turn() === 'w' ? 'Black' : 'White';
    return { status: 'Checkmate!', winner };
  } else if (game.in_stalemate()) {
    return { status: 'Stalemate!', winner: 'None' };
  } else if (game.in_draw()) {
    return { status: 'Draw!', winner: 'None' };
  } else if (game.in_check()) {
    return { status: 'Check!', winner: 'None' };
  } else if (game.game_over()) {
    return { status: 'Game Over!', winner: 'None' };
  }
  return { status: '', winner: 'None' };
};
