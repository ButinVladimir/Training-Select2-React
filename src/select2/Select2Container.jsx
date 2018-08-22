import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './main.css';

const Select2Container = forwardRef(({ children }, ref) => (
  <div ref={ref} className="select2-container">
    {children}
  </div>
));

Select2Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Select2Container;
