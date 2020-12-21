'use strict'

const _ = require('lodash')

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/12

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

const ACTION_MAPPING = {
  N: 'NORTH',
  S: 'SOUTH',
  E: 'EAST',
  W: 'WEST',
  L: 'LEFT',
  R: 'RIGHT',
  F: 'FORWARD',
}
const ACTION_METHODS = {
  [ACTION_MAPPING.N]: moveNorthSouth,
  [ACTION_MAPPING.S]: moveNorthSouth,
  [ACTION_MAPPING.E]: moveEastWest,
  [ACTION_MAPPING.W]: moveEastWest,
  [ACTION_MAPPING.L]: rotate,
  [ACTION_MAPPING.R]: rotate,
  [ACTION_MAPPING.F]: moveForward,
}
const COMPASS = [
  ACTION_MAPPING.N,
  ACTION_MAPPING.E,
  ACTION_MAPPING.S,
  ACTION_MAPPING.W,
]

getInput(inputPath)
  .then((res) => {
    console.log('---')
    const input = res.split('\n').filter((entry) => entry !== '')
    console.log(`OG input:`)
    console.log('input.length', input.length)
    // console.table(input)

    console.log('---')
    const preppedInput = prepInput(input)
    console.log(`Prepped input:`)
    console.log('preppedInput.length', preppedInput.length)
    // console.table(preppedInput)

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
| What is the Manhattan distance between the navigation instructions location and the ship's starting position (0, 0)?
|
| Action N means to move north by the given value.
| Action S means to move south by the given value.
| Action E means to move east by the given value.
| Action W means to move west by the given value.
| Action L means to turn left the given number of degrees.
| Action R means to turn right the given number of degrees.
| Action F means to move forward by the given value in the direction the ship is currently facing.
|
*/
function solvePuzzle(input) {
  // Loop through all instructions and calculate the north/south, east/west values
  return input.reduce(
    (manhattanDistData, action) => {
      return {
        ...manhattanDistData,
        ...ACTION_METHODS[action.text](manhattanDistData, action),
      }
    },
    {
      [ACTION_MAPPING.N]: 0,
      [ACTION_MAPPING.S]: 0,
      [ACTION_MAPPING.E]: 0,
      [ACTION_MAPPING.W]: 0,
      shipIsFacing: ACTION_MAPPING.E, // Ship starts facing EAST
    },
  )

  // Manhattan distance = sum of the absolute values of its east/west position and its north/south position
  // e.g. The test input should be 17 + 8 = 25
  // TODO: return eastWest + northSouth
}

// TODO: Each method needs to perform it's action and return an update to the object
function moveNorthSouth(manhattanDistData, action) {
  const north = manhattanDistData[ACTION_MAPPING.N]
  const south = manhattanDistData[ACTION_MAPPING.S]

  // debugger
  return {
    ...manhattanDistData,
    // TODO: Update north and south values
    [ACTION_MAPPING.N]: Math.abs(north - south),
    [ACTION_MAPPING.S]: Math.min(south - north, 0),
  }
}

function moveEastWest(manhattanDistData, action) {
  // One of these will stay or change to 0
  const east = manhattanDistData[ACTION_MAPPING.E]
  const west = manhattanDistData[ACTION_MAPPING.W]
  const diff = Math.abs(east - west)

  // debugger

  // TODO: The number needs to be added to east or west depending on the action key

  return {
    ...manhattanDistData,
    // TODO: Update east and west values
    [ACTION_MAPPING.E]: east,
    [ACTION_MAPPING.W]: west,
  }
}

function moveForward(manhattanDistData, action) {
  // debugger
  return ACTION_METHODS[manhattanDistData.shipIsFacing](
    manhattanDistData,
    action,
  )
}

function rotate(manhattanDistData, action) {
  let indexOffset = action.value / 90
  let currentCompassIndex = COMPASS.indexOf(manhattanDistData.shipIsFacing)
  let newCompassIndex = (currentCompassIndex + indexOffset) % COMPASS.length
  let shipIsFacing = COMPASS[newCompassIndex]

  if (action.text === ACTION_MAPPING.L) {
    const altIndexOffset = indexOffset % COMPASS.length
    newCompassIndex = currentCompassIndex - altIndexOffset

    if (newCompassIndex < 0) {
      newCompassIndex = COMPASS.length - Math.abs(newCompassIndex)
    }

    shipIsFacing = COMPASS[newCompassIndex]
    // With the test input, the direction the ship is facing should follow this order
    // [0: NORTH, 1: EAST, 2: SOUTH, 3: WEST]
    // R360 // 1: EAST
    // L90  // 0: NORTH (1-1 =  0 => index: 0)
    // L180 // 2: SOUTH (0-2 = -2 => index: 2)
    // L270 // 3: WEST  (2-3 = -1 => index: 3)
    // L360 // 3: WEST  (3-4 = -1 => index: 3)
    // L450 // 2: SOUTH (3-5 = -2 => index: 2)
    console.table({ newCompassIndex })
  }

  console.log(
    `The ship is ${
      currentCompassIndex === newCompassIndex ? 'STILL' : 'NOW'
    } facing ${shipIsFacing}`,
  )
  return {
    ...manhattanDistData,
    shipIsFacing,
  }
}

function getAllActionSums(input) {
  return input.reduce((summedActions, instruction) => {
    let summedValue = summedActions[instruction.text] || 0

    return {
      ...summedActions,
      [instruction.text]: summedValue + instruction.value,
    }
  }, {})
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
    return input.map((entry) => ({
      text: ACTION_MAPPING[entry.slice(0, 1).toUpperCase()],
      value: parseInt(entry.slice(1)),
    }))
  } catch (e) {
    console.error(e)
    debugger
  }
}
