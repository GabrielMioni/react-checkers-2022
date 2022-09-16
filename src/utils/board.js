import { isOdd } from './utils'

const setInitialSquarePosition = (row) => {
  return isOdd(row) ? 0 : 1
}

export const initCheckers = (player, startRow) => {
  const checkers = []

  let row = startRow
  let square = setInitialSquarePosition(row)

  let rowSquareCount = 0
  console.log(rowSquareCount)

  while (checkers.length < 12) {
    const checkerObject = {
      player,
      id: `${player}${checkers.length}`,
      position: {
        row,
        square
      }
    }
    checkers.push(checkerObject)
    square = square + 2
    ++rowSquareCount
    if (rowSquareCount >= 4) {
      rowSquareCount = 0
      ++row
      square = setInitialSquarePosition(row)
    }
  }

  return checkers
}