import * as fs from 'fs';
import { groupBy } from 'lodash';
import { sign } from 'crypto';

const INPUT_FILE = '/data/9.txt';

const BASIN_RIDGE = 9;

const input = fs
  .readFileSync(__dirname + INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((r) => r.trim())
  .filter(Boolean)
  .map((l) => l.split('').map(Number));

function getNeighbours(
  x: number,
  y: number,
  map: number[][],
): [
  north: number | null,
  east: number | null,
  south: number | null,
  west: number | null,
] {
  return [
    map[y - 1]?.[x] ?? null,
    map[y]?.[x + 1] ?? null,
    map[y + 1]?.[x] ?? null,
    map[y]?.[x - 1] ?? null,
  ];
}

function mapBasin(x: number, y: number, map: number[][]): Set<string> {
  let visited = new Set<string>();

  const visit = (x: number, y: number) => {
    visited.add(`${x},${y}`);

    const [north, east, south, west] = getNeighbours(x, y, map);

    if (
      north !== null &&
      north !== BASIN_RIDGE &&
      !visited.has(`${x},${y - 1}`)
    ) {
      visit(x, y - 1);
    }

    if (
      east !== null &&
      east !== BASIN_RIDGE &&
      !visited.has(`${x + 1},${y}`)
    ) {
      visit(x + 1, y);
    }

    if (
      south !== null &&
      south !== BASIN_RIDGE &&
      !visited.has(`${x},${y + 1}`)
    ) {
      visit(x, y + 1);
    }

    if (
      west !== null &&
      west !== BASIN_RIDGE &&
      !visited.has(`${x - 1},${y}`)
    ) {
      visit(x - 1, y);
    }
  };

  visit(x, y);

  return visited;
}

function part1(input: number[][]): number {
  let lowPoints = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const point = input[y][x];
      const neighbours = getNeighbours(x, y, input);
      const isLowpoint = neighbours.every((p) => p === null || p > point);

      if (isLowpoint) {
        lowPoints += point + 1;
      }
    }
  }

  return lowPoints;
}

function part2(input: number[][]): number {
  let visited = new Set<string>();
  let basins: Set<string>[] = [];

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (visited.has(`${x},${y}`) || input[y][x] === BASIN_RIDGE) {
        continue;
      }

      const newVisitedLocations = mapBasin(x, y, input);

      basins.push(newVisitedLocations);
      visited = new Set([...visited, ...newVisitedLocations]);
    }
  }

  const [biggestBasin1, biggestBasin2, biggestBasin3] = basins.sort(
    (a, b) => b.size - a.size,
  );

  return biggestBasin1.size * biggestBasin2.size * biggestBasin3.size;
}

export function run(): void {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
