document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('tic-tac-toe-board');
    const playAgainButton = document.getElementById('play-again-button');
    const size = 8;  // Define the size of the board
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
        if (cells[index] || checkWin()) return;
        cells[index] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        renderBoard();
        if (checkWin()) {
            setTimeout(() => alert(`Player ${cells[index]} wins!`), 100);
            playAgainButton.style.display = 'block';
        }
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

    playAgainButton.addEventListener('click', () => {
        cells = Array(size * size).fill(null);
        currentPlayer = 'X';
        renderBoard();
        playAgainButton.style.display = 'none';
    });

    renderBoard();
});
