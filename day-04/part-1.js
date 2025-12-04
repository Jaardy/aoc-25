// @ts-nocheck
const fs = require('fs');
const path = require('path');

// Read the input files
const example = fs.readFileSync(path.join(__dirname, './example.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

// --- Solution ---
function solve(data) {
  return data.trim().split('\n').reduce((shelfTotal, row, i, shelfMap) => {
    let rowCount = row.split("").reduce((rowTotal, slot, j) => {
      if (slot === ".") return rowTotal
      let adjacentCount = 0 + (shelfMap?.[i - 1]?.[j - 1] === "@")
      adjacentCount += (shelfMap?.[i - 1]?.[j] === "@")
      adjacentCount += (shelfMap?.[i - 1]?.[j + 1] === "@")
      adjacentCount += (shelfMap?.[i]?.[j - 1] === "@")
      adjacentCount += (shelfMap?.[i]?.[j + 1] === "@")
      adjacentCount += (shelfMap?.[i + 1]?.[j - 1] === "@")
      adjacentCount += (shelfMap?.[i + 1]?.[j] === "@")
      adjacentCount += (shelfMap?.[i + 1]?.[j + 1] === "@")



      let canBeLifted = (adjacentCount < 4) ? 1 : 0

      return (rowTotal + canBeLifted)

    }, 0)
    return shelfTotal + rowCount
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

  // Full example test - 13 rolls can be accessed (fewer than 4 adjacent rolls)
  test(solve(example), 13, 'Full example -> 13 accessible rolls');

  // Edge cases - single roll (0 neighbors, accessible)
  test(solve('@'), 1, 'Single roll -> 1 (no neighbors)');
  test(solve('.'), 0, 'Single empty -> 0');

  // 3x3 grid tests
  test(solve('...\n.@.\n...'), 1, 'Single roll in center -> 1 (0 neighbors)');
  test(solve('@@@\n@@@\n@@@'), 4, 'Full 3x3 grid -> 4 (only corners have <4 neighbors)');

  // Multiple rolls - count ALL accessible rolls, not just one
  test(solve('@..\n...\n...'), 1, 'Corner roll -> 1 (0 neighbors)');
  test(solve('@@.\n@..\n...'), 3, '3 rolls in L-shape -> 3 (all have <4 neighbors)');
  test(solve('@@.\n@@.\n...'), 4, '2x2 block -> 4 (all have 3 neighbors)');
  test(solve('@@@\n@@@\n@..'), 4, '7 rolls -> 4 accessible (top-mid, mid-left, mid-mid have 4+ neighbors)');

  // Edge roll - has only 5 possible neighbors
  test(solve('.@.\n...\n...'), 1, 'Edge roll -> 1 (0 neighbors)');
  test(solve('@@@\n...\n...'), 3, 'Three rolls in row -> 3 (edges have 1 neighbor, middle has 2)');

  // Threshold test - exactly 3 neighbors (should be accessible)
  test(solve('.@.\n@@.\n.@.'), 4, 'Diamond pattern -> 4 (center has 0, others have 1-2)');

  // Test counting only @ symbols, not empty spaces
  test(solve('...\n...\n...'), 0, 'All empty -> 0');

  console.log('\nTests complete!');
}

// Uncomment to run tests once you have a solve function:
runTests(solve);