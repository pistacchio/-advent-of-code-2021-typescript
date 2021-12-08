import * as fs from 'fs';
import { groupBy } from 'lodash';
import { sign } from 'crypto';

const INPUT_FILE = '/data/8.txt';

//  aaaa
// b    c
// b    c
//  dddd
// e    f
// e    f
//  gggg

type SignalMap = {
  a: string;
  b: string;
  c: string;
  d: string;
  e: string;
  f: string;
  g: string;
};

const DIGIT_SEGMENTs = [
  'abcefg',
  'cf',
  'acdeg',
  'acdfg',
  'bcdf',
  'abdfg',
  'abdefg',
  'acf',
  'abcdefg',
  'abcdfg',
];
const UNIQUE_DIGIT_SEGMENT_LENGTHS = [2, 3, 4, 7];

const input = fs
  .readFileSync(__dirname + INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .map((r) => r.trim())
  .filter(Boolean)
  .map((l) => {
    const [signals, outputs] = l.split('|');

    return {
      signalPatterns: signals
        .trim()
        .split(' ')
        .map((s) => s.split('')),
      digitOutput: outputs
        .trim()
        .split(' ')
        .map((s) => s.split('')),
    } as Display;
  });

type Display = {
  signalPatterns: string[][];
  digitOutput: string[][];
};

function computePermutations(inputArr: string[]) {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
}

function checkSignal(signalMap: SignalMap, signal: string[]): number {
  const decodedSignal = signal
    .map((s) => signalMap[s])
    .sort()
    .join('');

  return DIGIT_SEGMENTs.findIndex((d) => d === decodedSignal);
}

function part1(input: Display[]): number {
  return input
    .flatMap((i) => i.digitOutput)
    .filter((d) => UNIQUE_DIGIT_SEGMENT_LENGTHS.includes(d.length)).length;
}

function part2(input: Display[]): number {
  const decodedDigits = input.map((i) => {
    const permutations = computePermutations([
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
    ]);

    const permutation = permutations
      .map((p) => ({
        [p[0]]: 'a',
        [p[1]]: 'b',
        [p[2]]: 'c',
        [p[3]]: 'd',
        [p[4]]: 'e',
        [p[5]]: 'f',
        [p[6]]: 'g',
      }))
      .find((p) => {
        return [...i.signalPatterns, ...i.digitOutput].every(
          (s) => checkSignal(p as SignalMap, s) !== -1,
        );
      });

    return Number(
      i.digitOutput
        .map((s) => checkSignal(permutation as SignalMap, s).toString())
        .join(''),
    );
  });

  return decodedDigits.reduce((acc, curr) => acc + curr, 0);
}

export function run(): void {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
