import * as gameService from '../services/gameService'
import { players } from './players'

const movesArrayForChecker = (checker, checkers) => {
  const checkerMoveObject = gameService.getAvailableMoves(checker, checkers)
  return Object.keys(checkerMoveObject)
    .map(movementId => {
      const moveObject = checkerMoveObject[movementId]
      return moveObject ? { ...moveObject, checkerId: checker.id, movementId } : null
    })
    .filter(move => move)
}

const findBestScore = (arrayData) => {
  const topScore = Math.max(...arrayData.map(data => data.score))
  const results = arrayData.filter(data => data.score === topScore)

  return results
    ? null
    : results.length > 1
      ? null
      : results[0]
}

export const getBestMove = (checkers, player) => {
  const results = []

  const checkersWithPossibleMoves = gameService.findCheckersWithPossibleMoves(player, checkers)
  checkersWithPossibleMoves.map(checker => {
    const checkerMoves = movesArrayForChecker(checker, checkers)

    checkerMoves.map(move => {
      const { row, square, movementId } = move
      const score = minimax(move, checkers, true, 4)
      results.push({
        checkerId: checker.id,
        row,
        square,
        score,
        movementId
      })
    })
  })

  const bestScore = findBestScore(results)

  return bestScore ? bestScore : results[0]
}

const minimax = (move, checkers, maximizing, depth) => {
  let score = move.kill ? 10 : -Infinity

  const currentPlayer = maximizing ? players.b : players.a
  const playerWon = gameService.playerWon(currentPlayer, checkers)

  if (playerWon) {
    score = score + 1000
  }

  if (depth <= 0 || playerWon) {
    return score
  }

  const activeChecker = gameService.getCheckerById(move.checkerId, checkers)
  const updatedCheckers = gameService.getCheckersAfterMove(move, activeChecker, checkers)

  // Switch players
  const opponentPlayer = currentPlayer === players.a ? players.b : players.a
  const opponentCheckersWithMoves = gameService.findCheckersWithPossibleMoves(opponentPlayer, updatedCheckers)

  opponentCheckersWithMoves.forEach(checker => {
    const checkerMoves = movesArrayForChecker(checker, checkers)

    checkerMoves.forEach(move => {
      const opponentActiveChecker = gameService.getCheckerById(move.checkerId, updatedCheckers)
      const opponentUpdatedCheckers = gameService.getCheckersAfterMove(move, opponentActiveChecker, updatedCheckers)
      const opponentScore = minimax(move, opponentUpdatedCheckers, !maximizing, depth -1)
      score = score - opponentScore
    })
  })

  return score
}
