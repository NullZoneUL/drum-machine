import React, { useEffect } from 'react';
import ButtonRollContainer from '@/components/button-roll-section';
import './style.scss';

const App = () => {
  useEffect(() => {
    console.log('Loaded!!');
  }, []);

  return (
    <div className="drum-machine-container">
      <ButtonRollContainer />
    </div>
  );
};

export default App;
