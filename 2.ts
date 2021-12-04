import * as fs from 'fs';

const INPUT_FILE = '/data/2.txt';

const DIRECTION_MAPPING = {
  forward: 0,
  down: 1,
  up: 1,
};

enum Direction {
  forward,
  Down,
  Up,
}

type DirectionIndication = [direction: Direction, steps: number];

const input: DirectionIndication[] = fs
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

function part1(input: DirectionIndication[]): number {
  const { horizontal, depth } = input.reduce(
    (acc, [direction, steps]) => {
      switch (direction) {
        case Direction.forward:
          return {
            ...acc,
            horizontal: acc.horizontal + steps,
          };
        case Direction.Down:
          return {
            ...acc,
            depth: acc.depth + steps,
          };
        case Direction.Up:
          return {
            ...acc,
            depth: acc.depth - steps,
          };
      }
    },
    { horizontal: 0, depth: 0, aim: 0 },
  );

  return horizontal * depth;
}

function part2(input: DirectionIndication[]): number {
  const { horizontal, depth, aim } = input.reduce(
    (acc, [direction, steps]) => {
      switch (direction) {
        case Direction.forward:
          return {
            ...acc,
            horizontal: acc.horizontal + steps,
            depth: acc.depth + acc.aim * steps,
          };
        case Direction.Down:
          return {
            ...acc,
            // depth: acc.depth + steps,
            aim: acc.aim + steps,
          };
        case Direction.Up:
          return {
            ...acc,
            // depth: acc.depth - steps,
            aim: acc.aim - steps,
          };
      }
    },
    { horizontal: 0, depth: 0, aim: 0 },
  );

  return horizontal * depth;
}

export function run(): void {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
