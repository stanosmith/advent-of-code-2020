'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/7

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

getInput(inputPath)
  .then((res) => {
    const input = res.split('\n\n')
    console.log(`---\nOG input:`)
    console.log('input.length', input.length)
    // console.log(input)

    const preppedInput = prepInput(input)
    console.log(`---\nPrepped input:`)
    console.log(preppedInput.length)
    console.log(preppedInput)

    // const solution = solvePuzzle(preppedInput)
    // console.log('---')
    // console.log(`OG puzzle answer ⭐️`)
    // console.log(solution)
    // console.log('---')

    // const solutionPartTwo = solvePartTwo(preppedInput)
    // console.log('---')
    // console.log(`Part two puzzle answer ⭐️`)
    // console.log(solutionPartTwo)
    // console.log('---')

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

function prepInput(input) {
  return input.map((entry) => entry.split('\n'))
}

function solvePuzzle(input) {
  return 0
}

function solvePartTwo(input) {
  return 0
}
