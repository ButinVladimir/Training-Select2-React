import React from 'react';
import PropTypes from 'prop-types';

export default function ListItem({
  value,
  name,
  checked,
  onChange,
}) {
  const id = `select2-${value}`;

  return (
    <li>
      <label htmlFor={id}>
        <input id={id} type="checkbox" checked={checked} onChange={() => onChange(value, name)} />
        {name}
      </label>
    </li>
  );
}

ListItem.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
