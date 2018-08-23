import React from 'react';
import PropTypes from 'prop-types';
import Select2Main from './Select2Main';
import DefaultSelectedText from './components/selected-text/DefaultSelectedText';
import DefaultPopupMenu from './components/popup-menu/DefaultPopupMenu';
import DefaultInputTextField from './components/input-text-field/DefaultInputTextField';
import DefaultItemsList from './components/items-list/DefaultItemsList';
import DefaultListItemMultiple from './components/items-list/DefaultListItemMultiple';
import defaultPrepareSelectedText from './helpers/default-prepare-selected-text';
import performSelectionMultiple from './helpers/perform-selection-multiple';

export default function Select2Multiple(props) {
  return (
    <Select2Main
      {...props}
      performSelection={performSelectionMultiple}
    />
  );
}

Select2Multiple.propTypes = {
  onSelect: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  prepareSelectedText: PropTypes.func,
  selectedText: PropTypes.func,
  popupMenu: PropTypes.func,
  inputTextField: PropTypes.func,
  itemsList: PropTypes.func,
  listItem: PropTypes.func,
};

Select2Multiple.defaultProps = {
  prepareSelectedText: defaultPrepareSelectedText,
  selectedText: DefaultSelectedText,
  popupMenu: DefaultPopupMenu,
  inputTextField: DefaultInputTextField,
  itemsList: DefaultItemsList,
  listItem: DefaultListItemMultiple,
};
