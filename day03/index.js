'use strict'

// https://adventofcode.com/2020/day/2
const fs = require('fs').promises
// const inputPath = './input.txt'
const inputPath = './test-input.txt'

getInput()
  .then((res) => {
    const input = res.split('\n').filter((entry) => entry !== '')
    console.log(`---\nOG input:`)
    console.log(input)
    console.log('---')

    const preppedInput = prepInput(input)
    console.log(`Prepped input:`)
    console.log(preppedInput)
    console.log('---')

    // const solution = solvePuzzle(preppedInput)
    // console.log(`OG puzzle answer ⭐️`)
    // console.log(solution)
    // console.log('---')

    // const solutionPartTwo = solvePartTwo(preppedInput)
    // console.log(`Part two puzzle answer ⭐️`)
    // console.log(solutionPartTwo)
    // console.log('---')

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

async function getInput() {
  const input = await fs.readFile(inputPath)
  return input.toString()
}

function prepInput(input) {
  return input
}

function solvePuzzle(input) {
  return 0
}

function solvePartTwo(input) {
  return 0
}
