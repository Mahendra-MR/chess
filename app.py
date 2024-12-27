from flask import Flask, request, jsonify
import chess
import chess.engine
import os
from flask_cors import CORS  # Import CORS for cross-origin requests

app = Flask(__name__)
CORS(app)  # Enable CORS for the app

# Initialize the chess board
game = chess.Board()

# Specify the correct path to the Stockfish binary
stockfish_path = r"C:\Users\Mahendra MR\Documents\workspace\chess\stockfish\stockfish-windows-x86-64-avx2.exe"


# Ensure Stockfish path exists
if not os.path.isfile(stockfish_path):
    raise FileNotFoundError(f"Stockfish binary not found at {stockfish_path}")

# Set up Stockfish engine
engine = chess.engine.SimpleEngine.popen_uci(stockfish_path)

@app.route('/move', methods=['POST'])
def make_move():
    try:
        move_data = request.json
        move = move_data.get('move')

        if not move:
            return jsonify({'status': 'error', 'message': 'No move data provided'})

        # Make the move from the client (player's move)
        try:
            game.push_san(move)
        except ValueError:
            return jsonify({'status': 'error', 'message': 'Invalid move'})

        # AI makes its move using Stockfish
        ai_move = engine.play(game, chess.engine.Limit(time=2.0))  # AI thinking time: 2 seconds
        game.push(ai_move.move)

        # Return the updated board state in FEN notation and the AI's move
        return jsonify({
            'status': 'success',
            'move': ai_move.move.uci(),
            'board': game.fen()  # Send the board state after AI's move
        })
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/legal_moves', methods=['GET'])
def get_legal_moves():
    try:
        # Get the list of legal moves in UCI format
        legal_moves = [move.uci() for move in game.legal_moves]
        return jsonify({'status': 'success', 'legal_moves': legal_moves})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/reset', methods=['GET'])
def reset_game():
    try:
        global game
        game = chess.Board()  # Reset the game
        return jsonify({'status': 'success', 'board': game.fen()})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    try:
        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        print(f"Error running the app: {e}")
