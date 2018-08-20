import React from 'react';
import PropTypes from 'prop-types';
import './main.css';

export default function Select2Container({ children }) {
  return (
    <div className="select2-container">
      {children}
    </div>
  );
}

Select2Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};
