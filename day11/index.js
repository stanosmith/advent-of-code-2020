'use strict'

const _ = require('lodash')

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/11

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

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

    // console.log('---')
    // const solution = solvePuzzle(preppedInput)
    // console.log(`OG puzzle answer ⭐️`)
    // console.log(solution)

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
| Simulate your seating area by applying the seating rules repeatedly until no seats change state.
|
*/
function solvePuzzle(input) {
  // How many seats end up occupied?
  return recursive(input, applyRules).reduce(calculateTotal, 0)
}

function calculateTotal(occupiedSeats, seatRow) {
  return occupiedSeats + seatRow.filter((seat) => seat === seatOccupied).length
}

function recursive(prevResult, applyRulesMethod) {
  const nextResult = applyRulesMethod(prevResult)

  console.table(prevResult)
  console.table(nextResult)

  if (_.isEqual(prevResult, nextResult)) {
    return nextResult
  }

  return recursive(nextResult, applyRulesMethod)
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
  // How many seats end up occupied?
  return recursive(input, applyRulesPartTwo).reduce(calculateTotal, 0)
}

function applyRulesPartTwo(seatingArea) {
  return seatingArea.map((seatRow, rowIndex, allSeatRows) => {
    return seatRow.map((seat, seatIndex, allSeats) => {
      // Floor seats don't change
      if (seat === seatFloor) {
        return seat
      }

      const visibleOccupiedSeats = getVisibleOccupiedSeats(
        seatIndex,
        allSeats,
        rowIndex,
        allSeatRows,
      )
      const numOccupiedAdjacentSeats = visibleOccupiedSeats.filter(
        (adjacentSeat) => {
          return adjacentSeat === seatOccupied
        },
      ).length

      // If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
      if (seat === seatEmpty && numOccupiedAdjacentSeats === 0) {
        return seatOccupied
      }

      // If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
      if (seat === seatOccupied && numOccupiedAdjacentSeats >= 5) {
        return seatEmpty
      }

      return seat
    })
  })
}

function getVisibleOccupiedSeats(seatIndex, allSeats, rowIndex, allSeatRows) {
  const occupiedRight = findSeatInArray(seatOccupied, allSeats)
  const occupiedBottomRight = []
  const occupiedBottomCenter = []
  const occupiedBottomLeft = []
  const occupiedLeft = getOccupiedLeft(seatIndex, allSeats)
  const occupiedTopLeft = []
  const occupiedTopCenter = []
  const occupiedTopRight = []
  return [
    occupiedRight,
    occupiedBottomRight,
    occupiedBottomCenter,
    occupiedBottomLeft,
    occupiedLeft,
    occupiedTopLeft,
    occupiedTopCenter,
    occupiedTopRight,
  ]
}

function getOccupiedLeft(seatIndex, allSeats) {
  if (seatIndex > 0) {
    const seatsToSearch = allSeats.slice(0, seatIndex - 1).reverse()
    return findSeatInArray(seatOccupied, seatsToSearch)
  }
  return undefined
}

function findSeatInArray(seat, seats) {
  return seats.find((item) => item === seat)
}

/*
|
| Prep Input
|
*/
function prepInput(input) {
  return input.map((seatRow) => seatRow.split(''))
}
