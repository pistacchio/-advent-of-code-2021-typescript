import * as fs from 'fs';
import { groupBy } from 'lodash';

const INPUT_FILE = '/data/5.txt';

type VentDirection = [
  start: [x: number, y: number],
  end: [x: number, y: number],
];

const input: VentDirection[] = fs
  .readFileSync(__dirname + INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((r) => r.trim())
  .filter(Boolean)
  .map((r) => {
    const [start, end] = r.split('->');
    const [x, y] = start.split(',').map((n) => parseInt(n.trim(), 10));
    const [x2, y2] = end.split(',').map((n) => parseInt(n.trim(), 10));

    return [
      [x, y],
      [x2, y2],
    ];
  });

// Display utility
function displayVentMap(ventMap: [number, number][]) {
  const maxX = Math.max(...ventMap.map(([x]) => x));
  const maxY = Math.max(...ventMap.map(([, y]) => y));

  for (let y = 0; y <= maxY; y++) {
    let row = '';
    for (let x = 0; x <= maxX; x++) {
      const found = ventMap.filter(([x2, y2]) => x2 === x && y2 === y).length;

      if (found === 0) {
        row += '.';
      } else {
        row += found;
      }
    }
    console.log(row);
  }
}

function getVentMap(
  input: VentDirection[],
  allowDiagonal: boolean = false,
): [number, number][] {
  const ventMap: [number, number][] = [];

  for (const [[x, y], [x2, y2]] of input) {
    const minX = Math.min(x, x2);
    const maxX = Math.max(x, x2);
    const minY = Math.min(y, y2);
    const maxY = Math.max(y, y2);

    if (x === x2) {
      // Vertical
      for (let i = minY; i <= maxY; i++) {
        ventMap.push([x, i]);
      }
    } else if (y === y2) {
      // Horizontal
      for (let i = minX; i <= maxX; i++) {
        ventMap.push([i, y]);
      }
    } else if (x < x2) {
      // Diagonal
      if (!allowDiagonal) {
        continue;
      }

      let yStep = y < y2 ? 1 : -1;
      let currentY = y;

      for (let i = x; i <= x2; i++) {
        ventMap.push([i, currentY]);
        currentY += yStep;
      }
    } else {
      // Diagonal
      if (!allowDiagonal) {
        continue;
      }

      let yStep = y2 < y ? 1 : -1;
      let currentY = y2;

      for (let i = x2; i <= x; i++) {
        ventMap.push([i, currentY]);
        currentY += yStep;
      }
    }
  }

  return ventMap;
}

function computeOverlappingVents(ventMap: [number, number][]): number {
  const groupedCells = groupBy(ventMap);
  const cellsWithMoreThanOnePass = Object.keys(groupedCells).filter(
    (k) => groupedCells[k].length > 1,
  ).length;

  return cellsWithMoreThanOnePass;
}

function part1(input: VentDirection[]): number {
  const ventMap = getVentMap(input);

  return computeOverlappingVents(ventMap);
}

function part2(input: VentDirection[]): number {
  const ventMap = getVentMap(input, true);

  return computeOverlappingVents(ventMap);
}

export function run(): void {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
