'use strict'

const _ = require('lodash')

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/14

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

getInput(inputPath)
  .then((res) => {
    console.log('---')
    const input = res.slice()
    console.log(`OG input:`)
    console.log('input.length', input.length)
    // console.log(input)

    console.log('---')
    const preppedInput = prepInput(input)
    console.log(`Prepped input:`)
    console.log('preppedInput.length', preppedInput.length)
    // console.log(JSON.stringify(preppedInput, null, 2))
    console.log(preppedInput)

    // console.log('---')
    // const solution = solvePuzzle(preppedInput)
    // console.log(`OG puzzle answer ⭐️`)
    // console.log(solution)

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
  // Test input solution: 165
  return 0
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
  try {
    return input
      .split('mask = ')
      .filter((entry) => entry !== '')
      .map((maskEntry) => {
        return maskEntry
          .split('\n')
          .filter((entry) => entry !== '')
          .map((entry) => {
            const memoryString = 'mem['

            // Memory
            if (entry.indexOf(memoryString) !== -1) {
              const memoryChanges = entry
                .split(memoryString)
                .join('')
                .split('] = ')

              return {
                index: parseInt(memoryChanges[0]),
                value: parseInt(memoryChanges[1]),
              }
            }

            // Mask
            return {
              mask: entry,
            }
          })
          .reduce((program, entry) => {
            const { mask } = entry
            const memoryOverrides = entry.index
              ? [...program.memoryOverrides, entry]
              : []
            return {
              mask,
              ...program,
              memoryOverrides,
            }
          }, {})
      })
  } catch (e) {
    console.error(e)
    debugger
  }
}
