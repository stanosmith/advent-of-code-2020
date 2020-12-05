'use strict'

// https://adventofcode.com/2020/day/2
// TODO: Move the getInput function into a helpers module
const fs = require('fs').promises
const inputPath = './input.txt'
// const inputPath = './test-input.txt'

getInput()
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

async function getInput() {
  const input = await fs.readFile(inputPath)
  return input.toString()
}

function prepInput(input) {
  // Using the spread operator on a String 🎩
  // return input.map((entry) => [...entry])
  return input
}

function solvePuzzle(input) {
  const over = 3
  const tree = '#'
  const hit = 'X'
  const miss = 'O'
  let totalTreeCollisions = 0
  let encounters = []

  for (let i = 0; i < input.length; i++) {
    // Calculate the next position to check
    const nextOver = over * i
    console.log('nextOver', nextOver)

    // Use the repeater to create a map line with matches the width
    const ogMapLine = input[i]
    // Get the number copies needed to match the nextOver index
    const numCopies = Math.ceil(nextOver / ogMapLine.length)
    // Create extended string
    const mapLineExtended = ogMapLine.repeat(numCopies)

    const hitTree = mapLineExtended[nextOver] === tree
    const hitOrMiss = hitTree ? hit : miss
    encounters.push(hitOrMiss)

    console.log(ogMapLine)
    console.log(mapLineExtended)

    // Find the character at the nextOver index
    if (hitTree) {
      // console.log('mapLineExtended[nextOver]', mapLineExtended[nextOver])
      totalTreeCollisions++
    }

    console.log('---')
  }

  // console.table(encounters)

  const treeCollisions = encounters.filter((encounter) => encounter === hit)
  console.log('treeCollisions.length', treeCollisions.length)

  // INFO: `264` is NOT the answer
  return totalTreeCollisions
}

function solvePartTwo(input) {
  return 0
}
