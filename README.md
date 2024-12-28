# React Chess Game with Stockfish Integration

This project is a chess game built using React on the frontend and Python for the backend. The frontend allows users to play chess against the computer, with the game logic powered by Chess.js. The backend leverages the Stockfish chess engine to provide stronger AI moves.

## Features
- **React Frontend**: Provides the chessboard UI and player interactions.
- **Chess.js**: Manages the game state, move validation, and pawn promotion.
- **Stockfish Integration**: Python backend with Stockfish engine to make computer moves.
- **Confetti Animation**: Display confetti when the game ends in checkmate, stalemate, or draw.
- **AI Opponent**: Basic AI using Stockfish to play as the opponent.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Mahendra-MR/react-chess-game.git
cd react-chess-game
```

# Install Frontend Dependencies

Navigate to the frontend directory (/client or wherever your React app is located) and install the necessary dependencies:

```bash
cd client
npm install
```

 # Install Backend Dependencies
If you're running the Python backend (Stockfish integration), make sure you have the backend server set up. Here's how to install dependencies for the Python part of the project:

## Navigate to the backend directory (if you have one, otherwise skip this part):
```bash 
cd backend
```
## Set up a Python virtual environment (optional but recommended):
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
```
## Install required packages: Install the necessary Python packages using pip:
```bash
pip install -r requirements.txt
```
## Download and Set up Stockfish:

Stockfish is a powerful chess engine. You will need to download the Stockfish executable and place it in the backend folder or specify its location.
You can download Stockfish from [here](https://stockfishchess.org/download/).

# Run Python Backend Server
To start the backend server that interacts with Stockfish, run the following command:

```bash
python app.py
```
This will start a Python server on http://localhost:5000, which handles requests related to the game and uses the Stockfish engine for move generation.

# Start the React Frontend
Once the backend server is running, go back to the React frontend directory and start the React development server:

```bash
cd client
npm start
```
This will launch the frontend React application in your browser, typically at http://localhost:3000.

# Backend Details

## app.py
**Flask Server:** This file is a simple Flask app that exposes an API to interact with the Stockfish chess engine.
**Stockfish:** The backend uses the Stockfish engine to make AI moves. Stockfish is powerful and can provide challenging moves for the player.
The backend listens for requests from the React frontend, processes the move, and sends back the AI's response.

**Example API flow:**
Frontend sends the current board state and player move to the backend.
Backend processes the move, asks Stockfish for the best move, and returns it to the frontend.
The frontend updates the board with the computer's move.


# Packages Installed
## Frontend (React):
**React:** A JavaScript library for building user interfaces.
**Chess.js:** A library for managing the game of chess, including move generation and validation.
**Confetti:** A library used to show confetti animations when the game ends in checkmate, stalemate, or draw.
**React-confetti:** React wrapper for the confetti package used to display confetti animation.

## Backend (Python):
**Flask:** A lightweight Python web framework for building REST APIs.
**Stockfish:** A powerful open-source chess engine used to generate computer moves.
**pyChess:** Optional Python wrapper around Stockfish (if used for advanced interactions).


To view and modify the installed packages, check the package.json (React) and requirements.txt (Python) files.