import React, { useCallback } from 'react';
import InputFile from '@elements/input-file';
import Translation from '@assets/literals/literals';
import './style.scss';

const InstrumentSelectorContainer = () => {
  const onFileSelected = useCallback((file: File) => {
    console.log('TODO!!', file);
  }, []);

  return (
    <div className="instrument-selector-container">
      <InputFile
        text={Translation.add_instrument}
        accept="audio/mpeg, audio/wav, audio/ogg"
        callback={onFileSelected}
      />
    </div>
  );
};

export default InstrumentSelectorContainer;
