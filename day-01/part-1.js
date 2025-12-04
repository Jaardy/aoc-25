// @ts-nocheck
const fs = require('fs');
const path = require('path');

// Read the input files
const example = fs.readFileSync(path.join(__dirname, './example.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

// --- Solution ---
function solve(data) {
  return data.trim()
    .split('\n')
    .reduce(
      (acc, line) => {
        let [_, direction, value] = line.match(/([A-Z])(\d+)/);

        value %= 100;
        direction === 'R' ? (acc[0] += Number(value)) : (acc[0] -= Number(value));

        if (acc[0] >= 99) acc[0] -= 100;
        if (acc[0] < 0) acc[0] = 100 + acc[0];
        if (acc[0] == 0) acc[1]++;

        return acc;
      },
      [50, 0],
    );
}
console.log(solve(input));

// --- Tests ---
