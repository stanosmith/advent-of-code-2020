'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/2

const inputPath = './input.txt'
// const inputPath = './test-input.txt'

getInput(inputPath)
  .then((res) => {
    const input = res.split('\n').filter((entry) => entry !== '')
    console.log(`---\nOG input:`)
    console.log('input.length', input.length)
    // console.log(input)
    console.log('---')

    const preppedInput = prepInput(input)
    // console.log(`Prepped input:`)
    // console.log(preppedInput)
    // console.log('---')

    const solution = solvePuzzle(preppedInput)
    console.log('---')
    console.log(`OG puzzle answer ⭐️`)
    console.log(solution)
    console.log('---')

    // const solutionPartTwo = solvePartTwo(preppedInput)
    // console.log(`Part two puzzle answer ⭐️`)
    // console.log(solutionPartTwo)
    // console.log('---')

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

function prepInput(input) {
  // Using the spread operator on a String 🎩
  // return input.map((entry) => [...entry])
  return input
}

function solvePuzzle(input) {
  const lineLength = input[0].length
  const over = 3
  const tree = '#'
  let totalTreeCollisions = 0

  for (let i = 0; i < input.length; i++) {
    const ogMapLine = input[i]

    // Calculate the next position to check
    const nextOver = (over * i) % lineLength
    const hit = ogMapLine[nextOver] === tree
    console.log({
      nextOver,
      // character: ogMapLine[nextOver],
      hitOrMiss: hit ? 'X' : 'O',
    })

    if (hit) {
      totalTreeCollisions++
    }
  }

  // INFO: `264` is NOT the answer
  return totalTreeCollisions
}

function solvePartTwo(input) {
  return 0
}
