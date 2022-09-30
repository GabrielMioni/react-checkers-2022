export const isOdd = (number) => {
  return !(number % 2 === 0)
}

export const setMove = (directionY, directionX, movementId) => {
  return directionY === null || directionX === null
    ? null
    : { row: directionY, square: directionX, kill: null, movementId }
}

export const findCheckerByRowSquare = (checkerRow, checkerSquare, allCheckers) => {
  return allCheckers.find(c => {
    const { row, square } = c
    return row === checkerRow && square === checkerSquare
  })
}