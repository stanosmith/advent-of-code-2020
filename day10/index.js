'use strict'

const _ = require('lodash')

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/10

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
    // const solutionPartTwo = solvePartTwo(preppedInput, solution)
    // console.log(`Part two puzzle answer ⭐️⭐️`)
    // console.log(solutionPartTwo)

    console.log('---')
    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

/*
|
| Solve Puzzle - Part 1
| Find a chain that uses all of your adapters to connect the charging outlet to your
| device's built-in adapter and count the joltage differences between the charging
| outlet, the adapters, and your device.
|
| Test input answer:
| 22 differences of 1-jolt and 10 differences of 3-jolt (22 * 10 = `220`)
|
*/
function solvePuzzle(input) {
  // What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?
  const { jolt1, jolt3 } = input
    .map((adapterRating, index, adapterRatings) => {
      const prevRating = index === 0 ? index : adapterRatings[index - 1]
      const diff = adapterRating - prevRating
      // debugger
      return { adapterRating, diff }
    })
    .reduce(
      (joltages, jolt) => {
        let { jolt1, jolt3 } = joltages
        jolt.diff === 1 ? jolt1++ : jolt3++
        return {
          jolt1,
          jolt3,
        }
      },
      {
        jolt1: 0,
        jolt3: 1, // Start with a +1 to include 3 jolts above the last adapter
      },
    )

  return jolt1 * jolt3
}

/*
|
| Solve Puzzle - Part 2
|
| Find a contiguous set of at least two numbers in your list
| which sum to the invalid number from step 1
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
  return input
    .map((entry) => parseInt(entry))
    .filter((entry) => !isNaN(entry))
    .sort((a, b) => a - b)
}
