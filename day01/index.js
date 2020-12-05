'use strict'

// https://adventofcode.com/2020/day/1
const fs = require('fs').promises
const inputPath = './input.txt'
// const inputPath = './test-input.txt'

getInput()
  .then((res) => {
    const input = res.split('\n').filter((item) => item !== '')

    solvePuzzle(input)

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

async function getInput() {
  const input = await fs.readFile(inputPath)
  return input.toString()
}

function solvePuzzle(input) {
  console.log(input)
  const sumCombos = input
    .map((entry) => parseInt(entry))
    .map((a, indexA, entriesA) => {
      return entriesA.map((b, indexB) => {
        if (indexA > indexB) {
          return {
            a,
            b,
            sum: a + b,
          }
        }
      })
    })
    .flat()
    .filter((sum) => typeof sum !== 'undefined')
  // .filter((sum) => sum === 2020)
  console.log(sumCombos, sumCombos.length)

  const solution = sumCombos
    .filter((combo) => combo.sum === 2020)
    .reduce((accumulator, combo) => combo.a * combo.b, undefined)
  console.log(solution)
}
