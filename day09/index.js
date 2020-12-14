'use strict'

const _ = require('lodash')

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

    console.log('---')
    const solutionPartTwo = solvePartTwo(preppedInput, solution)
    console.log(`Part two puzzle answer ⭐️⭐️`)
    console.log(solutionPartTwo)

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
  const preambleLength = inputPath.includes('test') ? 5 : 25

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
| Find a contiguous set of at least two numbers in your list
| which sum to the invalid number from step 1
|
*/
function solvePartTwo(input, invalidNumber) {
  // Add contiguous numbers till it matches the invalid number,
  // or is more than it, then start over at the next index

  for (let i = 0; i < input.length; i++) {
    const { contiguousRange, sum } = getAddendsAndSum(input, i, invalidNumber)

    if (sum === invalidNumber) {
      // INFO: Find the encryption weakness
      //  add together the smallest and largest number in this contiguous
      //  range; for the test input, these are `15` and `47`, producing `62`.

      // INFO: `21046031` is NOT the right answer. It's too LOW
      return contiguousRange
        .sort((a, b) => a - b)
        .filter((addend, index, addends) => {
          return index === 0 || index === addends.length - 1
        })
        .reduce((encryptionWeakness, addend) => {
          return addend + encryptionWeakness
        }, 0)
    }
  }
}

function getAddendsAndSum(input, startIndex, invalidNumber) {
  for (let i = 0; i < input.length; i++) {
    const endIndex = startIndex + i + 2
    const contiguousRange = input.slice(startIndex, endIndex)
    const sum = _.sum(contiguousRange)

    if (endIndex === input.length) {
      return {
        contiguousRange,
        sum,
      }
    }

    if (sum >= invalidNumber) {
      return { contiguousRange, sum }
    }
  }
}

/*
|
| Prep Input
|
*/
function prepInput(input) {
  return input.map((entry) => parseInt(entry)).filter((entry) => !isNaN(entry))
}
