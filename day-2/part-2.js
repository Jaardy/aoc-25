// @ts-nocheck
const fs = require('fs');
const path = require('path');

// Read the input files
const example = fs.readFileSync(path.join(__dirname, './example.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

// --- Solution ---



let sum = 0;

for (const range of input.split(',')) {
    const [start, end] = range.split('-').map(Number);
    for (let id = start; id <= end; id++) {
        if (String(id).match(/^(\d+)\1+$/)) {
            sum += id;
        }
    }
}

console.log(sum);