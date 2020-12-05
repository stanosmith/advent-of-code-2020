'use strict'

// https://adventofcode.com/2020/day/1
const fs = require('fs').promises
const inputPath = './input.txt'
// const inputPath = './test-input.txt'

getInput()
  .then((res) => {
    const input = res
      .split('\n')
      .filter((item) => item !== '')
      .map((entry) => parseInt(entry))
    console.log(input)

    const solution = solvePuzzle(input)
    console.log(`OG puzzle answer: ${solution} 🎅`)

    const solutionPartTwo = solvePartTwo(input)
    console.log(`Part two puzzle answer: ${solutionPartTwo} 💯`)

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

async function getInput() {
  const input = await fs.readFile(inputPath)
  return input.toString()
}

function solvePuzzle(input) {
  const sumCombos = input
    .map((a, indexA, entriesA) => {
      return entriesA.map((b, indexB) => {
        if (indexA > indexB) {
          return {
            a,
            b,
            sum: a + b,
          }
        }
      })
    })
    .flat()
    .filter((sum) => typeof sum !== 'undefined')
  // console.log(sumCombos, sumCombos.length)

  // Solution
  return sumCombos
    .filter((combo) => combo.sum === 2020)
    .reduce((accumulator, combo) => combo.a * combo.b, undefined)
}

function solvePartTwo(input) {
  const sumCombos = input
    .map((a, indexA, entriesA) => {
      return entriesA
        .map((b, indexB, entriesB) => {
          return entriesB.map((c, indexC) => {
            if (indexA > indexB && indexB > indexC) {
              return {
                a,
                b,
                c,
                sum: a + b + c,
              }
            }
          })
        })
        .flat()
    })
    .flat()
    .filter((combo) => typeof combo !== 'undefined')
  // console.log(sumCombos, sumCombos.length)

  // Solution
  return sumCombos
    .filter((combo) => combo.sum === 2020)
    .reduce((accumulator, combo) => combo.a * combo.b * combo.c, undefined)
}
