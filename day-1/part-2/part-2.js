// @ts-nocheck
const { dir } = require('console');
const fs = require('fs');
const path = require('path');

// Read the input files
const example = fs.readFileSync(path.join(__dirname, '../example.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, '../input.txt'), 'utf8');

// --- Solution ---
const splitList2 = input
  .trim()
  .split('\n')
  .reduce(
    (acc, line) => {
      let [_, direction, value] = line.match(/([A-Z])(\d+)/);
      //   console.log('start: ', acc);

      acc[1] += Math.floor(value / 100);
      acc[0] %= 100;
      //   console.log('after Modulus:', acc);

      direction === 'R' ? (acc[0] += Number(value)) : (acc[0] -= Number(value));

      if (acc[0] >= 100) {
        acc[0] -= 100;
        acc[1]++;
      }
      if (acc[0] < 0) {
        acc[0] = 100 + acc[0];
        acc[1]++;
      }
      //   if (acc[0] == 0) acc[1]--;
      //   console.log(acc);
      //   console.log('================');
      return acc;
    },
    [50, 0],
  );

console.log(splitList2);

let test = 100;
test %= 100;
console.log(test);
