import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    console.log('Loaded!!');
  }, []);

  return <div>Testing</div>;
};

export default App;
