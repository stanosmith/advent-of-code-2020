'use strict'

const _ = require('lodash')

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/12

const inputPath = './input.txt'
// const inputPath = './test-input.txt'

const ACTION_MAPPING = {
  N: 'NORTH',
  S: 'SOUTH',
  E: 'EAST',
  W: 'WEST',
  L: 'LEFT',
  R: 'RIGHT',
  F: 'FORWARD',
}
const COMPASS = [
  ACTION_MAPPING.N,
  ACTION_MAPPING.E,
  ACTION_MAPPING.S,
  ACTION_MAPPING.W,
]
const ACTION_METHODS_SHARED = {
  [ACTION_MAPPING.N]: moveAlongAxis.bind(
    null,
    ACTION_MAPPING.N,
    ACTION_MAPPING.S,
  ),
  [ACTION_MAPPING.S]: moveAlongAxis.bind(
    null,
    ACTION_MAPPING.S,
    ACTION_MAPPING.N,
  ),
  [ACTION_MAPPING.E]: moveAlongAxis.bind(
    null,
    ACTION_MAPPING.E,
    ACTION_MAPPING.W,
  ),
  [ACTION_MAPPING.W]: moveAlongAxis.bind(
    null,
    ACTION_MAPPING.W,
    ACTION_MAPPING.E,
  ),
}
const DIRECTION_COUNTERPARTS = [
  [ACTION_MAPPING.N, ACTION_MAPPING.S],
  [ACTION_MAPPING.E, ACTION_MAPPING.W],
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
    // Solution was `923`
    console.log(solution)

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
  const actionMethods = {
    ...ACTION_METHODS_SHARED,
    [ACTION_MAPPING.L]: rotate,
    [ACTION_MAPPING.R]: rotate,
    [ACTION_MAPPING.F]: moveForward,
  }
  // Loop through all instructions and calculate the north/south, east/west values
  const tripResults = input.reduce(
    (manhattanDistData, action) => {
      return {
        ...manhattanDistData,
        ...actionMethods[action.text](manhattanDistData, action, actionMethods),
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

  console.table(tripResults)

  // Manhattan distance = sum of the absolute values of its east/west position and its north/south position
  // e.g. The test input should be 17 + 8 = 25
  const eastWest = Math.abs(tripResults[ACTION_MAPPING.E])
  const northSouth = Math.abs(tripResults[ACTION_MAPPING.N])
  return eastWest + northSouth
}

function moveAlongAxis(directionA, directionB, manhattanDistData, action) {
  let a = manhattanDistData[directionA]
  let b = manhattanDistData[directionB]

  if (action.text === directionA) {
    a += action.value
    b -= action.value
  } else {
    a -= action.value
    b += action.value
  }

  return {
    ...manhattanDistData,
    [directionA]: a,
    [directionB]: b,
  }
}

function moveForward(manhattanDistData, action, actionMethods) {
  return actionMethods[manhattanDistData.shipIsFacing](manhattanDistData, {
    text: manhattanDistData.shipIsFacing,
    value: action.value,
  })
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
| Action N means to move the waypoint north by the given value.
| Action S means to move the waypoint south by the given value.
| Action E means to move the waypoint east by the given value.
| Action W means to move the waypoint west by the given value.
| Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
| Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
| Action F means to move forward to the waypoint a number of times equal to the given value.
|
*/
function solvePartTwo(input) {
  const actionMethods = {
    ...ACTION_METHODS_SHARED,
    [ACTION_MAPPING.L]: rotateWaypoint,
    [ACTION_MAPPING.R]: rotateWaypoint,
    [ACTION_MAPPING.F]: moveShipForward,
  }
  const tripResults = input.reduce(
    (manhattanDistData, action) => {
      return {
        ...manhattanDistData,
        ...actionMethods[action.text](manhattanDistData, action, actionMethods),
      }
    },
    {
      [ACTION_MAPPING.N]: 1,
      [ACTION_MAPPING.S]: -1,
      [ACTION_MAPPING.E]: 10,
      [ACTION_MAPPING.W]: -10,
      ship: {
        [ACTION_MAPPING.N]: 0,
        [ACTION_MAPPING.S]: 0,
        [ACTION_MAPPING.E]: 0,
        [ACTION_MAPPING.W]: 0,
      },
      shipIsFacing: ACTION_MAPPING.E, // Ship starts facing EAST
    },
  )

  const { ship, shipIsFacing, ...rest } = tripResults
  console.table({
    ship: { ...ship, shipIsFacing },
    waypoint: rest,
  })

  const eastWest = Math.abs(tripResults.ship[ACTION_MAPPING.E])
  const northSouth = Math.abs(tripResults.ship[ACTION_MAPPING.N])
  return eastWest + northSouth
}

function rotateWaypoint(manhattanDistData, action) {
  // TODO: Use the COMPASS array to roll the position left/right
  // The 2 coordinates will always be right next to each other in the COMPASS array
  //    ['NORTH','EAST','SOUTH','WEST']
  // 1. | 10    | 4 ▶  |       |      |
  // 2. |       | 10   | 4 ▼   |      |

  // Previous facing direction
  const directionShipWasFacing = manhattanDistData.shipIsFacing
  const directionShipWasFacingValue = manhattanDistData[directionShipWasFacing]
  const directionShipWasFacingIndex = COMPASS.indexOf(directionShipWasFacing)
  const directionCrossShipWasFacing =
    directionShipWasFacingIndex !== 0
      ? COMPASS[directionShipWasFacingIndex - 1]
      : COMPASS[COMPASS.length - 1]
  const crossShipWasFacingValue = manhattanDistData[directionCrossShipWasFacing]

  // Updated facing direction
  const directionShipIsFacing = rotate(manhattanDistData, action).shipIsFacing
  const directionShipIsFacingIndex = COMPASS.indexOf(directionShipIsFacing)
  const directionShipIsFacingOpposite = getOppositeDirection(
    directionShipIsFacing,
  )

  const directionCrossShipIsFacing =
    directionShipIsFacingIndex !== 0
      ? COMPASS[directionShipIsFacingIndex - 1]
      : COMPASS[COMPASS.length - 1]
  const crossShipIsFacingOpposite = getOppositeDirection(
    directionCrossShipIsFacing,
  )

  return {
    ...manhattanDistData,
    [directionShipIsFacing]: directionShipWasFacingValue,
    [directionShipIsFacingOpposite]: -directionShipWasFacingValue,
    [directionCrossShipIsFacing]: crossShipWasFacingValue,
    [crossShipIsFacingOpposite]: -crossShipWasFacingValue,
    shipIsFacing: directionShipIsFacing,
  }
}

function getOppositeDirection(isFacing) {
  return DIRECTION_COUNTERPARTS.filter((counterparts) => {
    return counterparts.indexOf(isFacing) !== -1
  })
    .flat()
    .find((counterpart) => {
      return counterpart !== isFacing
    })
}

function moveShipForward(manhattanDistData, action) {
  // Result for each TEST iteration:
  // F10: east 100, north 10
  // F7:  east 170, north 38
  // F11: east 214, south 72
  // TODO: Should be +/- depending on the current value
  const prevShipNorth = manhattanDistData.ship[ACTION_MAPPING.N]
  const prevShipSouth = manhattanDistData.ship[ACTION_MAPPING.S]
  const prevShipEast = manhattanDistData.ship[ACTION_MAPPING.E]
  const prevShipWest = manhattanDistData.ship[ACTION_MAPPING.W]

  const travelDistanceNorth = manhattanDistData[ACTION_MAPPING.N] * action.value
  const travelDistanceSouth = manhattanDistData[ACTION_MAPPING.S] * action.value
  const travelDistanceEast = manhattanDistData[ACTION_MAPPING.E] * action.value
  const travelDistanceWest = manhattanDistData[ACTION_MAPPING.W] * action.value

  const updatedShipNorth = prevShipNorth + travelDistanceNorth
  const updatedShipSouth = prevShipSouth + travelDistanceSouth
  const updatedShipEast = prevShipEast + travelDistanceEast
  const updatedShipWest = prevShipWest + travelDistanceWest

  return {
    ...manhattanDistData,
    ship: {
      [ACTION_MAPPING.N]: updatedShipNorth,
      [ACTION_MAPPING.S]: updatedShipSouth,
      [ACTION_MAPPING.E]: updatedShipEast,
      [ACTION_MAPPING.W]: updatedShipWest,
    },
  }
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
