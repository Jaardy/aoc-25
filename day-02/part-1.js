// @ts-nocheck
const fs = require('fs');
const path = require('path');

// Read the input files
const example = fs.readFileSync(path.join(__dirname, './example.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');


// --- Solution ---
const answer = input.trim().split(",").reduce((acc, range) => {
    let [lowerBound, upperBound] = range.split("-").map(n => Number.parseInt(n))
    let startingNumber = getStartingNumber(lowerBound)

    let firstHalf = startingNumber.toString().substring(0, startingNumber.toString().length / 2)

    if (Number.parseInt(`${firstHalf}${firstHalf}`) < lowerBound) {
        firstHalf++
    }

    while (Number.parseInt(`${firstHalf}${firstHalf}`) <= Number.parseInt(upperBound)) {
        acc += Number.parseInt(`${firstHalf}${firstHalf}`)
        firstHalf++
    }

    return acc
}, 0)

console.log(answer)

function getStartingNumber(lowerBound) {
    return (`${lowerBound}`.length % 2 === 0) ? lowerBound : (10 ** (`${lowerBound}`.length))
}

// --- Tests ---