'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/3

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

    const solutionPartTwo = solvePartTwo(preppedInput)
    console.log(`Part two puzzle answer ⭐️`)
    console.log(solutionPartTwo)
    console.log('---')

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

function prepInput(input) {
  // Using the spread operator on a String 🎩
  // return input.map((entry) => [...entry])
  return input
}

function solvePuzzle(input) {
  return getTreeCollisionsForSlope(input, { right: 3, down: 1 })
}

function getTreeCollisionsForSlope(input, { right, down, log }) {
  const lineLength = input[0].length
  let totalTreeCollisions = 0
  const tree = '#'

  for (let i = 0; i < input.length; i++) {
    // Skip rows based on the down number
    if (i % down > 0) {
      continue
    }

    const ogMapLine = input[i]

    // Calculate the next position to check
    let nextOver = Math.floor(((right / down) * i) % lineLength)

    // Calculate the offset of the next right based on the down
    const nextOverOffset = i % down

    // if (down > 1) {
    //   nextOver = Math.abs(nextOver - nextOverOffset)
    // }

    // Set hit or miss values
    const hit = ogMapLine[nextOver] === tree
    const hitOrMiss = hit ? 'X' : 'O'
    const xoMapLine = `${ogMapLine.slice(
      0,
      nextOver,
    )}${hitOrMiss}${ogMapLine.slice(nextOver + 1)}`

    if (log) {
      console.log({
        i,
        nextOver,
        nextOverOffset,
        ogMapLine,
        xoMapLine,
        // character: ogMapLine[nextOver],
        // hitOrMiss: hit ? 'X' : 'O',
      })
    }

    if (hit) {
      totalTreeCollisions++
    }
  }

  return totalTreeCollisions
}

function solvePartTwo(input) {
  const slopes = [
    { right: 1, down: 1, log: false },
    { right: 3, down: 1, log: false },
    { right: 5, down: 1, log: false },
    { right: 7, down: 1, log: false },
    { right: 1, down: 2, log: false },
  ]

  // Too HIGH: 9468333600

  return slopes
    .map(getTreeCollisionsForSlope.bind(null, input))
    .map((totalTreeHits) => {
      console.log(totalTreeHits)
      return totalTreeHits
    })
    .reduce(
      (productOfAllSlopes, totalTreeHits) => totalTreeHits * productOfAllSlopes,
      1,
    )
}
