'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/4

const inputPath = './input.txt'
// const inputPath = './test-input.txt'

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
  const validPassports = getValidPassports(input)

  // `201` is too high, but `200` is not… Off by one, that's crazy!
  return validPassports.length
}

function solvePartTwo(input) {
  const validatedPassports = getValidPassports(input).map((entry) => {
    return passportFields
      .filter((fieldMeta) => entry.hasOwnProperty(fieldMeta.name))
      .map((fieldMeta) => fieldMeta.validator(entry[fieldMeta.name]))
  })

  return validatedPassports.length
}

function getValidPassports(input) {
  const requiredFields = passportFields
    .filter((field) => !field.ignore)
    .map((field) => field.name)
  const ignoredFields = passportFields
    .filter((field) => field.ignore)
    .map((field) => field.name)

  console.log('requiredFields', requiredFields)
  console.log('ignoredFields', ignoredFields)

  return (
    input
      // Check the total number of required fields against the number of fields on each passport
      .map((entry) => {
        const entryFields = Object.keys(entry)
        const missingRequiredFields = passportFields
          .map((field) => field.name)
          .filter((fieldName) => !entryFields.includes(fieldName))
          .filter((fieldName) => !ignoredFields.includes(fieldName))
        console.log('missingRequiredFields', missingRequiredFields)

      if (missingRequiredFields.length === 0) {
        return {
          ...entry,
          valid: true,
        }
      }

        return entry
      })
      .filter((entry) => entry.valid)
  )
}

  // `201` is too high, but `200` is not… Off by one, that's crazy!
  return validPassports.length
}

function solvePartTwo(input) {
  return 0
}
