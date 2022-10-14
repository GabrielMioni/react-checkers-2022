import * as gameService from '../services/gameService'
import { players } from './players'

export const getBestMove = (checkers) => {
  const results = miniMax(checkers, 0, 4, true, -Infinity, +Infinity)
  const { bestMove } = results
  return bestMove
}

const getPlayerScore = (checkers, player) => {
  const playerCheckers = checkers.filter(checker => checker.player === player)
  const playerKings = playerCheckers.filter(checker => checker.isKing)
  const playerEdges = playerCheckers.filter(checker => {
    const { square } = checker
    return square <= 0 || square >= 7
  })

  const basicScore = playerCheckers.length * 2
  const kingScore = playerKings.length * 10
  const edgeScore = playerEdges.length * 5

  return basicScore + kingScore + edgeScore
}

export const evaluateCheckers = (checkers, depth) => {
  const playerAWon = gameService.playerWon(players.a, checkers)
  const playerBWon = gameService.playerWon(players.b, checkers)
  if (playerAWon) {
    return -Infinity
  }
  if (playerBWon) {
    return Infinity
  }

  const scoreA = -getPlayerScore(checkers, players.a)
  const scoreB = getPlayerScore(checkers, players.b)

  return (scoreA + scoreB) + (depth * 20)
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
  const player = maximizing ? players.b : players.a
  const moves = getAllMovesForCheckers(checkers, player)

  if (depth >= depthMax || moves.length <= 0 ) {
    let score = evaluateCheckers(checkers, depth)
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

    const { bestScore: newScore } = miniMax(updatedCheckers, depth +1, depthMax, !maximizing, alpha, beta, move)

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
    bestMove = randomMove(allScores, bestScore, maximizing)
  }
  return { bestScore, bestMove }
}

const needsRandomMove = (allScores, maximizing) => {
  const scores = allScores.map(scoreObject => scoreObject.score)
  const max = maximizing
    ? Math.max.apply(Math, scores)
    : Math.min.apply(Math, scores)
  const results = allScores.filter(scoreObject => scoreObject.score === max)

  return results.length > 0
}

const randomMove = (allScoreObjects, bestScore, maximizing) => {
  const filterMethod = maximizing
    ? (scoreObject) => scoreObject.score >= bestScore
    : (scoreObject) => scoreObject.score <= bestScore

  const bestScoringMoves = allScoreObjects.filter(filterMethod)
  const index = Math.floor(Math.random() * bestScoringMoves.length)
  const bestMoveObject = bestScoringMoves[index]
  return bestMoveObject.move
}
