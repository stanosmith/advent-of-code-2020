'use strict'

const { differenceBy, intersection } = require('lodash')
const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/7

const inputPath = './input.txt'
// const inputPath = './test-input.txt'
// const inputPath = './test-input-part-2.txt'

const myBag = 'shiny gold'

getInput(inputPath)
  .then((res) => {
    console.log('---')
    const input = res.split('\n')
    console.log(`OG input:`)
    console.log('input.length', input.length)
    console.log(input)

    console.log('---')
    const preppedInput = prepInput(input)
    console.log(`Prepped input:`)
    console.log('preppedInput.length', preppedInput.length)
    // console.log(JSON.stringify(preppedInput, null, 2))

    console.log('---')
    const solution = solvePuzzle(preppedInput)
    console.log(`OG puzzle answer ⭐️`)
    console.log(solution)
    // console.log(JSON.stringify(solution, null, 2))

    console.log('---')
    const solutionPartTwo = solvePartTwo(preppedInput)
    console.log(`Part two puzzle answer ⭐️⭐️`)
    // console.log(solutionPartTwo)

    console.log('---')
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
              innerBags: [], // Need to add empty array cause in some cases a bag doesn't contain anything
            }
          }
          return {
            innerBags: subEntry
              .split(', ')
              // Empty arrays for all bags which don't hold other bags
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

function isMyBag(bag) {
  return bag.color === myBag
}

function solvePuzzle(input) {
  // Adjust the initial input data
  input = input
    // Remove bags which don't hold other bags
    .filter((bag) => bag.innerBags.length)
    // Remove my bag, since it can't hold itself
    .filter((bag) => bag.color !== myBag)

  // Find the initial bags which contain my bag
  const bagsContainingMyBag = input.filter((bag) => {
    return bag.innerBags.filter(isMyBag).length > 0
  })

  const allBagsWhichHoldMyBag = getBags(input, bagsContainingMyBag)

  // Test input answer is `4`
  // INFO: `39` is not the correct answer
  const solution = [
    ...new Set(allBagsWhichHoldMyBag.map((bag) => bag.color).sort()),
  ]

  console.log(solution)

  return solution.length
}

function solvePartTwo(input) {
  // Test part-2 input total = 126
  return input
}

function getBags(input, bagsToSearchFor, allBags = []) {
  const bagColorsToFind = bagsToSearchFor.map((bag) => bag.color)
  const bagsToSearch = differenceBy(input, bagsToSearchFor, 'color')
  const matchingBags = bagsToSearch.filter((bag) => {
    const innerBagColors = bag.innerBags.map((innerBag) => innerBag.color)
    return intersection(bagColorsToFind, innerBagColors).length > 0
  })

  // Update the collection of bags
  allBags = [...allBags, ...bagsToSearchFor]

  if (matchingBags.length) {
    // Recursive-ness yo!
    return getBags(input, matchingBags, allBags)
  }

  // Pass collected bags back
  return allBags
}
