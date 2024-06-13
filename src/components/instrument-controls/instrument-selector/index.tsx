import React from 'react';
import ButtonText from '@elements/button-text';
import Translation from '@assets/literals/literals';
import './style.scss';

const InstrumentSelectorContainer = () => {
  return (
    <div className="instrument-selector-container">
      <ButtonText
        text={Translation.add_instrument}
        onClick={() => console.log('Todo!!')}
      />
    </div>
  );
};

export default InstrumentSelectorContainer;
