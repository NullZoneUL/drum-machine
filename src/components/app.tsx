import React, { useEffect } from 'react';
import './style.scss';

const App = () => {
  useEffect(() => {
    console.log('Loaded!!');
  }, []);

  return <div>Testing</div>;
};

export default App;
