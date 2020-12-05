'use strict'

// https://adventofcode.com/2020/day/2
const fs = require('fs').promises
const inputPath = './input.txt'
// const inputPath = './test-input.txt'

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

    const solutionPartTwo = solvePartTwo(preppedInput)
    console.log(`Part two puzzle answer ⭐️`)
    console.log(solutionPartTwo)
    console.log('---')

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

async function getInput() {
  const input = await fs.readFile(inputPath)
  return input.toString()
}

function prepInput(input) {
  const policyModel = {
    0: 'min',
    1: 'max',
    2: 'character',
    3: 'password',
  }
  return input.map((entry) => {
    return (
      entry
        // Separate all of the different parts
        .split(' ')
        // Convert parse string numbers as integers
        .map((part) => {
          if (part.includes('-')) {
            return part
              .split('-')
              .map((iterationIndicator) => parseInt(iterationIndicator))
          }
          return part
        })
        .flat()
        // Remove colon from character value
        .map((part) => {
          if (typeof part === 'string') {
            return part.replace(':', '')
          }
          return part
        })
        // Convert to array object objects to help make the code easier to reason about
        .reduce((accumulator, part, index) => {
          let partNormalized =
            typeof part === 'string' ? part.toLowerCase() : part
          accumulator = {
            ...accumulator,
            [policyModel[index]]: partNormalized,
          }
          return accumulator
        }, {})
    )
  })
}

function solvePuzzle(input) {
  // Loop through all passwords and their policy and validate each one
  return input
    .map((entry) => {
      const characterCount = entry.password.split(entry.character).length - 1
      return {
        ...entry,
        characterCount,
        isValid: characterCount >= entry.min && characterCount <= entry.max,
      }
    })
    .reduce((accumulator, entry) => {
      if (entry.isValid) {
        accumulator++
      }
      return accumulator
    }, 0)
}

function solvePartTwo(input) {
  return input
    .map((entry) => {
      const charPos1 = entry.password.charAt(entry.min - 1)
      const charPos2 = entry.password.charAt(entry.max - 1)
      const charPos1Match = charPos1 === entry.character
      const charPos2Match = charPos2 === entry.character
      return {
        ...entry,
        // charPos1,
        // charPos1Match,
        // charPos2,
        // charPos2Match,
        isValid:
          (charPos1Match && !charPos2Match) ||
          (!charPos1Match && charPos2Match),
      }
    })
    .reduce((accumulator, entry) => {
      if (entry.isValid) {
        accumulator++
      }
      return accumulator
    }, 0)
}
