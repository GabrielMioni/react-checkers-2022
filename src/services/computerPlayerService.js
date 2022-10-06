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
      // const score = minimax(move, checker, checkers, true, 5)
      const score = minimaxTwo(move, checkers, true, 4)
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

const minimaxTwo = (move, checkers, maximizing, depth) => {

  // console.log(JSON.stringify(checkers, null, 2))
  // console.log({
  //   move,
  //   maximizing,
  //   depth
  // })
  let score = move.kill ? 10 : -Infinity
  // console.log(score)

  const currentPlayer = maximizing ? players.b : players.a
  const playerWon = gameService.playerWon(currentPlayer, checkers)

  if (playerWon) {
    score = score + 1000
  }

  console.log({ score1: score })
  if (depth <= 0 || playerWon) {
    // console.log({ score })
    return score
  }

  const activeChecker = gameService.getCheckerById(move.checkerId, checkers)
  const updatedCheckers = gameService.getCheckersAfterMove(move, activeChecker, checkers)

  // Switch players
  // const opponentPlayer = maximizing ? players.a : players.b
  const opponentPlayer = currentPlayer === players.a ? players.b : players.a
  const opponentCheckersWithMoves = gameService.findCheckersWithPossibleMoves(opponentPlayer, updatedCheckers)

  opponentCheckersWithMoves.forEach(checker => {
    // console.log(JSON.stringify(checker, null, 2))
    const checkerMoves = movesArrayForChecker(checker, checkers)

    checkerMoves.forEach(move => {
      const opponentActiveChecker = gameService.getCheckerById(move.checkerId, updatedCheckers)
      const opponentUpdatedCheckers = gameService.getCheckersAfterMove(move, opponentActiveChecker, updatedCheckers)

      // console.log(move)
      const currentDepth = depth -1
      console.log({ currentDepth })
      const opponentScore = minimaxTwo(move, opponentUpdatedCheckers, !maximizing, depth -1)
      console.log({ opponentScore, depth })
      score = score - opponentScore
      // console.log(score)
    })
  })

  console.log({ score2: score })
  return score
}