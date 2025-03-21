console.log("start");

let currentPlayer = 'X';
let board = Array(9).fill(null);

function doClick(index) {
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
        alert(`Игрок ${currentPlayer} победил!`);
        resetGame();
        return;
    }

    if (board.every(cell => cell !== null)) {
        alert("Ничья!");
        resetGame();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function renderBoard() {
    for (let i = 0; i < board.length; i++) {
        const field = document.querySelector(`.field-${i}`);
        if (board[i]) {
            field.innerHTML = `<use xlink:href="#TTT${board[i] === 'X' ? 'Cross' : 'Circle'}"/>`;
        } else {
            field.innerHTML = `<use xlink:href="#TTTField"/>`;
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные линии
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные линии
        [0, 4, 8], [2, 4, 6] // Диагонали
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    board.fill(null);
    currentPlayer = 'X';
    renderBoard();
}