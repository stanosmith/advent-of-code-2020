'use strict'

const fs = require('fs').promises

module.exports = {
  getInput,
}

async function getInput(inputPath) {
  const input = await fs.readFile(inputPath)
  return input.toString()
}
