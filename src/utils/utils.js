export const isOdd = (number) => {
  return !(number % 2 === 0)
}

export const setMove = (directionY, directionX) => {
  return directionY === null || directionX === null
    ? null
    : { row: directionY, square: directionX }
}

export const findCheckerByRowSquare = (checkerRow, checkerSquare, allCheckers) => {
  return allCheckers.find(c => {
    const { row, square } = c.position
    return row === checkerRow && square === checkerSquare
  })
}