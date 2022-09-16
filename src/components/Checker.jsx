import React from 'react';
import '../scss/checker.scss'

function Checker({ checker }) {
  const { row, square } = checker.position

  return (
    <div className={`checker player-${checker.player}`}>
      {`${row},${square}`}
    </div>
  );
}

export default Checker;