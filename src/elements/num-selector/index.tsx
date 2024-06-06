import React, { useEffect, useRef, useState } from 'react';
import Arrow from '@assets/images/arrow.webp';

interface DMNumSelectorProps {
  onChange: (value: number) => void;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
}

const START_MOUSE_DOWN_TIMEOUT = 500;
const MOUSE_DOWN_TIMEOUT = 75;

const NumSelector = ({
  onChange,
  defaultValue,
  minValue,
  maxValue,
}: DMNumSelectorProps) => {
  const [value, setValue] = useState(defaultValue);
  const changeValueTimeout = useRef<number>();

  //mode = true -> value++ ||| mode = false -> value--
  const setNewValue = (mode: boolean) => {
    setValue(value => (mode ? value + 1 : value - 1));
  };

  const mouseDownStart = (mode: boolean) => {
    clearChangeValueTimeout();
    changeValueTimeout.current = window.setTimeout(() => {
      mouseDown(mode);
    }, START_MOUSE_DOWN_TIMEOUT);
  };

  const mouseDown = (mode: boolean) => {
    clearChangeValueTimeout();
    changeValueTimeout.current = window.setTimeout(() => {
      setNewValue(mode);
      mouseDown(mode);
    }, MOUSE_DOWN_TIMEOUT);
  };

  const clearChangeValueTimeout = () => {
    window.clearTimeout(changeValueTimeout.current);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    return () => {
      clearChangeValueTimeout();
    };
  }, []);

  return (
    <div className="num-selector">
      <div className="num-selector-value">
        <span>{value}</span>
      </div>
      <div className="num-selector-actions">
        <button
          onMouseDown={() => mouseDownStart(true)}
          onMouseUp={clearChangeValueTimeout}
          onClick={() => setNewValue(true)}
        >
          <img src={Arrow} />
        </button>
        <button
          onMouseDown={() => mouseDownStart(false)}
          onMouseUp={clearChangeValueTimeout}
          onClick={() => setNewValue(false)}
        >
          <img src={Arrow} />
        </button>
      </div>
    </div>
  );
};

export default NumSelector;
