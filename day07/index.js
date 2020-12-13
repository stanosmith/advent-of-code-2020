'use strict'

const { differenceBy, intersection, intersectionBy } = require('lodash')
const { getInput } = require('../helpers')

// https://adventofcode.com/2020/day/7

const inputPath = './input.txt'
// const inputPath = './test-input.txt'
// const inputPath = './test-input-part-2.txt'

const myBagColor = 'shiny gold'

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
    console.log(solutionPartTwo)

    console.log('---')
    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

function isMyBag(bag) {
  return bag.color === myBagColor
}

function isNotMyBag(bag) {
  return bag.color !== myBagColor
}

function bagMatchesColor(color, bag) {
  return bag.color === color
}

/*
|
| Solve Puzzle - Part 1
|
*/
function solvePuzzle(input) {
  // Adjust the initial input data
  input = input
    // Remove bags which don't hold other bags
    .filter((bag) => bag.innerBags.length)
    // Remove my bag, since it can't hold itself
    .filter(isNotMyBag)

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

/*
|
| Solve Puzzle - Part 2
|
*/
function solvePartTwo(input) {
  const bags = prepInputForPartTwo(input)
  console.log(bags)
  return getBagCount(bags, myBagColor)

  // Earlier attempt
  // logBags(input)
  //
  // const myBag = input.find(isMyBag)
  // const startingBags = addCountToInnerBag(input, myBag)
  // const totalBagsInsideMyBag = addBags(input, startingBags)
  //
  // // logBags(totalBagsInsideMyBag)
  //
  // // Test part-2 input total = 126
  // return totalBagsInsideMyBag
}

function prepInputForPartTwo(input) {
  return input.reduce((bagDictionary, bag) => {
    const innerBags = bag.innerBags.reduce((innerBagDictionary, innerBag) => {
      return {
        ...innerBagDictionary,
        [innerBag.color]: innerBag.count,
      }
    }, {})
    return {
      ...bagDictionary,
      [bag.color]: {
        ...innerBags,
      },
    }
  }, {})
}

function getBagCount(bags, type) {
  let total = 0

  const contents = bags[type]
  debugger
  Object.entries(contents).forEach(([type, count]) => {
    debugger
    total += count
    total += getBagCount(bags, type) * count
  })

  debugger
  return total
}

function logBags(bags) {
  try {
    console.log(
      'bags',
      bags.map((bag) => ({
        color: bag.color,
        innerBags: bag.innerBags.map((innerBag) => JSON.stringify(innerBag)),
      })),
    )
  } catch (e) {
    console.error(e)
  }
}

function getBagTotal(total, bag) {
  return total + bag.count
}

function addCountToInnerBag(input, bag) {
  return bag.innerBags.map((innerBag) => {
    const { innerBags } = input.find(bagMatchesColor.bind(null, innerBag.color))
    return {
      ...innerBag,
      innerBags,
    }
  })
}

function addBags(input, bagsToAdd, subtotal = 0) {
  debugger

  // Keep track of the running total
  subtotal = bagsToAdd.reduce((total, bag, bagIndex, allBags) => {
    // const prevTotal = total
    const bagCount = bag.count
    const innerBagsTotal = bag.innerBags.reduce(getBagTotal, 0)
    total = total + bagCount + bagCount * innerBagsTotal

    debugger

    return total
  }, subtotal)

  // Figure out if we should loop through again
  const bagsWithInnerBags = bagsToAdd.filter((bag) => bag.innerBags.length > 0)
  // const bagsToSearch = intersectionBy(input, bagsToAdd, 'color')

  debugger

  // const moreBagsToAdd = bagsToSearch.map((bag) => bag.innerBags)

  if (bagsWithInnerBags.length) {
    // create array of bags with count and inner bags
    const moreBagsToAdd = bagsWithInnerBags
      .map(addCountToInnerBag.bind(null, input))
      .flat()
    debugger

    return addBags(input, moreBagsToAdd, subtotal)
    // return addBags(
    //   input,
    //   [
    //     {
    //       color: 'dark yellow',
    //       count: 2,
    //       innerBags: [{ color: 'dark green', count: 2 }],
    //     },
    //   ],
    //   subtotal,
    // )
  }

  // Each loop should

  // What if, in every loop, the inner bags and their counts were found and added up
  // and the only thing returned was the subtotal?

  const exampleOutput = [
    {
      color: 'shiny gold',
      innerBags: [
        {
          color: 'dark red',
          count: 2,
          innerBags: [
            {
              color: 'dark orange',
              count: 2,
              innerBags: [
                {
                  color: 'dark yellow',
                  count: 2,
                  innerBags: [
                    {
                      color: 'dark green',
                      count: 2,
                      innerBags: [
                        {
                          color: 'dark blue',
                          count: 2,
                          innerBags: [
                            { color: 'dark violet', count: 2, innerBags: [] },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  return subtotal
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

/*
|
| Prep Input
|
*/
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
