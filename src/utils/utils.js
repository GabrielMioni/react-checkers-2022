export const isOdd = (number) => {
  return !(number % 2 === 0)
}

export const setMove = (directionY, directionX) => {
  return directionY === null || directionX === null
    ? null
    : { row: directionY, square: directionX }
}