'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/8

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

getInput(inputPath)
  .then((res) => {
    console.log('---')
    const input = res.split('\n')
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
function solvePuzzle(bootCode) {
  let booting = true
  let accumulator = 0
  let executedInstructions = []
  let instructionIndex = 0
  let instruction

  while (booting) {
    // Store the instruction for this loop
    instruction = bootCode[instructionIndex]

    // Check if this instruction has already been run
    if (executedInstructions.indexOf(instruction.signature) !== -1) {
      debugger
      // Kill the boot loop
      booting = false
    } else {
      switch (instruction.operation) {
        // If this is a `No OP`, go to the next instruction with no further changes
        case 'nop':
          instructionIndex++
          break
        // Update the accumulator
        // case 'acc':
        //   accumulator = instruction.argument + accumulator
        //   break
        default:
          throw new Error(
            `Cannot perform unknown operation "${instruction.operation}" with argument "${instruction.argument}"`,
          )
      }
      //
      // instructionIndex = instruction.argument + instructionIndex

      // Add the instruction signature to the list of executions
      executedInstructions.push(instruction.signature)

      debugger
    }
  }

  return 0
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
  return input.map((instruction) => {
    const [operation, argument] = instruction.split(' ')
    return {
      signature: instruction,
      operation,
      argument: parseInt(argument),
    }
  })
}
