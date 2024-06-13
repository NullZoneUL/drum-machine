import React, { useCallback, useContext, useEffect } from 'react';
import InputFile from '@elements/input-file';
import Translation from '@assets/literals/literals';
import { InstrumentsContext } from '@components/app';
import './style.scss';

const InstrumentSelectorContainer = () => {
  const instruments = useContext(InstrumentsContext);

  const onFileSelected = useCallback((file: File) => {
    instruments.addInstrument(file);
  }, []);

  useEffect(() => {
    console.log(instruments.instruments);
  }, [instruments]);

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
