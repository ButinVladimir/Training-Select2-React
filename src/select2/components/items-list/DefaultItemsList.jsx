import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './style.css';

const convertItem = (item, onChange) => ({
  key: item.value,
  value: item.value,
  name: item.name,
  onChange,
});

export default function DefaultItemsList({ selectedValues, items, onChange }) {
  const checkedItems = items
    .filter(item => selectedValues.some(sv => sv === item.value))
    .map(item => (
      <ListItem
        {...convertItem(item, onChange)}
        checked
      />
    ));
  const uncheckedItems = items
    .filter(item => !selectedValues.some(sv => sv === item.value))
    .map(item => (
      <ListItem
        {...convertItem(item, onChange)}
      />
    ));

  const allItems = checkedItems.concat(uncheckedItems);

  return (
    <Fragment>
      {
        allItems.length > 0 && (
        <ul className="select2-item-list">
          {allItems}
        </ul>)
      }
      {
        allItems.length === 0 && (
        <div className="items-not-found">No matching items found</div>)
      }
    </Fragment>
  );
}

DefaultItemsList.propTypes = {
  selectedValues: PropTypes.arrayOf(PropTypes.number).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};
