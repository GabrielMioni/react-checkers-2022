import * as gameService from '../services/gameService'
import { players } from './players'

export const getBestMove = (checkers) => {
  const results = miniMax(checkers, 4, true)
  const { bestMove } = results
  return bestMove
}

const getCheckersForPlayer = (checkers, player) => {
  return checkers.filter(checker => checker.player === player)
}

const evaluateCheckersTwo = (checkers) => {
  const countA = 12 - getCheckersForPlayer(checkers, players.a).length
  const countB = 12 - getCheckersForPlayer(checkers, players.b).length
  return countA - countB
}

const movesArrayForChecker = (checker, checkers) => {
  const checkerMoveObject = gameService.getAvailableMoves(checker, checkers)
  return Object.keys(checkerMoveObject)
    .map(movementId => {
      const moveObject = checkerMoveObject[movementId]
      return moveObject ? { ...moveObject, movementId, checker } : null
    })
    .filter(move => move)
}

const getAllMovesForCheckers = (checkers, player) => {
  const checkersWithMoves = gameService.findCheckersWithPossibleMoves(player, checkers)
  let moves = []

  checkersWithMoves.forEach(checker => {
    moves = [...moves, ...movesArrayForChecker(checker, checkers)]
  })
  return moves
}

const getCheckersFromMove = (move, checkers) => {
  const { checker: activeChecker } = move
  return gameService.getCheckersAfterMove(move, activeChecker, checkers)
}

const miniMax = (checkers, depth, maximizing) => {
  let score = evaluateCheckersTwo(checkers)
  const player = maximizing ? players.b : players.a
  const moves = getAllMovesForCheckers(checkers, player)

  if (depth <= 0 || moves.length <= 0 || score >= 12) {
    return { bestScore: score }
  }

  let bestScore = maximizing ? -Infinity : +Infinity
  let bestMove = null

  for (const move of moves) {
    let updatedCheckers = getCheckersFromMove(move, checkers)

    const { bestScore: newScore } = miniMax(updatedCheckers, depth -1, !maximizing)

    if (maximizing) {
      if (newScore > bestScore) {
        bestScore = newScore
        bestMove = move
      }
    }

    if (!maximizing) {
      if (newScore < bestScore) {
        bestScore = newScore
        bestMove = move
      }
    }
  }
  return { bestScore, bestMove }
}
