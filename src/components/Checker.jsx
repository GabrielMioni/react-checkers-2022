import React from 'react';
import '../scss/checker.scss'

function Checker ({ checker }) {
  const { row, square } = checker

  return (
    <div className={`checker player-${checker.player}`}>
      <div className="checker__piece">
        {`${row},${square}`}
      </div>
    </div>
  );
}

export default Checker;