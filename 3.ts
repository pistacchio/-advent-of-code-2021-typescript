import * as fs from 'fs';

const INPUT_FILE = '/data/3.txt';

const input = fs
  .readFileSync(__dirname + INPUT_FILE)
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean)
  .map((line) => line.split('').map(Number));

function part1(input: number[][]): number {
  const inputLength = input.length;
  const reportSize = input[0].length;

  const stripSums = Array.from({ length: reportSize }, (_, idx) =>
    input.map((row) => row[idx]).reduce((a, i) => a + i, 0),
  )
    .map((sum) => (sum > inputLength / 2 ? '1' : '0'))
    .join('');
  const stripSumsInverted = stripSums
    .split('')
    .map((i) => (i === '1' ? '0' : '1'))
    .join('');

  const stripSumsInt = parseInt(stripSums, 2);
  const stripSumsInvertedInt = parseInt(stripSumsInverted, 2);

  return stripSumsInt * stripSumsInvertedInt;
}

function part2(input: number[][]): number {
  const reportSize = input[0].length;

  const filterArray = (
    array: number[][],
    idx: number,
    invert: boolean = false,
  ) => {
    const [okNum, koNum] = invert ? [0, 1] : [1, 0];

    if (array.length === 1) return array;

    const ones = array.map((row) => row[idx]).filter((i) => i === 1).length;
    const checkLength = array.length / 2;

    const filteredRows = array.filter((i) =>
      ones >= checkLength ? i[idx] === okNum : i[idx] === koNum,
    );

    return filteredRows;
  };

  const oxigenGeneratorRating = (
    Array.from({ length: reportSize }).reduce(
      (acc: number[][], _, idx) => filterArray(acc, idx),
      [...input],
    ) as number[][]
  )[0].join('');

  const co2ScrubberRating = (
    Array.from({ length: reportSize }).reduce(
      (acc: number[][], _, idx) => filterArray(acc, idx, true),
      [...input],
    ) as number[][]
  )[0].join('');

  const oxigenGeneratorRatingInt = parseInt(oxigenGeneratorRating, 2);
  const co2ScrubberRatingInt = parseInt(co2ScrubberRating, 2);

  return oxigenGeneratorRatingInt * co2ScrubberRatingInt;
}

export function run(): void {
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
