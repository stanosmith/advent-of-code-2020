'use strict'

const { intersection } = require('lodash')

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/5

const inputPath = './input.txt'
// const inputPath = './test-input.txt'

getInput(inputPath)
  .then((res) => {
    const input = res.split('\n\n')
    console.log(`---\nOG input:`)
    console.log('input.length', input.length)
    // console.log(input)

    const preppedInput = prepInput(input)
    console.log(`---\nPrepped input:`)
    console.log(preppedInput.length)
    // console.log(preppedInput)

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
  return input.map((entry) => entry.split('\n'))
}

function solvePuzzle(input) {
  // Duplicate answers to the same question don't count extra; each question counts at most once
  return input
    .map((group) => {
      return [...new Set(group.map((answers) => [...answers]).flat())]
    })
    .map((group) => {
      console.log(group)
      return group
    })
    .reduce((sumOfCounts, answers) => sumOfCounts + answers.length, 0)
}

function solvePartTwo(input) {
  // You don't need to identify the questions to which _anyone_ answered "yes";
  // you need to identify the questions to which _everyone_ answered "yes"!
  return input
    .map((group) => {
      return group.map((answers) => [...answers])
    })
    .map((group) => intersection(...group))
    .map((group) => {
      console.log(group)
      return group
    })
    .reduce((sumOfCounts, answers) => sumOfCounts + answers.length, 0)
}
