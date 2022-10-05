import * as gameService from '../services/gameService'
import { players } from './players'
import checker from '../components/Checker'

const movesArrayForChecker = (checker, checkers) => {
  const checkerMoveObject = gameService.getAvailableMoves(checker, checkers)
  return Object.keys(checkerMoveObject)
    .map(movementId => {
      const moveObject = checkerMoveObject[movementId]
      return moveObject ? { ...moveObject, checkerId: checker.id } : null
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

    // console.log(JSON.stringify(checker, null, 2))
    // console.log(JSON.stringify(checkerMoves, null, 2))

    checkerMoves.map(move => {
      const { row, square } = move
      const score = minimax(move, checker, checkers, true, 5)
      results.push({
        checkerId: checker.id,
        row,
        square,
        score
      })
    })
  })

  console.log(results)
  const bestScore = findBestScore(results)

  return bestScore ? bestScore : results[0]
}

const minimax = (move, checker, checkers, maximizing, depth) => {
  let score = -Infinity
  if (move.kill) {
    score = score + 10
  }

  if (depth > 0) {
    const updatedCheckers = gameService.getCheckersAfterMove(move, checker, checkers)
    const checkerMoves = movesArrayForChecker(checker, checkers)

    console.log(JSON.stringify(checkers, null, 2))
    console.log(JSON.stringify(updatedCheckers, null, 2))

    checkerMoves.map(move => {
      const activeChecker = gameService.getCheckerById(move.checkerId, updatedCheckers)
      const newScore = minimax(move, activeChecker, updatedCheckers, !maximizing, depth -1)
      if (newScore > score) {
        score = score + newScore
      }
    })
  }

  return maximizing ? score : score - (score * 2)
}