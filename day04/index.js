'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/4

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

const requiredFields = [
  'byr', // (Birth Year)
  'cid', // (Country ID)
  'ecl', // (Eye Color)
  'eyr', // (Expiration Year)
  'hcl', // (Hair Color)
  'hgt', // (Height)
  'iyr', // (Issue Year)
  'pid', // (Passport ID)
]

getInput(inputPath)
  .then((res) => {
    const input = res.split('\n\n').filter((entry) => entry !== '')
    console.log(`---\nOG input:`)
    console.log('input.length', input.length)
    // console.log(input)
    console.log('---')

    const preppedInput = prepInput(input)
    console.log(`Prepped input:`)
    console.log(preppedInput)
    console.log('---')

    // const solution = solvePuzzle(preppedInput)
    // console.log('---')
    // console.log(`OG puzzle answer ⭐️`)
    // console.log(solution)
    // console.log('---')

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
    .map((entry) => {
      return entry.split('\n').join(' ').split(' ')
    })
    .map((entry) => {
      return entry.sort().reduce((accumulator, keyValueData) => {
        const keyValue = keyValueData.split(':')
        accumulator = {
          ...accumulator,
          [keyValue[0]]: keyValue[1],
        }
        return accumulator
      }, {})
    })
}

function solvePuzzle(input) {
  return 0
}

function solvePartTwo(input) {
  return 0
}
