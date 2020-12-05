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
  return input.map((entry) => [...entry])
}

function solvePuzzle(input) {
  const over = 3
  const tree = '#'
  let totalTreeCollisions = 0

  for (let i = 0; i < input.length; i++) {
    // Calculate the next position to check
    const nextOver = over * i
    console.log('nextOver', nextOver)

    // Use the repeater to create a map line with matches the width
    const ogMapLine = input[i]
    // TODO: Get the number repetitions we need to do in order to match the length
    const numCopies = Math.ceil(nextOver / ogMapLine.length)
    // console.log('numCopies', numCopies)
    const ogMapLineExtended = extendMapLine(ogMapLine, numCopies)
    console.log(ogMapLineExtended)

    // Find the character at the nextOver index
    if (ogMapLineExtended[nextOver] === tree) {
      totalTreeCollisions++
    }
  }
  return totalTreeCollisions
}

function extendMapLine(mapLine, numCopies, currentCopy = 0, newMapLine = []) {
  console.table({ numCopies, currentCopy })

  if (currentCopy !== numCopies) {
    newMapLine = [...newMapLine, ...mapLine]
    currentCopy++
    return extendMapLine(mapLine, numCopies, currentCopy, newMapLine)
  }

  return newMapLine
}

function solvePartTwo(input) {
  return 0
}
