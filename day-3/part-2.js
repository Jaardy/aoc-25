// @ts-nocheck
const fs = require('fs');
const path = require('path');

// Read the input files
const example = fs.readFileSync(path.join(__dirname, './example.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

// --- Solution ---
function solve(data) {
  return data.trim().split('\n').reduce((result, bank) => {
    let removed = 0
    let i = 0

    const toRemove = bank.length - 12
    while (i < bank.length && removed < toRemove) {

      if (bank[i] < bank[i + 1]) {
        bank = bank.substring(0, i) + bank.substring(i + 1)
        removed++
        i = Math.max(i - 1, 0)
      } else {
        i++
      }

    }


    return result + BigInt(bank.slice(0, 12))
  }, 0n)
}
console.log(solve(input))


// --- Tests ---
function test(actual, expected, description) {
  const passed = actual === expected;
  console.log(`${passed ? '✓' : '✗'} ${description}`);
  if (!passed) {
    console.log(`  Expected: ${expected}, Got: ${actual}`);
  }
  return passed;
}

function runTests(solve) {
  console.log('Running tests...\n');

  // Individual bank tests from examples (keep exactly 12 batteries)
  test(solve('987654321111111'), 987654321111n, 'Bank "987654321111111" -> 987654321111');
  test(solve('811111111111119'), 811111111119n, 'Bank "811111111111119" -> 811111111119');
  test(solve('234234234234278'), 434234234278n, 'Bank "234234234234278" -> 434234234278');
  test(solve('818181911112111'), 888911112111n, 'Bank "818181911112111" -> 888911112111');

  // Full example test
  test(solve(example), 3121910778619n, 'Full example -> 3121910778619');

  console.log('\nTests complete!');
}

// Uncomment to run tests once you have a solve function:
runTests(solve);