import * as fs from 'fs';
import { groupBy } from 'lodash';
import { sign } from 'crypto';

const INPUT_FILE = '/data/12.txt';

const FROM = 0;
const TO = 1;

type CaveSystem = string[][];
type CaveSystemFilter = (path: string[]) => boolean;

const input = fs
  .readFileSync(__dirname + INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((r) => r.trim())
  .filter(Boolean)
  .map((l) => l.split('-'))
  .reduce<CaveSystem>((acc, [from, to]) => [...acc, [from, to], [to, from]], [])
  .filter(([from, to]) => to !== 'start' && from !== 'end');

function isSmallCave(cave: string): boolean {
  // A cave is small if it's id is a lowercase letter
  return !!cave.match(/[a-z]/);
}

function exploreCaves(
  caveSystem: CaveSystem,
  caveSystemFilter: CaveSystemFilter,
): CaveSystem {
  let paths: CaveSystem = [['start']];

  // Repeat till all the possible paths are explored: all of them end with the
  // 'end' room
  do {
    // Ignore the paths that end with the 'end' room
    for (const path of paths.filter((p) => p[p.length - 1] !== 'end')) {
      const possibleTurns = caveSystem
        .filter((r) => r[FROM] === path[path.length - 1])
        .map((r) => r[TO]);

      // Keep track of the first / other possible turns. The first one modifies
      // the current path. If there are others, add new paths branching from the
      // current path
      let firstDone = false;
      const currentPath = [...path];
      for (const turn of possibleTurns) {
        if (!firstDone) {
          path.push(turn);
          firstDone = true;
          continue;
        }

        const newPath = [...currentPath, turn];
        paths.push(newPath);
      }

      // Filter out cases according to the given rules
      paths = paths.filter(caveSystemFilter);
    }
  } while (paths.some((p) => p[p.length - 1] !== 'end'));

  return paths;
}

function part1(input: CaveSystem): number {
  // Smaller caves can only be explored once
  const caveSystemFilter = (path: string[]) =>
    !Object.entries(groupBy(path)).some(
      ([caveId, caves]) => isSmallCave(caveId) && caves.length > 1,
    );

  return exploreCaves(input, caveSystemFilter).length;
}

function part2(input: CaveSystem): number {
  // Only one small cave can be explored twice, all the others can be explored
  // once
  const caveSystemFilter = (path: string[]) => {
    const smallCaveExploredTimes = Object.entries(groupBy(path))
      .filter(([caveId]) => isSmallCave(caveId))
      .map(([, caves]) => caves.length);

    // No cave can be explored than twice
    if (smallCaveExploredTimes.some((c) => c > 2)) {
      return false;
    }

    // More than one small cave is explored twice
    if (smallCaveExploredTimes.filter((c) => c === 2).length > 1) {
      return false;
    }

    return true;
  };

  return exploreCaves(input, caveSystemFilter).length;
}

export function run(): void {
  // console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
