'use strict'

const _ = require('lodash')

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/13

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
    // console.log('preppedInput.length', preppedInput.length)
    console.log(preppedInput)

    console.log('---')
    const solution = solvePuzzle(preppedInput)
    console.log(`OG puzzle answer ⭐️`)
    console.log(solution)

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
  let timestamp = input.earliestDeparture - 1
  let busDeparted
  let minutesToWait

  while (typeof busDeparted === 'undefined') {
    timestamp++
    let possibleDepartures = input.busIds.map((busId) => {
      // console.log('timestamp % busId', timestamp % busId)
      return timestamp % busId === 0
        ? { id: busId, departed: true }
        : { id: busId, departed: false }
    })
    busDeparted = possibleDepartures.find(
      (departure) => departure.departed === true,
    )
    console.table(possibleDepartures)
  }

  console.table(busDeparted)

  minutesToWait = timestamp - input.earliestDeparture

  return minutesToWait * busDeparted.id
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
    return {
      earliestDeparture: parseInt(input[0]),
      busIds: input[1]
        .split(',')
        .map((busId) => parseInt(busId))
        .filter((busId) => !isNaN(busId))
        // Sort lowest to highest
        .sort((a, b) => a - b),
    }
  } catch (e) {
    console.error(e)
    debugger
  }
}
