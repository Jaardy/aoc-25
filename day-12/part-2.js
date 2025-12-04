// @ts-nocheck
const fs = require('fs');
const path = require('path');

// Read the input files
const example = fs.readFileSync(path.join(__dirname, '../../day-1/example.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, '../../day-1/input.txt'), 'utf8');

// --- Solution ---

function solve(data) {
  let currentPosition = 50;
  let zeroCrossings = 0;

  const rotations = data.trim().split('\n');

  for (const rotation of rotations) {
    const direction = rotation[0];
    const value = parseInt(rotation.slice(1), 10);

    if (direction === 'L') {
      for (let i = 0; i < value; i++) {
        currentPosition--;
        if (currentPosition < 0) {
          currentPosition = 99;
        }
        if (currentPosition === 0) {
          zeroCrossings++;
        }
      }
    } else if (direction === 'R') {
      for (let i = 0; i < value; i++) {
        currentPosition++;
        if (currentPosition > 99) {
          currentPosition = 0;
          zeroCrossings++;
        } else if (currentPosition === 0) {
          zeroCrossings++;
        }
      }
    }
  }
  return zeroCrossings;
}


// --- Tests ---

const exampleResult = solve(example);
console.log(`Example result: ${exampleResult}`);

const inputResult = solve(input);
console.log(`Input result: ${inputResult}`);
