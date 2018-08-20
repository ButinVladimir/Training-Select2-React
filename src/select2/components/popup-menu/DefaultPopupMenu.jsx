import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function DefaultPopupMenu({
  inputTextField,
  itemsList,
  onBlur,
}) {
  return (
    <div className="select2-popup-menu" onBlur={onBlur}>
      <div className="input-text-container">
        {inputTextField}
      </div>
      <div>
        {itemsList}
      </div>
    </div>
  );
}

DefaultPopupMenu.propTypes = {
  inputTextField: PropTypes.element.isRequired,
  itemsList: PropTypes.element.isRequired,
  onBlur: PropTypes.func.isRequired,
};
