'use strict'

const _ = require('lodash')

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/12

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

const ACTION_MAPPING = {
  N: 'NORTH',
  S: 'SOUTH',
  E: 'EAST',
  W: 'WEST',
  L: 'LEFT',
  R: 'RIGHT',
  F: 'FORWARD',
}

getInput(inputPath)
  .then((res) => {
    console.log('---')
    const input = res.split('\n').filter((entry) => entry !== '')
    console.log(`OG input:`)
    console.log('input.length', input.length)
    console.table(input)

    console.log('---')
    const preppedInput = prepInput(input)
    console.log(`Prepped input:`)
    console.log('preppedInput.length', preppedInput.length)
    console.table(preppedInput)

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
| Action N means to move north by the given value.
| Action S means to move south by the given value.
| Action E means to move east by the given value.
| Action W means to move west by the given value.
| Action L means to turn left the given number of degrees.
| Action R means to turn right the given number of degrees.
| Action F means to move forward by the given value in the direction the ship is currently facing.
|
*/
function solvePuzzle(input) {
  // INFO: What is the Manhattan distance between that location and the ship's starting position?
  // Manhattan distance = sum of the absolute values of its east/west position and its north/south position
  // e.g. The test input should be 17 + 8 = 25
  const eastWest = 0
  const northSouth = 0
  return eastWest + northSouth
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
    return input.map((entry) => ({
      action: ACTION_MAPPING[entry.slice(0, 1).toUpperCase()],
      value: parseInt(entry.slice(1)),
    }))
  } catch (e) {
    console.error(e)
    debugger
  }
}
