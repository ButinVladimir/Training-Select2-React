import React from 'react';
import { Select2Multiple, Select2Single } from './select2';
import getDataLocal from './get-data-local';
import getDataRemote from './get-data-remote';

function App() {
  return (
    <div>
      <Select2Multiple getData={getDataLocal} onSelect={values => console.log('Multiple values', values)} />
      <Select2Single getData={getDataRemote} onSelect={values => console.log('Single value', values)} />
    </div>
  );
}

export default App;
