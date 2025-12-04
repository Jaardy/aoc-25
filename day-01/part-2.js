// @ts-nocheck
const fs = require('fs');
const path = require('path');

// Read the input files
const example = fs.readFileSync(path.join(__dirname, './example.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

// --- Solution ---
function solve(data) {

  return data
    .trim()
    .split('\n')
    .reduce(
      (acc, line) => {
        let [_, direction, value] = line.match(/([A-Z])(\d+)/);
        value = Number(value);

        let distToZero;
        if (direction === 'R') {
          distToZero = (100 - acc[0]) % 100;
        } else {
          distToZero = acc[0];
        }

        // Count zero crossings
        if (distToZero === 0) {
          // Already at 0, next zero is 100 clicks away
          acc[1] += Math.floor(value / 100);
        } else if (value >= distToZero) {
          // Hit zero at least once, then every 100 clicks after
          acc[1] += 1 + Math.floor((value - distToZero) / 100);
        }

        // Update position
        if (direction === 'R') {
          acc[0] = (acc[0] + value) % 100;
        } else {
          acc[0] = ((acc[0] - value) % 100 + 100) % 100;
        }

        return acc;
      },
      [50, 0],
    );

}
console.log(solve(input));


