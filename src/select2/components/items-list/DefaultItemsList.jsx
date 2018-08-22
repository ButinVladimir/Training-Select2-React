import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './style.css';

const convertItem = (item, onChange) => ({
  key: item.value,
  value: item.value,
  name: item.name,
  checked: item.checked,
  onChange,
});

export default function DefaultItemsList({
  items,
  onChange,
}) {
  const convertedItems = items
    .map(item => (
      <ListItem
        {...convertItem(item, onChange)}
      />
    ));

  return (
    <Fragment>
      {
        convertedItems.length > 0 && (
        <ul className="select2-item-list">
          {convertedItems}
        </ul>)
      }
      {
        convertedItems.length === 0 && (
        <div className="items-not-found">No matching items found</div>)
      }
    </Fragment>
  );
}

DefaultItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};
