"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const fs = require("fs");
const INPUT_FILE = '/data/2.txt';
const DIRECTION_MAPPING = {
    forward: 0,
    down: 1,
    up: 1,
};
var Direction;
(function (Direction) {
    Direction[Direction["forward"] = 0] = "forward";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Up"] = 2] = "Up";
})(Direction || (Direction = {}));
const input = fs
    .readFileSync(__dirname + INPUT_FILE)
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
    const [direction, steps] = line.split(' ');
    return [
        DIRECTION_MAPPING[direction],
        parseInt(steps) * (direction === 'up' ? -1 : 1),
    ];
});
function part1(input) {
    const { horizontal, depth } = input.reduce((acc, [direction, steps]) => {
        switch (direction) {
            case Direction.forward:
                return Object.assign(Object.assign({}, acc), { horizontal: acc.horizontal + steps });
            case Direction.Down:
                return Object.assign(Object.assign({}, acc), { depth: acc.depth + steps });
            case Direction.Up:
                return Object.assign(Object.assign({}, acc), { depth: acc.depth - steps });
        }
    }, { horizontal: 0, depth: 0, aim: 0 });
    return horizontal * depth;
}
function part2(input) {
    const { horizontal, depth, aim } = input.reduce((acc, [direction, steps]) => {
        switch (direction) {
            case Direction.forward:
                return Object.assign(Object.assign({}, acc), { horizontal: acc.horizontal + steps, depth: acc.depth + acc.aim * steps });
            case Direction.Down:
                return Object.assign(Object.assign({}, acc), { 
                    // depth: acc.depth + steps,
                    aim: acc.aim + steps });
            case Direction.Up:
                return Object.assign(Object.assign({}, acc), { 
                    // depth: acc.depth - steps,
                    aim: acc.aim - steps });
        }
    }, { horizontal: 0, depth: 0, aim: 0 });
    return horizontal * depth;
}
function run() {
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
}
exports.run = run;
//# sourceMappingURL=2.js.map