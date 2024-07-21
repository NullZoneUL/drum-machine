import React, { useId } from 'react';
import './style.scss';

//TODO!!! Add dots behavior getting current position, selected position, play status and bpm speed
//TODO!!! Add tests
interface LightDotIndicatorContainerProps {
  numLights: number;
}

const LightDotIndicatorContainer = ({
  numLights,
}: LightDotIndicatorContainerProps) => {
  const id = useId();

  return (
    <div className="light-dot-container">
      {[...Array(numLights)].map((x, i) => (
        <div key={`DM_LIGHT_DOT_${id}_${i}`} className="light-dot-item"></div>
      ))}
    </div>
  );
};

export default LightDotIndicatorContainer;
