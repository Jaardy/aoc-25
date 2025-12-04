// @ts-nocheck
const fs = require('fs');
const path = require('path');

// Read the input files
const example = fs.readFileSync(path.join(__dirname, './example.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

// --- Solution ---
function solve(data) {
  return data.trim().split('\n').reduce((result, bank) => {
    let highest = 0
    for (let i = 0; i < bank.length - 1; i++) {
      right = 0
      for (let j = i + 1; j < bank.length; j++) {
        let newNumber = Number.parseInt(`${bank[i]}${bank[j]}`)
        if (newNumber > highest) highest = newNumber
      }
    }
    return highest + result



  }, 0)
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

  // Individual bank tests from examples
  test(solve('987654321111111'), 98, 'Bank "987654321111111" -> 98 (first two batteries)');
  test(solve('811111111111119'), 89, 'Bank "811111111111119" -> 89 (8 and 9 batteries)');
  test(solve('234234234234278'), 78, 'Bank "234234234234278" -> 78 (last two batteries)');
  test(solve('818181911112111'), 92, 'Bank "818181911112111" -> 92 (9 and 2 batteries)');

  // Full example test
  test(solve(example), 357, 'Full example -> 357 (sum of 98 + 89 + 78 + 92)');

  // Edge cases
  test(solve('12'), 12, 'Minimal bank "12" -> 12');
  test(solve('21'), 21, 'Minimal bank "21" -> 21');
  test(solve('99'), 99, 'Same digits "99" -> 99');
  test(solve('12345'), 45, 'Bank "12345" -> 45');
  test(solve('91111'), 91, 'Largest digit first "91111" -> 91');

  console.log('\nTests complete!');
}

// Uncomment to run tests once you have a solve function:
// runTests(solve);