"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const fs = require("fs");
const INPUT_FILE = '/data/4.txt';
const BOARD_ROWS = 5;
const BOARD_COLS = 5;
const input = fs
    .readFileSync(__dirname + INPUT_FILE)
    .toString()
    .trim()
    .split('\n')
    .map((r) => r.trim());
class BingoBoard {
    constructor(input) {
        this.rows = input.map((row) => row
            .split(' ')
            .map((n) => n.trim())
            .filter(Boolean)
            .map((c) => ({ value: Number(c), checked: false })));
    }
    markDraw(draw) {
        this.rows = this.rows.map((row) => row.map((c) => (Object.assign(Object.assign({}, c), { checked: c.value === draw ? true : c.checked }))));
    }
    check() {
        return (this.rows.some((row) => row.every((c) => c.checked)) ||
            Array.from({ length: BOARD_COLS }).some((_, i) => this.rows.every((row) => row[i].checked)));
    }
    score(draw) {
        const sumOfUnchecked = this.rows.reduce((acc, row) => {
            return (acc +
                row.reduce((acc, c) => {
                    return acc + (!c.checked ? c.value : 0);
                }, 0));
        }, 0);
        return sumOfUnchecked * draw;
    }
}
class BingoSystem {
    constructor(input) {
        this.currentDrawIdx = -1;
        this.draws = input[0].split(',').map(Number);
        const numberOfBoards = input.filter((r) => r === '').length;
        this.boards = Array.from({ length: numberOfBoards }, (_, idx) => new BingoBoard(input.slice(idx * BOARD_ROWS + 2 + idx, idx * BOARD_ROWS + BOARD_ROWS + 2 + idx)));
    }
    run() {
        while (true) {
            const score = this.drawNumber();
            if (score !== null) {
                return score;
            }
        }
    }
    runToLose() {
        return this.draws.reduce((lastWinningScore) => {
            const score = this.drawNumber(true);
            return score === null ? lastWinningScore : score;
        }, 0);
    }
    drawNumber(removeWinner = false) {
        this.currentDrawIdx++;
        this.boards.forEach((board) => board.markDraw(this.draws[this.currentDrawIdx]));
        const winningBoard = this.boards.find((board) => board.check());
        let winningScore = null;
        if (winningBoard) {
            winningScore = winningBoard.score(this.draws[this.currentDrawIdx]);
        }
        if (removeWinner) {
            this.boards = this.boards.filter((board) => !board.check());
        }
        return winningScore;
    }
}
function part1(input) {
    const bingoSystem = new BingoSystem(input);
    return bingoSystem.run();
}
function part2(input) {
    const bingoSystem = new BingoSystem(input);
    return bingoSystem.runToLose();
}
function run() {
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
}
exports.run = run;
//# sourceMappingURL=4.js.map