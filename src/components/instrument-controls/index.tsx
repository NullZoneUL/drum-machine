import React from 'react';
import InstrumentSelectorContainer from './instrument-selector';
import ButtonRollContainer from './button-roll-section';
import './style.scss';

const InstrumentControlsContainer = () => {
  return (
    <div className="instrument-controls-container">
      <InstrumentSelectorContainer />
      <ButtonRollContainer />
    </div>
  );
};

export default InstrumentControlsContainer;
