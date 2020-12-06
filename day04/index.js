'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/4

const inputPath = './input.txt'
// const inputPath = './test-input.txt'
// const inputPath = './test-input-invalid-passports.txt'
// const inputPath = './test-input-valid-passports.txt'

const passportFields = [
  {
    name: 'byr', // (Birth Year)
    ignore: false,
    validator: byr,
  },
  {
    name: 'cid', // (Country ID)
    ignore: true,
    validator: cid,
  },
  {
    name: 'ecl', // (Eye Color)
    ignore: false,
    validator: ecl.bind(null, [
      'amb',
      'blu',
      'brn',
      'gry',
      'grn',
      'hzl',
      'oth',
    ]),
  },
  {
    name: 'eyr', // (Expiration Year)
    ignore: false,
    validator: eyr,
  },
  {
    name: 'hcl', // (Hair Color)
    ignore: false,
    validator: hcl,
  },
  {
    name: 'hgt', // (Height)
    ignore: false,
    validator: hgt,
  },
  {
    name: 'iyr', // (Issue Year)
    ignore: false,
    validator: iyr,
  },
  {
    name: 'pid', // (Passport ID)
    ignore: false,
    validator: pid,
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

    const solutionPartTwo = solvePartTwo(preppedInput)
    console.log('---')
    console.log(`Part two puzzle answer ⭐️`)
    console.log(solutionPartTwo)
    console.log('---')

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
  const validatedPassports = getValidPassports(input)
    .map((entry) => {
      return (
        passportFields
          // .filter((fieldMeta) => entry.hasOwnProperty(fieldMeta.name))
          .map((fieldMeta) => fieldMeta.validator(entry[fieldMeta.name]))
      )
    })
    .filter((validations) => !validations.includes(false))

  console.log(validatedPassports)

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

/*
|🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄
| Validation functions
|🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄
*/

function byr(value) {
  console.log('byr', value)
  // (Birth Year) - four digits; at least 1920 and at most 2002.
  const birthYear = parseInt(value)
  return value.length === 4 && birthYear >= 1920 && birthYear <= 2002
}

function cid(value) {
  // cid (Country ID) - ignored, missing or not.
  console.log('cid', value)
  return true
}

function ecl(validValues, value) {
  console.log('ecl value', value)
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  return validValues.indexOf(value) !== -1
}

function eyr(value) {
  console.log('eyr', value)
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  const expYear = parseInt(value)
  return value.length === 4 && expYear >= 2020 && expYear <= 2030
}

function hcl(value) {
  console.log('hcl', value)
  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  const startsWithPound = value.slice(0, 1) === '#'
  const hasSixCharacters = value.length - 1 === 6
  const onlyValidCharacters = new RegExp(/[0-9]|[a-f]/, 'i').test(
    value.slice(1),
  )
  // console.log(`onlyValidCharacters ${value.slice(1)}`, onlyValidCharacters)
  return startsWithPound && hasSixCharacters && onlyValidCharacters
}

function hgt(value) {
  console.log('hgt', value)
  // hgt (Height) - a number followed by either cm or in:
  //  - If cm, the number must be at least 150 and at most 193.
  //  - If in, the number must be at least 59 and at most 76.
  const units = value.substr(-2)
  const hasValidUnits = units === 'cm' || units === 'in'
  const height = parseInt(value.substr(0, value.length - 2))
  const withinRange =
    units === 'cm'
      ? height >= 150 && height <= 193
      : height >= 59 && height <= 76
  // console.log('hgt height', height)
  // console.log(`hgt ${height} withinRange`, withinRange)
  return hasValidUnits && withinRange
}

function iyr(value) {
  console.log('iyr', value)
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  const year = parseInt(value)
  return value.length === 4 && year >= 2010 && year <= 2020
}

function pid(value) {
  console.log('pid with RegExp', value)
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  return new RegExp(/^\d{9}$/).test(value)
}
