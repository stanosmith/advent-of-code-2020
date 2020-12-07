'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/4

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

const totalSeatRows = 128 // numbered 0 through 127
const totalSeatColumns = 8 // numbered 0 through 7
const upper = 'B'
const lower = 'F'

getInput(inputPath)
  .then((res) => {
    const input = res.split('\n').filter((entry) => entry !== '')
    console.log(`---\nOG input:`)
    console.log('input.length', input.length)
    // console.log(input)
    console.log('---')

    const preppedInput = prepInput(input)
    console.log(`Prepped input:`)
    console.log(preppedInput)
    console.log('---')

    const solution = solvePuzzle(preppedInput)
    console.log('---')
    console.log(`OG puzzle answer ⭐️`)
    console.log(solution)
    console.log('---')
    //
    // const solutionPartTwo = solvePartTwo(preppedInput)
    // console.log('---')
    // console.log(`Part two puzzle answer ⭐️`)
    // console.log(solutionPartTwo)
    // console.log('---')

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

function prepInput(input) {
  return input
}

function solvePuzzle(input) {
  // INFO: Test input should have the following results
  // BFFFBBFRRR: row 70, column 7, seat ID 567.
  // FFFBBBFRRR: row 14, column 7, seat ID 119.
  // BBFFBBFRLL: row 102, column 4, seat ID 820.
  return input.map(decodeSeat)
}

function solvePartTwo(input) {
  return 0
}

function decodeSeat(value) {
  const row = decodeRow(value.slice(0, 7))
  const col = decodeCol(value.substr(7))
  const id = getSeatId(row, col)

  // INFO: decoding `FBFBBFFRLR` reveals that it is the seat at row `44`, column `5`, ID `357`
  return {
    id,
    row,
    col,
  }
}

function decodeRow(value) {
  // INFO: For example, consider just the first seven characters of `FBFBBFFRLR` (FBFBBFF):
  // - Start by considering the whole range, rows 0 through 127.
  // - F means to take the lower half, keeping rows 0 through 63.
  // - B means to take the upper half, keeping rows 32 through 63.
  // - F means to take the lower half, keeping rows 32 through 47.
  // - B means to take the upper half, keeping rows 40 through 47.
  // - B keeps rows 44 through 47.
  // - F keeps rows 44 through 45.
  // - The final F keeps the lower of the two, row 44.
  value = 'FBFBBFF' // TODO: Comment after testing

  return [...value.toUpperCase()].reduce(getSeat, createRange(totalSeatRows))
}

function decodeCol(value) {
  // INFO: For example, consider just the last 3 characters of `FBFBBFFRLR` (RLR):
  value = 'RLR'
  // - Start by considering the whole range, columns 0 through 7.
  // - R means to take the upper half, keeping columns 4 through 7.
  // - L means to take the lower half, keeping columns 4 through 5.
  // - The final R keeps the upper of the two, column 5.
  return 0
}

function getSeat(seat, upperOrLower) {
  const halfIndex = seat.length / 2
  if (upperOrLower === upper) {
    return seat.slice(halfIndex)
  }
  return seat.slice(0, halfIndex)
}

function createRange(max, min = 0) {
  let range = []
  for (let i = min; i < max; i++) {
    range.push(i)
  }
  return range
}

function getSeatId(row, col) {
  return row * totalSeatColumns + col
}
