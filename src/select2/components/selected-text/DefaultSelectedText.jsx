import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function DefaultSelectedText({
  value,
  onClick,
}) {
  return (
    <input type="text" className="select2-selected-text" readOnly value={value} onClick={onClick} />
  );
}

DefaultSelectedText.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
