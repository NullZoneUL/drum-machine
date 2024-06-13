import React, { useCallback, useContext } from 'react';
import InputFile from '@elements/input-file';
import Translation from '@assets/literals/literals';
import DMSelect from '@elements/select';
import { noItemsList } from '@/utils/default_values';
import { InstrumentsContext } from '@components/app';
import './style.scss';

const INSTRUMENT_LIST = 'INSTRUMENT_LIST';

const InstrumentSelectorContainer = () => {
  const instruments = useContext(InstrumentsContext);

  const onFileSelected = useCallback((file: File) => {
    instruments.addInstrument(file);
  }, []);

  return (
    <div className="instrument-selector-container">
      <InputFile
        text={Translation.add_instrument}
        accept="audio/mpeg, audio/wav, audio/ogg"
        callback={onFileSelected}
      />
      <DMSelect
        id={INSTRUMENT_LIST}
        items={
          instruments.instruments.length > 0
            ? instruments.instruments.map(item => {
                return {
                  name: item.name,
                };
              })
            : noItemsList
        }
        onChange={(index: number) =>
          console.log(`TODO!!! Selected index: ${index}`)
        }
      />
    </div>
  );
};

export default InstrumentSelectorContainer;
