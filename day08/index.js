'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/8

// const inputPath = './input.txt'
// const inputPath = './test-input.txt'
const inputPath = './test-input-part-2.txt'

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

    console.log('---')
    const solutionPartTwo = solvePartTwo(preppedInput)
    console.log(`Part two puzzle answer ⭐️⭐️`)
    console.log(solutionPartTwo)

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
  let terminatedNormally = false

  while (booting) {
    // Store the instruction for this loop
    instruction = bootCode[instructionIndex]

    // If no instruction is found, break out of the loop
    if (!instruction) {
      terminatedNormally = true
      break
    }

    // Check if this instruction has already been run
    if (executedInstructions.indexOf(instruction.signature) !== -1) {
      // Kill the boot loop
      booting = false
      break
    }

    // Execute instruction based on the type of operation
    switch (instruction.operation) {
      // If this is a `No OP`, go to the next instruction with no further changes
      case 'nop':
        instructionIndex++
        break
      // Update the accumulator
      case 'acc':
        accumulator = instruction.argument + accumulator
        instructionIndex++
        break
      case 'jmp':
        instructionIndex = instruction.argument + instructionIndex
        break
      default:
        throw new Error(
          `Cannot perform unknown operation "${instruction.operation}" with argument "${instruction.argument}"`,
        )
    }

    // Add the instruction signature to the list of executions
    executedInstructions.push(instruction.signature)
  }

  return { accumulator, terminatedNormally }
}

/*
|
| Solve Puzzle - Part 2
|
*/
function solvePartTwo(input) {
  // TODO: Loop through all permutations of replacing a single `nop` with `jmp` or `jmp` with `nop`
  const allNop = input
    .filter(instructionWithOperation.bind(null, 'nop'))
    .map((instructionA) => {
      const adjustedInput = input.map((instructionB) => {
        if (instructionB.signature === instructionA.signature) {
          // Replace `nop` with `jmp`
          const replacementOperation = 'jmp'
          const signature = instructionB.signature.replace(
            'nop',
            replacementOperation,
          )
          const operation = replacementOperation
          return {
            ...instructionB,
            signature,
            operation,
          }
        }
        return instructionB
      })
      return solvePuzzle(adjustedInput)
    })
  const allJmps = input.filter((instruction) => instruction.operation === 'jmp')
  return [...allNop, ...allJmps]
}

function instructionWithOperation(operation, instruction) {
  return instruction.operation === operation
}

/*
|
| Prep Input
|
*/
function prepInput(input) {
  return input.map((instruction, index) => {
    const [operation, argument] = instruction.split(' ')
    return {
      signature: `${instruction} ${index}`,
      operation,
      argument: parseInt(argument),
    }
  })
}
