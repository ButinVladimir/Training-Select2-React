import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select2Container from './Select2Container';
import defaultPrepareSelectedText from './default-prepare-selected-text';
import DefaultSelectedText from './components/selected-text/DefaultSelectedText';
import DefaultPopupMenu from './components/popup-menu/DefaultPopupMenu';
import DefaultInputTextField from './components/input-text-field/DefaultInputTextField';
import DefaultItemsList from './components/items-list/DefaultItemsList';

export default class Select2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopupMenu: false,
      searchQuery: '',
      foundItems: [],
      selectedValues: [],
      valueNameMap: new Map(),
    };

    this.onClickSelectedText = this.onClickSelectedText.bind(this);
    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    this.onChangeItemSelection = this.onChangeItemSelection.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onClickSelectedText() {
    this.setState({
      showPopupMenu: true,
      searchQuery: '',
      foundItems: this.restoreSelectedItems(),
    });
  }

  async onSearchQueryChange(event) {
    const { getData } = this.props;
    const searchQuery = event.target.value;

    const foundItems = searchQuery ? await getData(searchQuery) : this.restoreSelectedItems();
    this.setState({
      searchQuery,
      foundItems,
    });
  }

  onChangeItemSelection(value, name) {
    const { selectedValues, valueNameMap } = this.state;
    const newValueNameMap = new Map(valueNameMap);
    let newSelectedValues;

    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter(v => v !== value);
      newValueNameMap.delete(value);
    } else {
      newSelectedValues = selectedValues.concat(value);
      newValueNameMap.set(value, name);
    }

    this.setState({ selectedValues: newSelectedValues, valueNameMap: newValueNameMap });
  }

  onBlur() {
    this.setState({ showPopupMenu: false });
  }

  restoreSelectedItems() {
    const { selectedValues, valueNameMap } = this.state;

    return selectedValues.map(value => ({ value, name: valueNameMap.get(value) }));
  }

  render() {
    const {
      prepareSelectedText,
      selectedText: SelectedText,
      popupMenu: PopupMenu,
      inputTextField: InputTextField,
      itemsList: ItemsList,
    } = this.props;
    const {
      showPopupMenu,
      searchQuery,
      foundItems,
      selectedValues,
      valueNameMap,
    } = this.state;

    const selectedText = prepareSelectedText(selectedValues, valueNameMap);

    return (
      <Select2Container>
        <SelectedText value={selectedText} onClick={this.onClickSelectedText} />
        {showPopupMenu
          && (
          <PopupMenu
            inputTextField={(
              <InputTextField
                searchQuery={searchQuery}
                onChange={this.onSearchQueryChange}
              />
            )}
            itemsList={(
              <ItemsList
                selectedValues={selectedValues}
                items={foundItems}
                onChange={this.onChangeItemSelection}
              />
            )}
            onBlur={this.onBlur}
          />)}
      </Select2Container>
    );
  }
}

Select2.propTypes = {
  getData: PropTypes.func.isRequired,
  prepareSelectedText: PropTypes.func,
  selectedText: PropTypes.func,
  popupMenu: PropTypes.func,
  inputTextField: PropTypes.func,
  itemsList: PropTypes.func,
};

Select2.defaultProps = {
  prepareSelectedText: defaultPrepareSelectedText,
  selectedText: DefaultSelectedText,
  popupMenu: DefaultPopupMenu,
  inputTextField: DefaultInputTextField,
  itemsList: DefaultItemsList,
};
