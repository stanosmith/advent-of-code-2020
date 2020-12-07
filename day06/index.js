'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/5

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

getInput(inputPath)
  .then((res) => {
    const input = res.split('\n').filter((entry) => entry !== '')
    console.log(`---\nOG input:`)
    console.log('input.length', input.length)
    // console.log(input)
    console.log('---')

    const preppedInput = prepInput(input)
    console.log(`Prepped input:`)
    console.log(preppedInput)
    console.log('---')

    // const solution = solvePuzzle(preppedInput)
    // console.log('---')
    // console.log(`OG puzzle answer ⭐️`)
    // console.log(solution)
    // console.log('---')
    //
    // const solutionPartTwo = solvePartTwo(preppedInput)
    // console.log('---')
    // console.log(`Part two puzzle answer ⭐️`)
    // console.log(solutionPartTwo)
    // console.log('---')

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

function prepInput(input) {
  return input
}

function solvePuzzle(input) {
  return 0
}

function solvePartTwo(input) {
  return 0
}
