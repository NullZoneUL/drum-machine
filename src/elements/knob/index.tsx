import React, { useEffect, useRef } from 'react';
import knob from '@assets/images/knob.webp';
import './style.scss';

interface DMKnobProps {
  size: number;
  onChange: (value: number) => void;
  defaultValue?: number;
  min?: number;
  max?: number;
  title?: string;
}

const DMKnob = ({
  size,
  onChange,
  defaultValue,
  min,
  max,
  title,
}: DMKnobProps) => {
  const knobRef = useRef<HTMLInputElement>();

  useEffect(() => {
    knobRef.current.addEventListener('input', event => {
      onChange(parseInt(event.target.value));
    });
  }, []);

  return (
    <div className="dm-input-knob">
      <input
        type="range"
        className="input-knob"
        ref={knobRef}
        data-diameter={size}
        defaultValue={defaultValue}
        min={min}
        max={max}
        data-spites="- 1"
        data-src={knob}
      />
      {title && <p>{title}</p>}
    </div>
  );
};

export default DMKnob;
