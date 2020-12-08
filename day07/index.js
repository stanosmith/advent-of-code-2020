'use strict'

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
    console.log('---')

    // console.log('---')
    // const solutionPartTwo = solvePartTwo(preppedInput)
    // console.log(`Part two puzzle answer ⭐️`)
    // console.log(solutionPartTwo)
    // console.log('---')

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
                  contains: [], // Need to add empty array cause in some cases a bag doesn't contain anything
                }
              }
              return {
                contains: subEntry
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
      // Remove bags which don't hold other bags
      .filter((bag) => bag.contains.length)
      // Remove my bag, since it can't hold itself
      .filter((bag) => bag.color !== myBag)
  )
}

function solvePuzzle(input) {
  const outerBagsThatHoldMyBag = input.filter((bag) => {
    return bag.contains.filter((innerBag) => innerBag.color === myBag).length
  })
  console.table(
    outerBagsThatHoldMyBag.map((bag) => ({
      ...bag,
      contains: bag.contains.map((innerBag) => innerBag.color),
    })),
  )

  const innerBagsThatHoldTheOuterBagsThatHoldMyBag = input
    // Exclude the bags that hold my bag directly
    .filter((bag) => {
      return (
        outerBagsThatHoldMyBag.filter((outerBag) => {
          return outerBag.color === bag.color
        }).length === 0
      )
    })
    // Look for inner bags which hold the outer bags (which hold my bag)
    .filter((bag) => {
      return bag.contains.filter((innerBag) => {
        debugger
        return outerBagsThatHoldMyBag.filter((outerBag) => {
          debugger
          return outerBag.color === innerBag.color
        }).length
      }).length
    })
  console.table(
    innerBagsThatHoldTheOuterBagsThatHoldMyBag.map((bag) => ({
      ...bag,
      contains: bag.contains.map((innerBag) => innerBag.color),
    })),
  )

  // Test input answer is `4`
  // INFO: `39` is not the correct answer
  return [
    ...outerBagsThatHoldMyBag,
    ...innerBagsThatHoldTheOuterBagsThatHoldMyBag,
  ].length
}

function solvePartTwo(input) {
  return 0
}
