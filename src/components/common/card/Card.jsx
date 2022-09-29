import React from 'react';
import './card.scss'
import Toolbar from '../toolbar/Toolbar'

const renderToolbar = (toolbar) => {
  return toolbar
    ? (<Toolbar>{ toolbar }</Toolbar>)
    : null
}

function Card ({ children, height, width, toolbar }) {
  const setHeight = height || '500px'
  const setWidth = width || '200px'

  return (
    <div
      className="card"
      style={{ height: setHeight, width: setWidth }}>
      { renderToolbar(toolbar) }
      <div className="card__card-text">
        { children }
      </div>
    </div>
  );
}

export default Card;