import React from 'react';
import Select2 from './select2';
import getDataLocal from './get-data-local';
import getDataRemote from './get-data-remote';

function App() {
  return (
    <div>
      <Select2 getData={getDataLocal} />
      <Select2 getData={getDataRemote} />
    </div>
  );
}

export default App;
