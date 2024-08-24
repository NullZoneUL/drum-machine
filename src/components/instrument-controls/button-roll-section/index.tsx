import React, { useMemo, useCallback, useState, useEffect } from 'react';
import ButtonRoll from '@elements/button-roll';
import { TICKS_BY_PAGE } from '@utils/default_values';
import './style.scss';

interface ButtonRollContainerProps {
  selectedPage: number;
  limitTicks: number;
  tick: number;
  instruments: Instrument[];
  selectedInstrument: number;
}

const ButtonRollContainer = ({
  selectedPage,
  limitTicks,
  tick,
  instruments,
  selectedInstrument,
}: ButtonRollContainerProps) => {
  //TODO!!! Implement tests...
  const [pageTicks, setPageTicks] = useState<Array<boolean>>();

  const onButtonRollClicked = useCallback(
    (index: number) => {
      const newValue = instruments[
        selectedInstrument
      ]?.manager.updateTickPosition(index + (selectedPage - 1) * TICKS_BY_PAGE);
      newValue !== null &&
        setPageTicks(pageTicks => {
          const newPageTicks = [...pageTicks];
          newPageTicks[index] = newValue;
          return newPageTicks;
        });
    },
    [selectedInstrument, instruments, selectedPage],
  );

  const setNewPageTicks = useCallback(() => {
    const pageTicks_ =
      instruments[selectedInstrument]?.manager.getGeneralTicksPage(
        selectedPage,
      );
    pageTicks_ && setPageTicks(pageTicks_);
  }, [selectedPage, instruments, selectedInstrument]);

  const firstPageTick = useMemo(() => {
    return (selectedPage - 1) * TICKS_BY_PAGE;
  }, [selectedPage]);

  useEffect(() => {
    setNewPageTicks();
  }, [selectedPage, instruments, selectedInstrument]);

  return (
    <div className="buttons-roll-container">
      {instruments.length === 0 || !pageTicks
        ? [...Array(TICKS_BY_PAGE)].map((x, i) => (
            <ButtonRoll
              number={i + 1}
              key={`BUTTON_ROLL_${i}`}
              selected={false}
              playing={tick === firstPageTick + i}
              onClick={onButtonRollClicked}
              disabled={limitTicks < firstPageTick + i}
            />
          ))
        : pageTicks.map((x, i) => (
            <ButtonRoll
              number={i + 1}
              key={`BUTTON_ROLL_${i}`}
              selected={x}
              playing={tick === firstPageTick + i}
              onClick={onButtonRollClicked}
              disabled={limitTicks < firstPageTick + i}
            />
          ))}
    </div>
  );
};

export default ButtonRollContainer;
