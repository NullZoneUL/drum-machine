import React, { useEffect } from 'react';
import MainControlsContainer from '@components/main-controls';
import InstrumentControlsContainer from '@components/instrument-controls';
import './style.scss';

const App = () => {
  useEffect(() => {
    console.log('Loaded!!');
  }, []);

  return (
    <div className="drum-machine-container">
      <MainControlsContainer />
      <InstrumentControlsContainer />
    </div>
  );
};

export default App;
