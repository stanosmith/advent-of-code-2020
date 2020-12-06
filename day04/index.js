'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/4

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

const passportFields = [
  {
    name: 'byr', // (Birth Year)
    ignore: false,
  },
  {
    name: 'cid', // (Country ID)
    ignore: true,
  },
  {
    name: 'ecl', // (Eye Color)
    ignore: false,
  },
  {
    name: 'eyr', // (Expiration Year)
    ignore: false,
  },
  {
    name: 'hcl', // (Hair Color)
    ignore: false,
  },
  {
    name: 'hgt', // (Height)
    ignore: false,
  },
  {
    name: 'iyr', // (Issue Year)
    ignore: false,
  },
  {
    name: 'pid', // (Passport ID)
    ignore: false,
  },
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

    const solution = solvePuzzle(preppedInput)
    console.log('---')
    console.log(`OG puzzle answer ⭐️`)
    console.log(solution)
    console.log('---')

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
  const requiredFields = passportFields
    .filter((field) => !field.ignore)
    .map((field) => field.name)
  const ignoredFields = passportFields
    .filter((field) => field.ignore)
    .map((field) => field.name)

  console.log('requiredFields', requiredFields)
  console.log('ignoredFields', ignoredFields)

  const validPassports = input
    // Remove ignored fields from each entry
    .map((entry) => {
      const entryCopy = Object.assign({}, entry)
      for (let i = 0; i < ignoredFields.length; i++) {
        delete entryCopy[ignoredFields[i]]
      }
      return entryCopy
    })
    // Check the total number of required fields against the number of fields on each passport
    .map((entry) => {
      const entryKeys = Object.keys(entry)
      if (entryKeys.length === requiredFields.length) {
        return {
          ...entry,
          valid: true,
        }
      }
      return entry
    })
    .filter((entry) => entry.valid)

  return validPassports.length
}

function solvePartTwo(input) {
  return 0
}
