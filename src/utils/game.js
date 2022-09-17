import { isOdd, setMove } from './utils'

const setInitialSquarePosition = (row) => {
  return isOdd(row) ? 0 : 1
}

export const initCheckers = (player, startRow) => {
  const checkers = []

  let row = startRow
  let square = setInitialSquarePosition(row)

  let rowSquareCount = 0

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

export const findItemOccupyingSquare = (items, rowIndex, squareIndex) => {
  const item = items.find(item => {
    const { row: rowPosition, square: squarePosition } = item.position
    return rowPosition === rowIndex && squarePosition === squareIndex
  })

  return item ? item : null
}

export const getAvailableMoves = ({ row, square }) => {
  const directions = {
    up: row - 1,
    down: row + 1,
    left: square - 1,
    right: square + 1
  }

  Object.keys(directions).map(key => {
    const directionValue = directions[key]

    if (directionValue < 0 || directionValue > 7) {
      directions[key] = null
    }
  })

  const { up, down, left, right } = directions

  return {
    a: setMove(up, left),
    b: setMove(up, right),
    c: setMove(down, right),
    d: setMove(down, left)
  }
}