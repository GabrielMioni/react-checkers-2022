import { isOdd, setMove } from '../utils/utils'
import { players } from './players'
import { movementIds } from './movementIds'

export const setPlayerCheckers = () => {
  const checkersA = initCheckers(players.a, 5)
  const checkersB = initCheckers(players.b, 0)

  return [...checkersA, ...checkersB]
}

const setInitialSquarePosition = (row) => {
  return isOdd(row) ? 0 : 1
}

const initCheckers = (player, startRow) => {
  const checkers = []

  let row = startRow
  let square = setInitialSquarePosition(row)

  let rowSquareCount = 0

  while (checkers.length < 12) {
    const checkerObject = {
      player,
      id: `${player}${checkers.length}`,
      row,
      square,
      isKing: false
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

export const findCheckerOccupyingSquare = (checkers, row, square) => {
  if (!checkers) {
    return
  }
  const checker = checkers.find(item => {
    const { row: rowPosition, square: squarePosition } = item
    return rowPosition === row && squarePosition === square
  })

  return checker ? checker : null
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
const hasValidMoves = move => Object.keys(move).filter(movementId => move[movementId]).length > 0

export const findCheckersWithPossibleMoves = (player, checkers) => {
  return checkers.filter(checker => {
    if (checker.player !== player) {
      return false
    }
    const moves = getAvailableMoves(checker, checkers)
    return hasValidMoves(moves)
  })
}

export const getAvailableMoves = (activeChecker, checkers) => {
  const { isKing, player, row, square } = activeChecker
  const neighborSquares = getNeighborSquares(row, square)
  const moves = checkForOpponentNeighbors(neighborSquares, checkers, activeChecker)

  return isKing
    ? moves
    : player === players.a
      ? { ...moves, c: null, d: null }
      : { ...moves, a: null, b: null }
}

export const additionalJumps = (move, checkers) => {
  const { row, square, kill } = move
  if (!kill) {
    return null
  }
  const activeChecker = checkers.find(checker => {
    const { row: checkerRow, square: checkerSquare } = checker
    return row === checkerRow && square === checkerSquare
  })
  if (!activeChecker) {
    return
  }

  const additionalMoves = getAvailableMoves(activeChecker, checkers)

  const result = Object.keys(additionalMoves).map(key => {
    if (!additionalMoves[key]?.kill) {
      additionalMoves[key] = null
    } else {
      return true
    }
  }).filter(move => move)

  return result.length > 0 ? additionalMoves : null
}

export const getCheckerById = (id, checkers, props = null) => {
  const checker = checkers.find(checker => checker.id === id)
  if (!checker) {
    return null
  }
  return props ? { ...checker, ...props } : checker
}

const getNeighborSquares = (row, square) => {
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
    a: setMove(up, left, movementIds.a),
    b: setMove(up, right, movementIds.b),
    c: setMove(down, right, movementIds.c),
    d: setMove(down, left, movementIds.d)
  }
}

const checkForOpponentNeighbors = (neighborSquares, checkers, activeChecker) => {
  const movesOut = { ...neighborSquares }

  Object.keys(neighborSquares).map(key => {
    const move = neighborSquares[key]
    if (!move) {
      return
    }

    const { row: moveRow, square: moveSquare } = move
    const occupyingChecker = getCheckerFromSquare(moveRow, moveSquare, checkers)
    if (!occupyingChecker) {
      return
    }
    if (occupyingChecker.player === activeChecker.player) {
      movesOut[key] = null
      return
    }
    const { row: occupyingRow, square: occupyingSquare } = occupyingChecker

    const opponentNeighbors = getNeighborSquares(occupyingRow, occupyingSquare)
    const jumpMove = opponentNeighbors[key]
    if (jumpMove === null) {
      movesOut[key] = null
      return
    }
    const { row: jumpRow, square: jumpSquare } = jumpMove

    const occupyingCheckerTwo = getCheckerFromSquare(jumpRow, jumpSquare, checkers)

    const occupyingCheckerId = occupyingChecker.id

    movesOut[key] = occupyingCheckerTwo
      ? null
      : { row: jumpRow, square: jumpSquare, kill: occupyingCheckerId, movementId: key }
  })

  return movesOut
}

const getCheckerFromSquare = (row, square, checkers) => {
  const found = checkers.find(checker => {
    const { row: occupiedRow, square: occupiedSquare } = checker
    return row === occupiedRow && square === occupiedSquare
  })
  return found ? found : null
}

export const getCheckersAfterMove = (move, activeChecker, checkers) => {
  const { row, square, kill } = move
  const updatedChecker = { ...activeChecker, row, square }

  if (checkerShouldBeKinged(activeChecker, row)) {
    updatedChecker.isKing = true
  }

  return checkers
    .map(checker => checker.id === updatedChecker.id ? updatedChecker : checker)
    .filter(checker => kill ? checker.id !== kill : true)
}

const checkerShouldBeKinged = (checker, row) => {
  const { player, isKing } = checker
  return !isKing && ((player === 'a' && row === 0) || (player === 'b' && row === 7))
}

export const playerWon = (player, checkers) => {
  const remainingCheckers = checkers.filter(checker => checker.player !== player).length <= 0
  if (remainingCheckers) {
    return true
  }
  const opponent = player === players.a ? players.b : players.a
  return findCheckersWithPossibleMoves(opponent, checkers).length <= 0
}
