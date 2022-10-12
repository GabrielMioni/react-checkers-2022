import * as gameService from '../services/gameService'
import { players } from './players'

export const getBestMove = (checkers) => {
  const results = miniMax(checkers, 0, 4, true, -Infinity, +Infinity)
  const { bestMove } = results
  return bestMove
}

const getCheckersForPlayer = (checkers, player) => {
  return checkers.filter(checker => checker.player === player)
}

const evaluateCheckersTwo = (checkers, depth) => {
  const teamA = getCheckersForPlayer(checkers, players.a)
  const teamB = getCheckersForPlayer(checkers, players.b)

  const pointsA = 12 - teamA.length
  const pointsB = 12 - teamB.length

  const foundKingsA = teamA.filter(checker => checker.isKing)
  const kingsACount = foundKingsA ? foundKingsA.length : 0

  const basicScore = (pointsA - pointsB) - depth
  const kingScore = kingsACount * 5

  return basicScore - kingScore
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

const additionalJumpsToArray = (additionalJumps, checker) => {
  return Object.keys(additionalJumps).map(movementId => {
    const jumpMove = additionalJumps[movementId]
    
    return jumpMove ? { ...jumpMove, movementId, checker } : null
  }).filter(move => move)
}

const miniMax = (checkers, depth, depthMax, maximizing, alpha, beta) => {
  let score = evaluateCheckersTwo(checkers, depth)
  const player = maximizing ? players.b : players.a
  const moves = getAllMovesForCheckers(checkers, player)

  if (depth >= depthMax || moves.length <= 0 || score >= 12) {
    return { bestScore: score }
  }

  let bestScore = maximizing ? -Infinity : +Infinity
  let bestMove = null

  const allScores = []

  for (const move of moves) {
    let updatedCheckers = getCheckersFromMove(move, checkers)
    let doubleJumps = gameService.additionalJumps(move, updatedCheckers)

    if (doubleJumps) {
      while (doubleJumps) {
        const { row, square } = move
        const { checker } = move
        const activeChecker = gameService.getCheckerById(checker.id, updatedCheckers, { row, square })
        const jumpArray = additionalJumpsToArray(doubleJumps, activeChecker)
        const naiveJumpMove = jumpArray[0]
        updatedCheckers = getCheckersFromMove(naiveJumpMove, updatedCheckers)
        doubleJumps = gameService.additionalJumps(naiveJumpMove, updatedCheckers)
      }
    }

    const { bestScore: newScore } = miniMax(updatedCheckers, depth +1, depthMax, !maximizing, alpha, beta)

    allScores.push({ score: newScore, move } )

    const maximizerWins = maximizing && (newScore > bestScore)
    const minimizerWins = !maximizing && (newScore < bestScore)

    if (maximizerWins || minimizerWins) {
      bestScore = newScore
      bestMove = move
    }

    if (maximizing) {
      alpha = Math.max(alpha, bestScore)
    } else {
      beta = Math.min(beta, bestScore)
    }

    if (beta <= alpha) {
      break
    }
  }
  const shouldRandomMove = needsRandomMove(allScores)
  if (shouldRandomMove) {
    bestMove = randomMove(moves)
  }
  return { bestScore, bestMove }
}

const needsRandomMove = (allScores) => {
  const scores = allScores.map(scoreObject => scoreObject.score)
  const max = Math.max.apply(Math, scores)
  const results = allScores.filter(score => score === max)
  return results.length > 0
}

const randomMove = (allScores, bestScore) => {
  const bestScoringMoves = allScores.filter(scoreObject => scoreObject.score >= bestScore)
  const index = Math.floor(Math.random() * bestScoringMoves.length)
  return bestScoringMoves[index]
}
