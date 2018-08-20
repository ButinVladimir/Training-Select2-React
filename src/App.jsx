import React from 'react';
import Select2 from './select2';
import getData from './data';

function App() {
  return (
    <div><Select2 getData={getData} /></div>
  );
}

export default App;
