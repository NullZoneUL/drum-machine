import React, { useCallback, useContext, useMemo, useState } from 'react';
import InputFile from '@elements/input-file';
import Translation from '@assets/literals/literals';
import DMSelect from '@elements/select';
import ButtonText from '@elements/button-text';
import { noItemsList } from '@/utils/default_values';
import { InstrumentsContext } from '@components/app';
import './style.scss';

const INSTRUMENT_LIST = 'INSTRUMENT_LIST';

const InstrumentSelectorContainer = () => {
  const instruments = useContext(InstrumentsContext);
  const [selectedInstrument, setSelectedInstrument] = useState(0);

  const onFileSelected = useCallback((file: File) => {
    instruments.addInstrument(file);
  }, []);

  const onDeleteInstrument = useCallback((index: number) => {
    instruments.deleteInstrument(index);
  }, []);

  const instrumentList = useMemo(() => {
    return instruments.instruments.length > 0
      ? {
          itemValues: instruments.instruments.map(item => {
            const nameLastDot = item.name.lastIndexOf('.');
            return item.name.substring(0, nameLastDot);
          }),
        }
      : noItemsList;
  }, [instruments]);

  return (
    <div className="instrument-selector-container">
      <InputFile
        text={Translation.add}
        accept="audio/mpeg, audio/wav, audio/ogg, audio/mp4, audio/aac, audio/aacp, audio/webm, audio/flac"
        callback={onFileSelected}
        className="instrument-selector-add"
      />
      <ButtonText
        text={Translation.delete}
        callback={() => onDeleteInstrument(selectedInstrument)}
      />
      <DMSelect
        id={INSTRUMENT_LIST}
        items={instrumentList}
        onChange={(index: number) => setSelectedInstrument(index)}
      />
    </div>
  );
};

export default InstrumentSelectorContainer;
