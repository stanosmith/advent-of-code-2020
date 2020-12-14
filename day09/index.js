'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/9

const inputPath = './input.txt'
// const inputPath = './test-input.txt'

getInput(inputPath)
  .then((res) => {
    console.log('---')
    const input = res.split('\n').filter((entry) => entry !== '')
    console.log(`OG input:`)
    console.log('input.length', input.length)
    console.log(input)

    console.log('---')
    const preppedInput = prepInput(input)
    console.log(`Prepped input:`)
    console.log('preppedInput.length', preppedInput.length)
    console.log(preppedInput)
    // console.log(JSON.stringify(preppedInput, null, 2))

    console.log('---')
    const solution = solvePuzzle(preppedInput)
    console.log(`OG puzzle answer ⭐️`)
    console.log(solution)
    // console.log(JSON.stringify(solution, null, 2))

    // console.log('---')
    // const solutionPartTwo = solvePartTwo(preppedInput)
    // console.log(`Part two puzzle answer ⭐️⭐️`)
    // console.log(solutionPartTwo)

    console.log('---')
    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

/*
|
| Solve Puzzle - Part 1
|
*/
function solvePuzzle(input) {
  const preambleLength = 25

  for (let i = 0; i < input.length; i++) {
    const sum = input[i + preambleLength]
    const preamble = input
      .slice(i, i + preambleLength)
      .map((addendA, index, addends) => {
        return addends
          .map((addendB) => {
            if (addendA === addendB) {
              return -1
            }
            return addendA + addendB
          })
          .filter((preambleSum) => preambleSum !== -1)
      })
      .flat()
      .sort()

    // Validate the sum, if it isn't valid, return it as the solution
    if ([...new Set(preamble)].indexOf(sum) === -1) {
      // Answer is `258585477`
      return sum
    }
  }
}

/*
|
| Solve Puzzle - Part 2
|
*/
function solvePartTwo(input) {
  return 0
}

/*
|
| Prep Input
|
*/
function prepInput(input) {
  return input.map((entry) => parseInt(entry)).filter((entry) => !isNaN(entry))
}
