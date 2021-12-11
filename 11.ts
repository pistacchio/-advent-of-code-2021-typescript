import * as fs from 'fs';
import { groupBy } from 'lodash';
import { sign } from 'crypto';

const INPUT_FILE = '/data/11.txt';

const READY_TO_FLASH = 9;
const STEPS = 100;

const input = fs
  .readFileSync(__dirname + INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((r) => r.trim())
  .filter(Boolean)
  .map((l) => l.split('').map(Number));

function executeStep(grid: number[][]): [number[][], number] {
  let alreadyFlashed: string[] = [];

  // Each cell of the grid increases by 1
  grid = grid.map((row) => row.map((cell) => cell + 1));

  do {
    // For each cell whose value is 9 or more, also increase by 1 all the adjacent cells
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (
          grid[y][x] > READY_TO_FLASH &&
          !alreadyFlashed.includes(`${x},${y}`)
        ) {
          alreadyFlashed.push(`${x},${y}`);

          // Increase all the adjacent cells
          for (let yy = y - 1; yy <= y + 1; yy++) {
            for (let xx = x - 1; xx <= x + 1; xx++) {
              if (
                xx >= 0 &&
                xx < grid[y].length &&
                yy >= 0 &&
                yy < grid.length
              ) {
                grid[yy][xx]++;
              }
            }
          }
        }
      }
    }
  } while (
    grid.some((row, y) =>
      row.some(
        (cell, x) =>
          cell > READY_TO_FLASH && !alreadyFlashed.includes(`${x},${y}`),
      ),
    )
  );

  // Set to 0 all the cells that have flashed
  return [
    grid.map((row, y) =>
      row.map((cell, x) => (alreadyFlashed.includes(`${x},${y}`) ? 0 : cell)),
    ),
    alreadyFlashed.length,
  ];
}

function part1(input: number[][]): number {
  let grid = input;
  let flahed = 0;

  for (let i = 0; i < STEPS; i++) {
    const [newGrid, newFlashed] = executeStep(grid);
    flahed += newFlashed;
    grid = newGrid;
  }

  return flahed;
}

function part2(input: number[][]): number {
  const gridSize = input.length * input[0].length;
  let grid = input;
  let flahed = 0;
  let stepNumber = 0;

  while (true) {
    const [newGrid, newFlashed] = executeStep(grid);
    stepNumber++;

    if (newFlashed === gridSize) {
      return stepNumber;
    }

    flahed += newFlashed;
    grid = newGrid;
  }
}

export function run(): void {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
