'use strict'

const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/7

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

const myBag = 'shiny gold'

getInput(inputPath)
  .then((res) => {
    const input = res.split('\n')
    console.log(`---\nOG input:`)
    console.log('input.length', input.length)
    console.log(input)

    const preppedInput = prepInput(input)
    console.log(`---\nPrepped input:`)
    console.log(preppedInput.length)
    console.log(JSON.stringify(preppedInput, null, 2))

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
  return input.map((entry) => {
    return (
      entry
        // Separate the outer bag from what the bag contains
        .split(' bags contain ')
        .map((subEntry, index) => {
          if (index === 0) {
            return {
              color: subEntry,
            }
          }
          return {
            contains: subEntry
              .split(', ')
              // Remove bags which don't hold other bags
              .filter((bagContents) => !bagContents.includes('no other bags.'))
              .map((bagContents) => bagContents.replace('.', ''))
              .map((bagContents) => bagContents.replace(' bags', ''))
              .map((bagContents) => bagContents.replace(' bag', ''))
              .map((bagContents) => {
                const firstSpace = bagContents.indexOf(' ')
                const color = bagContents.slice(firstSpace + 1)
                const count = parseInt(bagContents.slice(0, firstSpace))

                return {
                  color,
                  count,
                }
              }),
          }
        })
        .reduce((bag, bagData) => ({ ...bag, ...bagData }), {})
      // INFO: Example output
      // const output = {
      //   color: 'light red',
      //   contains: [
      //     {
      //       color: 'bright white',
      //       count: 1,
      //     },
      //     {
      //       color: 'muted yellow',
      //       count: 2,
      //     },
      //   ],
      // }
      //
    )
  })
}

function solvePuzzle(input) {
  return 0
}

function solvePartTwo(input) {
  return 0
}
