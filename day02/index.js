'use strict'

// https://adventofcode.com/2020/day/2
const fs = require('fs').promises
// const inputPath = './input.txt'
const inputPath = './test-input.txt'

getInput()
  .then((res) => {
    const input = res
      .split('\n')
      .filter((entry) => entry !== '')
      .map((entry) => {
        return entry
          .split(' ')
          .map((part) => {
            if (part.includes('-')) {
              return part
                .split('-')
                .map((iterationIndicator) => parseInt(iterationIndicator))
            }
            return part
          })
          .flat()
          .map((part) => {
            if (typeof part === 'string') {
              return part.replace(':', '')
            }
            return part
          })
      })
    console.log(input)

    const solution = solvePuzzle(input)
    console.log(`OG puzzle answer: ${solution} 🎅`)

    // const solutionPartTwo = solvePartTwo(input)
    // console.log(`Part two puzzle answer: ${solutionPartTwo} 💯`)

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

async function getInput() {
  const input = await fs.readFile(inputPath)
  return input.toString()
}

function solvePuzzle(input) {
  // Solution
  return 0
}

function solvePartTwo(input) {
  return 0
}
