import React, { useEffect } from 'react';
import ButtonRollContainer from '@components/button-roll-section';
import MainControlsContainer from '@components/main-controls';
import './style.scss';

const App = () => {
  useEffect(() => {
    console.log('Loaded!!');
  }, []);

  return (
    <div className="drum-machine-container">
      <MainControlsContainer />
      <ButtonRollContainer />
    </div>
  );
};

export default App;
