'use strict'

// https://adventofcode.com/2020/day/1
const fs = require('fs').promises
// const inputPath = './input.txt';
const inputPath = './test-input.txt'

getInput()
  .then((res) => {
    const input = res.split('\n').filter((item) => item !== '')

    solvePuzzle(input)

    console.log('Merry Christmas! 🎄')
  })
  .catch((err) => console.error(err))

async function getInput() {
  const input = await fs.readFile(inputPath)
  return input.toString()
}

function solvePuzzle(input) {
  console.log(input)
}
