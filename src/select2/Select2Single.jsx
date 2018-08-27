import React from 'react';
import PropTypes from 'prop-types';
import Select2Main from './Select2Main';
import DefaultSelectedText from './components/selected-text/DefaultSelectedText';
import DefaultPopupMenu from './components/popup-menu/DefaultPopupMenu';
import DefaultInputTextField from './components/input-text-field/DefaultInputTextField';
import DefaultItemsList from './components/items-list/DefaultItemsList';
import DefaultListItemSingle from './components/items-list/DefaultListItemSingle';
import defaultPrepareSelectedText from './helpers/default-prepare-selected-text';
import performSelectionSingle from './helpers/perform-selection-single';

export default function Select2Single(props) {
  return (
    <Select2Main
      {...props}
      performSelection={performSelectionSingle}
    />
  );
}

Select2Single.propTypes = {
  onSelect: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  prepareSelectedText: PropTypes.func,
  SelectedText: PropTypes.func,
  PopupMenu: PropTypes.func,
  InputTextField: PropTypes.func,
  ItemsList: PropTypes.func,
  ListItem: PropTypes.func,
};

Select2Single.defaultProps = {
  prepareSelectedText: defaultPrepareSelectedText,
  SelectedText: DefaultSelectedText,
  PopupMenu: DefaultPopupMenu,
  InputTextField: DefaultInputTextField,
  ItemsList: DefaultItemsList,
  ListItem: DefaultListItemSingle,
};
