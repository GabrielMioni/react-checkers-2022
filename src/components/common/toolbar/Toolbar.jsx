import React from 'react';
import './toolbar.scss'

function Toolbar ({ children }) {
  return (
    <div className="toolbar">
      <div className="toolbar__content">
        { children }
      </div>
    </div>
  );
}

export default Toolbar;