'use strict'

const _ = require('lodash')

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/11

const inputPath = './input.txt'
// const inputPath = './test-input.txt'

const seatFloor = '.'
const seatEmpty = 'L'
const seatOccupied = '#'

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

    console.log('---')
    const solution = solvePuzzle(preppedInput)
    console.log(`OG puzzle answer ⭐️`)
    console.log(solution)

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
|
| Simulate your seating area by applying the seating rules repeatedly until no seats change state.
|
*/
function solvePuzzle(input) {
  // How many seats end up occupied?
  return recursive(input).reduce((occupiedSeats, seatRow) => {
    debugger
    return (
      occupiedSeats + seatRow.filter((seat) => seat === seatOccupied).length
    )
  }, 0)
}

function recursive(prevResult) {
  const nextResult = applyRules(prevResult)

  if (_.isEqual(prevResult, nextResult)) {
    debugger
    return nextResult
  }

  debugger
  return recursive(nextResult)
}

function applyRules(seatingArea) {
  return seatingArea.map((seatRow, rowIndex, allSeatRows) => {
    return seatRow.map((seat, seatIndex, allSeats) => {
      // Floor seats don't change
      if (seat === seatFloor) {
        return seat
      }

      const topSeats = getSeatGroup(seatIndex, allSeatRows[rowIndex - 1])
      const centerSeats = getSeatGroup(seatIndex, seatRow, true)
      const bottomSeats = getSeatGroup(seatIndex, allSeatRows[rowIndex + 1])
      const adjacentSeats = [...topSeats, ...centerSeats, ...bottomSeats].flat()
      // const adjacentSeats = [topSeats, centerSeats, bottomSeats]
      const numOccupiedAdjacentSeats = adjacentSeats.filter((adjacentSeat) => {
        return adjacentSeat === seatOccupied
      }).length

      // If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
      if (seat === seatEmpty && numOccupiedAdjacentSeats === 0) {
        return seatOccupied
      }

      // If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
      if (seat === seatOccupied && numOccupiedAdjacentSeats >= 4) {
        return seatEmpty
      }

      return seat
    })
  })
}

function getSeatGroup(seatIndex, seatRow, excludeCenter) {
  if (seatRow) {
    const sliceStart = seatIndex === 0 ? 0 : seatIndex - 1
    const sliceEnd = seatIndex + 2

    if (excludeCenter) {
      return [
        seatRow.slice(sliceStart, seatIndex),
        seatRow.slice(seatIndex + 1, sliceEnd),
      ]
    }

    return seatRow.slice(sliceStart, sliceEnd)
  }
  return []
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
  return input.map((seatRow) => seatRow.split(''))
}
