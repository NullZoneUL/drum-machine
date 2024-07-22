import React, { useId } from 'react';
import './style.scss';

//TODO!!! Add tests
interface LightDotIndicatorContainerProps {
  numLights: number;
  selectedPage: number;
  maxNumPages: number;
}

const LightDotIndicatorContainer = ({
  numLights,
  selectedPage,
  maxNumPages,
}: LightDotIndicatorContainerProps) => {
  const id = useId();

  return (
    <div className="light-dot-container">
      {[...Array(numLights)].map((x, i) => (
        <div
          key={`DM_LIGHT_DOT_${id}_${i}`}
          className={`light-dot-item ${selectedPage === i + 1 ? 'light-dot-item-selected' : i >= maxNumPages ? 'light-dot-item-disabled' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default LightDotIndicatorContainer;
