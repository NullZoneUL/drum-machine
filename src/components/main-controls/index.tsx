import React from 'react';
import NumSelector from '@elements/num-selector';
import './style.scss';

const MainControlsContainer = () => {
  return (
    <div className="main-controls-container">
      <NumSelector
        defaultValue={120}
        minValue={1}
        maxValue={300}
        onChange={value => console.log(value)}
        className="main-timer"
      />
    </div>
  );
};

export default MainControlsContainer;
