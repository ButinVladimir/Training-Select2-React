import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function DefaultInputTextField({
  searchQuery,
  onChange,
}) {
  return (
    <input className="select2-input-text-field" type="text" value={searchQuery} onChange={onChange} />
  );
}

DefaultInputTextField.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
