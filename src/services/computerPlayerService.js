import * as gameService from '../services/gameService'

class computerPlayerService {
  player = null
  checkers = null
  depth = 0

  constructor (player, checkers, depth = 4) {
    this.player = player
    this.checkers = checkers
    this.depth = depth
  }
  
  getBestMove () {
    this.playGame(this.player, this.checkers)
  }

  playGame (player, checkers, isMaximizing = true) {
    const checkersWithPossibleMoves = gameService.findCheckersWithPossibleMoves(player, checkers)
    const leafs = {}
    /*
     const leaf = {
       score: 0,
       checkerId: null,
       row: 0,
       square: 0
     }
     */

    checkersWithPossibleMoves.map(checker => {
      const availableMoves = gameService.getAvailableMoves(checker, checkers)
      
      const moves = Object.keys(availableMoves)
        .map(key => {
          const currentMove = availableMoves[key]
          return currentMove ? { ...currentMove, checker: checker } : null
        })
        .filter(move => move)

      console.log(JSON.stringify(moves, null, 2))

      moves.map(move => {
        const activeChecker = move.checker
        const activeCheckerId = activeChecker.id
        const moveKill = move.kill

        const leafKey = `${activeCheckerId}-${move.movementId}`

        if (!leafs[leafKey]) {
          leafs[leafKey] = moveKill ? 10 : 0
        } else if (moveKill) {
          const score = leafs[leafKey]
          leafs[leafKey] = score + 10
        }

        const updatedCheckers = gameService.getCheckersAfterMove(move, activeChecker, checkers)
      })
      console.log(leafs)
    })
  }
}

export default computerPlayerService