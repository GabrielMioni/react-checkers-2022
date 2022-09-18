import { isOdd, setMove } from './utils'
import store from '../store'
import { setCheckers } from '../store/gameSlice'

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
  if (!items) {
    return
  }
  const item = items.find(item => {
    const { row: rowPosition, square: squarePosition } = item.position
    return rowPosition === rowIndex && squarePosition === squareIndex
  })

  return item ? item : null
}

export const findMoveOccupyingSquare = (availableMoves, rowIndex, squareIndex) => {
  if (!availableMoves) {
    return false
  }
  const result = Object.keys(availableMoves).map(key => {
    const move = availableMoves[key]
    if (!move) {
      return false
    }
    const { row, square } = move
    if (row === rowIndex && square === squareIndex) {
      return  key
    }
    return false
  }).filter(value => value)

  if (result.length > 0) {
    const key = result[0]
    return  availableMoves[key]
  }

  return false
}

export const getNeighborSquares = ({ row, square }) => {
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

export const getCheckerFromSquare = (row, square, checkers) => {
  const found = checkers.find(checker => {
    const { row: occupiedRow, square: occupiedSquare } = checker.position
    return row === occupiedRow && square === occupiedSquare
  })
  return found ? found : null
}

export const checkForJumps = (availableMoves) => {
  const state = store.getState()
  const { checkers, activeChecker } = state.game

  const movesOut = { ...availableMoves }

  Object.keys(availableMoves).map(key => {
    const move = availableMoves[key]
    if (!move) {
      return
    }
    const { row: moveRow, square: moveSquare } = move
    const occupyingChecker = getCheckerFromSquare(moveRow, moveSquare, checkers)

    if (!occupyingChecker || occupyingChecker.player === activeChecker.player) {
      return
    }

    const opponentSquares = getNeighborSquares(occupyingChecker.position)
    const jumpSquareMove = opponentSquares[key]
    const { row: jumpRow, square: jumpSquare } = jumpSquareMove
    const occupyingCheckerTwo = getCheckerFromSquare(jumpRow, jumpSquare, checkers)

    movesOut[key] = occupyingCheckerTwo
      ? null
      : { row: jumpRow, square: jumpSquare }
  })
  return movesOut
}

export const getAvailableMoves = ({ row, square }) => {
  const neighborSquares = getNeighborSquares({ row, square })
  return checkForJumps(neighborSquares)
}

export const getUpdatedCheckers = (activeChecker, checkers, row, square) => {
  const updatedChecker = { ...activeChecker }
  updatedChecker.position = { row, square }

  const updatedCheckers = [...checkers]
  const index = updatedCheckers.findIndex(checker => checker.id === updatedChecker.id)
  updatedCheckers.splice(index, 1, updatedChecker)

  return updatedCheckers
}

export const moveChecker = (row, square) => {
  const state = store.getState()
  const { activeChecker, checkers } = state.game

  const updatedCheckers = getUpdatedCheckers(activeChecker, checkers, row, square)
  store.dispatch(setCheckers(updatedCheckers))
}