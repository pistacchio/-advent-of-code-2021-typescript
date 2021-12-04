"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const fs = require("fs");
const INPUT_FILE = '/data/1.txt';
const input = fs
    .readFileSync(__dirname + INPUT_FILE)
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(Number);
function part1(input) {
    return input.reduce(([prev, sum], curr) => [curr, sum + (curr > prev ? 1 : 0)], [Number.MAX_SAFE_INTEGER, 0])[1];
}
function part2(input) {
    const WINDOW_SIZE = 3;
    return input.reduce(([prev, sum], _, idx) => {
        const window = input.slice(idx, idx + WINDOW_SIZE);
        if (window.length < WINDOW_SIZE) {
            return [0, sum];
        }
        const windowSum = window.reduce((a, c) => a + c, 0);
        return [windowSum, sum + (windowSum > prev ? 1 : 0)];
    }, [Number.MAX_SAFE_INTEGER, 0])[1];
}
function run() {
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
}
exports.run = run;
//# sourceMappingURL=1.js.map