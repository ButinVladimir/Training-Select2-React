import React from 'react';
import PropTypes from 'prop-types';

export default function DefaultListItemSingle({
  value,
  name,
  checked,
  onChange,
}) {
  return (
    <li className={checked ? 'checked' : ''}>
      <button type="button" onClick={() => onChange(value, name)}>
        {name}
      </button>
    </li>
  );
}

DefaultListItemSingle.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
