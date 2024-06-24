document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('tic-tac-toe-board');
    const playAgainButton = document.getElementById('play-again-button');
    const chooseXButton = document.getElementById('choose-x-button');
    const chooseOButton = document.getElementById('choose-o-button');
    const size = 8;  // Define the size of the board
    let playerSymbol = 'X';
    let aiSymbol = 'O';
    let currentPlayer = 'X';
    let cells = Array(size * size).fill(null);

    function renderBoard() {
        board.innerHTML = '';
        board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;  // Adjust grid template columns
        cells.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.index = index;
            cellElement.dataset.player = cell || ''; // Use data attribute for X or O
            cellElement.addEventListener('click', handleCellClick);
            board.appendChild(cellElement);
        });
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (cells[index] || checkWin() || currentPlayer !== playerSymbol) return;
        cells[index] = currentPlayer;
        currentPlayer = aiSymbol;
        renderBoard();
        if (checkWin()) {
            setTimeout(() => alert(`Player ${cells[index]} wins!`), 100);
            playAgainButton.style.display = 'block';
        } else {
            setTimeout(aiMove, 500); // AI makes a move after 500ms
        }
    }

    function aiMove() {
        let emptyIndices = cells.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
        if (emptyIndices.length === 0 || checkWin()) return;

        let bestMove = getBestMove(cells);
        cells[bestMove] = aiSymbol;
        currentPlayer = playerSymbol;
        renderBoard();
        if (checkWin()) {
            setTimeout(() => alert(`Player ${aiSymbol} wins!`), 100);
            playAgainButton.style.display = 'block';
        }
    }

    function getBestMove(board) {
        let bestScore = -Infinity;
        let move = null;

        // Evaluate each possible move
        for (let i = 0; i < size * size; i++) {
            if (board[i] === null) {
                board[i] = aiSymbol;
                let score = minimax(board, false, 0);
                board[i] = null;

                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }

        return move;
    }

    function minimax(board, isMaximizing, depth) {
        if (checkWin() && aiSymbol === currentPlayer) {
            return 1;
        } else if (checkWin() && playerSymbol === currentPlayer) {
            return -1;
        } else if (emptyIndices.length === 0) {
            return 0;
        }

        let bestScore = isMaximizing ? -Infinity : Infinity;

        for (let i = 0; i < size * size; i++) {
            if (board[i] === null) {
                board[i] = isMaximizing ? aiSymbol : playerSymbol;
                let score = minimax(board, !isMaximizing, depth + 1);
                board[i] = null;

                bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
            }
        }

        return bestScore;
    }

    function checkWin() {
        const winPatterns = generateWinPatterns(size);
        return winPatterns.some(pattern => {
            const [a, b, c, d] = pattern;
            return cells[a] && cells[a] === cells[b] && cells[a] === cells[c] && cells[a] === cells[d];
        });
    }

    function generateWinPatterns(size) {
        const patterns = [];
        // Horizontal win patterns
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size - 3; col++) {
                const start = row * size + col;
                patterns.push([start, start + 1, start + 2, start + 3]);
            }
        }
        // Vertical win patterns
        for (let col = 0; col < size; col++) {
            for (let row = 0; row < size - 3; row++) {
                const start = row * size + col;
                patterns.push([start, start + size, start + 2 * size, start + 3 * size]);
            }
        }
        // Diagonal (top-left to bottom-right) win patterns
        for (let row = 0; row < size - 3; row++) {
            for (let col = 0; col < size - 3; col++) {
                const start = row * size + col;
                patterns.push([start, start + size + 1, start + 2 * size + 2, start + 3 * size + 3]);
            }
        }
        // Diagonal (bottom-left to top-right) win patterns
        for (let row = 3; row < size; row++) {
            for (let col = 0; col < size - 3; col++) {
                const start = row * size + col;
                patterns.push([start, start - size + 1, start - 2 * size + 2, start - 3 * size + 3]);
            }
        }
        return patterns;
    }

    function startGame(symbol) {
        playerSymbol = symbol;
        aiSymbol = symbol === 'X' ? 'O' : 'X';  // Assign opposite symbol for AI
        currentPlayer = 'X';
        cells = Array(size * size).fill(null);
        renderBoard();
        playAgainButton.style.display = 'none';
        chooseXButton.style.display = 'none';
        chooseOButton.style.display = 'none';

        if (symbol === aiSymbol) {
            setTimeout(aiMove, 500); // AI starts if AI plays first
        }
    }

    playAgainButton.addEventListener('click', () => {
        startGame(playerSymbol);
    });

    chooseXButton.addEventListener('click', () => {
        startGame('X');
    });

    chooseOButton.addEventListener('click', () => {
        startGame('O');
    });

    chooseXButton.style.display = 'block';
    chooseOButton.style.display = 'block';

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
