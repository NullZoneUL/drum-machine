import React from 'react';
import InstrumentSelectorContainer from './instrument-selector';
import ButtonRollContainer from './button-roll-section';
import InstrumentPagesContainer from './instrument-pages';
import './style.scss';

const InstrumentControlsContainer = () => {
  return (
    <div className="instrument-controls-container">
      <InstrumentSelectorContainer />
      <ButtonRollContainer />
      <InstrumentPagesContainer mainNumPages={4} />
    </div>
  );
};

export default InstrumentControlsContainer;
