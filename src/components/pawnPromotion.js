// pawnPromotion.js

export const handlePawnPromotion = (game, from, to) => {
    // Check if the piece moved is a pawn that has reached the promotion rank
    const promotionRank = game.turn() === 'w' ? '8' : '1'; // White pawn goes to 8th rank, black goes to 1st rank
  
    // If the move is to the promotion rank and is a pawn
    if (to[1] === promotionRank && game.get(to).piece === 'p') {
      // Prompt the user for a promotion piece
      const promotionPiece = prompt(
        "Promote your pawn to (q for Queen, r for Rook, b for Bishop, n for Knight):",
        "q" // Default to Queen
      );
  
      // Validate the promotion piece
      if (["q", "r", "b", "n"].includes(promotionPiece)) {
        // Apply the move with the selected promotion piece
        game.move({
          from,
          to,
          promotion: promotionPiece, // Promote the pawn
        });
        
        return game; // Return the updated game state with the promotion applied
      } else {
        // Invalid promotion choice
        alert("Invalid promotion choice. Please choose q, r, b, or n.");
        return game; // Return the game state without any changes
      }
    }
  
    // Return the game state without any changes if no promotion occurred
    return game;
  };
  