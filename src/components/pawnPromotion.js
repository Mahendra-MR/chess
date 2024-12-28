export const handlePawnPromotion = (game, from, to) => {
  const promotionRank = game.turn() === "w" ? "8" : "1"; // White promotes on rank 8, Black on rank 1

  // Check if the piece moved is a pawn and has reached the promotion rank
  if (to[1] === promotionRank && game.get(from)?.type === "p") {
    let promotionPiece;
    while (true) {
      // Prompt the user for a promotion piece
      promotionPiece = prompt(
        "Promote your pawn to (q for Queen, r for Rook, b for Bishop, n for Knight):",
        "q" // Default to Queen
      );

      // Validate the input
      if (["q", "r", "b", "n"].includes(promotionPiece)) {
        break; // Exit the loop on valid input
      } else {
        alert("Invalid input! Please enter q, r, b, or n.");
      }
    }

    // Apply the move with the selected promotion piece
    const move = game.move({
      from,
      to,
      promotion: promotionPiece,
    });

    if (move) {
      return game; // Return the updated game state
    } else {
      alert("Error applying promotion!");
      return null;
    }
  }

  // Return null if no promotion occurred
  return null;
};
