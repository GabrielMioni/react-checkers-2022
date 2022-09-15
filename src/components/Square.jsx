import React from 'react';
import '../scss/square.scss'
import { isOdd } from '../utils/utils'

function Square({ rowIndex, squareIndex }) {

  const colorA = 'color-a'
  const colorB = 'color-b'

  const colorClass = () => {
    const rowIndexIsOdd = isOdd(rowIndex)
    const squareIndexIsOdd = isOdd(squareIndex)

    return rowIndexIsOdd
      ? squareIndexIsOdd
        ? colorA
        : colorB
      : squareIndexIsOdd
        ? colorB
        : colorA
  }

  return (
    <div className={`square ${colorClass()}`}>
      {`${rowIndex},${squareIndex}`}
    </div>
  );
}

export default Square;