import React from 'react';
import PropTypes from 'prop-types';

export default function DefaultListItemMultiple({
  value,
  name,
  checked,
  onChange,
}) {
  const id = `select2-${value}`;

  return (
    <li className={checked ? 'checked' : ''}>
      <label htmlFor={id}>
        <input id={id} type="checkbox" checked={checked} onChange={() => onChange(value, name)} />
        {name}
      </label>
    </li>
  );
}

DefaultListItemMultiple.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
