// @ts-nocheck
const fs = require('fs');
const path = require('path');

// Read the input files
const example = fs.readFileSync(path.join(__dirname, './example.txt'), 'utf8');
const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');

// --- Solution ---
function solve(data) {
    let map = data.trim().split('\n').map(x => x.split(""))
    let totalRollsRemoved = 0
    let noneToRemove
    let rollsRemoved
    do {
        rollsRemoved = map.reduce((shelfTotal, row, i, shelfMap) => {
            let rowCount = row.reduce((rowTotal, slot, j) => {
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
                if (canBeLifted) map[i][j] = "."

                return (rowTotal + canBeLifted)

            }, 0)
            return shelfTotal + rowCount
        }, 0)
        totalRollsRemoved += rollsRemoved
        noneToRemove = (rollsRemoved === 0) ? true : false

    } while (noneToRemove === false)
    return totalRollsRemoved

}
console.log(solve(input))