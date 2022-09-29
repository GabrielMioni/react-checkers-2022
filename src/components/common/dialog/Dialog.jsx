import React from 'react';
import './dialog.scss'

function Dialog ({ children }) {
  return (
    <div className="dialog">
      { children }
    </div>
  );
}

export default Dialog;