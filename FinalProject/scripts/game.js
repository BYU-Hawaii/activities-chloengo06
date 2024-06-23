document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('tic-tac-toe-board');
    let currentPlayer = 'X';
    const cells = Array(9).fill(null);
    
    function renderBoard() {
        board.innerHTML = '';
        cells.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.index = index;
            cellElement.innerText = cell || '';
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
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
        });
    }

    renderBoard();
});
