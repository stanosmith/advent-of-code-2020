'use strict'

const { differenceBy, intersection } = require('lodash')
const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/7

// const inputPath = './input.txt'
const inputPath = './test-input.txt'

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

    console.log('---')
    const solutionPartTwo = solvePartTwo(preppedInput)
    console.log(`Part two puzzle answer ⭐️`)
    console.log(solutionPartTwo)
    console.log('---')

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

function prepInput(input) {
  return (
    input
      .map((entry) => {
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
                  .filter(
                    (bagContents) => !bagContents.includes('no other bags.'),
                  )
                  .map((bagContents) => bagContents.replace('.', ''))
                  .map((bagContents) => bagContents.replace(' bags', ''))
                  .map((bagContents) => bagContents.replace(' bag', ''))
                  .map((bagContents) => {
                    const firstSpace = bagContents.indexOf(' ')
                    const color = bagContents.slice(firstSpace + 1)
                    const count = parseInt(bagContents.slice(0, firstSpace))

                    return {
                      color,
                      // count,
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
      // Remove bags which don't hold other bags
      .filter((bag) => bag.innerBags.length)
      // Remove my bag, since it can't hold itself
      .filter((bag) => bag.color !== myBag)
  )
}

function getBags(input, bagsToSearchFor) {
  if (bagsToSearchFor) {
    const bagColorsToFind = bagsToSearchFor.map((bag) => bag.color)
    const bagsToSearch = differenceBy(input, bagsToSearchFor, 'color')
    return bagsToSearch.filter((bag) => {
      const innerBagColors = bag.innerBags.map((innerBag) => innerBag.color)
      return intersection(bagColorsToFind, innerBagColors).length > 0
    })
  }

  return input.filter((bag) => {
    return bag.innerBags.filter(isMyBag).length > 0
  })
}

function isMyBag(bag) {
  return bag.color === myBag
}

function solvePuzzle(input) {
  const level1Bags = getBags(input)
  const level2Bags = getBags(input, level1Bags)
  // const level3Bags = getBags(input, [...level1Bags, ...level2Bags])
  const level3Bags = getBags(input, level2Bags)
  const level4Bags = getBags(input, level3Bags)
  const level5Bags = getBags(input, level4Bags)
  const level6Bags = getBags(input, level5Bags)
  const level7Bags = getBags(input, level6Bags)
  const level8Bags = getBags(input, level7Bags)
  const level9Bags = getBags(input, level8Bags)
  const level10Bags = getBags(input, level9Bags)
  const level11Bags = getBags(input, level10Bags)
  const level12Bags = getBags(input, level11Bags)
  const level13Bags = getBags(input, level12Bags)
  const level14Bags = getBags(input, level13Bags)
  const level15Bags = getBags(input, level14Bags)

  // Test input answer is `4`
  // INFO: `39` is not the correct answer
  const solution = [
    ...new Set(
      [
        ...level1Bags,
        ...level2Bags,
        ...level3Bags,
        ...level4Bags,
        ...level5Bags,
        ...level6Bags,
        ...level7Bags,
        ...level8Bags,
        ...level9Bags,
        ...level10Bags,
        ...level11Bags,
        ...level12Bags,
        ...level13Bags,
        ...level14Bags,
        ...level15Bags,
      ]
        .map((bag) => bag.color)
        .sort(),
    ),
  ]

  console.log(solution)

  return solution.length
  // return [...new Set([...level1Bags, ...level2Bags])]
  // return [...new Set(level1Bags)]
  // return JSON.stringify({ level1Bags, level2Bags, level3Bags }, null, 2)
}

function solvePartTwo(input) {
  return 0
}
