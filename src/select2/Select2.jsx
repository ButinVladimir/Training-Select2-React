import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Select2Container from './Select2Container';
import defaultPrepareSelectedText from './helpers/default-prepare-selected-text';
import DefaultSelectedText from './components/selected-text/DefaultSelectedText';
import DefaultPopupMenu from './components/popup-menu/DefaultPopupMenu';
import DefaultInputTextField from './components/input-text-field/DefaultInputTextField';
import DefaultItemsList from './components/items-list/DefaultItemsList';
import SelectedValue from './helpers/selected-value';
import sortFunc from './helpers/sort-func';

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

    this.onClickOutsideContainer = this.onClickOutsideContainer.bind(this);
    this.onClickSelectedText = this.onClickSelectedText.bind(this);
    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    this.onChangeItemSelection = this.onChangeItemSelection.bind(this);

    this.containerRef = createRef();
    this.throttleTimeout = null;
    this.queryId = 0;
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideContainer);
  }

  componentWillUnmount() {
    if (this.throttleTimeout) {
      clearTimeout(this.throttleTimeout);
    }
    window.removeEventListener('click', this.onClickOutsideContainer);
  }

  onClickSelectedText() {
    this.setState({
      showPopupMenu: true,
      searchQuery: '',
      foundItems: this.restoreSelectedItems(),
    });
  }

  async onSearchQueryChange(event) {
    const searchQuery = event.target.value;

    if (this.throttleTimeout) {
      clearTimeout(this.throttleTimeout);
    }
    const newQueryId = Date.now();
    this.queryId = newQueryId;

    if (searchQuery) {
      this.setState({ searchQuery });

      this.throttleTimeout = setTimeout(async () => {
        if (this.queryId === newQueryId) {
          this.setState({ foundItems: await this.getAndSortData(searchQuery) });
        }
      }, 1000);
    } else {
      this.setState({ searchQuery, foundItems: this.restoreSelectedItems() });
    }
  }

  onChangeItemSelection(value, name) {
    const { selectedValues, valueNameMap, foundItems } = this.state;
    const newValueNameMap = new Map(valueNameMap);
    let newSelectedValues;

    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter(v => v !== value);
      newValueNameMap.delete(value);
    } else {
      newSelectedValues = selectedValues.concat(value);
      newValueNameMap.set(value, name);
    }

    const newFoundItems = foundItems.map(fi => (
      fi.value === value
        ? new SelectedValue(fi.name, fi.value, !fi.checked)
        : fi
    ));

    this.setState({
      selectedValues: newSelectedValues,
      valueNameMap: newValueNameMap,
      foundItems: newFoundItems,
    });
  }

  onClickOutsideContainer(event) {
    const { showPopupMenu } = this.state;
    if (showPopupMenu
        && this.containerRef.current
        && !this.containerRef.current.contains(event.target)) {
      this.setState({ showPopupMenu: false });
    }
  }

  async getAndSortData(searchQuery) {
    const { getData } = this.props;
    const { selectedValues } = this.state;

    return (await getData(searchQuery))
      .map(foundItem => new SelectedValue(
        foundItem.name,
        foundItem.value,
        selectedValues.some(sv => sv === foundItem.value),
      ))
      .sort(sortFunc);
  }

  restoreSelectedItems() {
    const { selectedValues, valueNameMap } = this.state;

    return selectedValues
      .map(value => ({ value, name: valueNameMap.get(value), checked: true }))
      .sort(sortFunc);
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
      <Select2Container ref={this.containerRef}>
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
                items={foundItems}
                onChange={this.onChangeItemSelection}
              />
            )}
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
