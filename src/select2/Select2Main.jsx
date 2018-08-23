import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Select2Container from './Select2Container';
import ListItemValue from './helpers/list-item-value';
import sortFunc from './helpers/sort-func';

export default class Select2Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopupMenu: false,
      searchQuery: '',
      foundItems: [],
      selectedValues: [],
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
    const { performSelection, onSelect } = this.props;
    const { selectedValues, foundItems } = this.state;

    const {
      newSelectedValues,
      newFoundItems,
    } = performSelection(value, name, selectedValues, foundItems);
    onSelect(newSelectedValues.map(nsv => nsv.value));

    this.setState({
      selectedValues: newSelectedValues,
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
      .map(foundItem => new ListItemValue(
        foundItem.name,
        foundItem.value,
        selectedValues.some(sv => sv.value === foundItem.value),
      ))
      .sort(sortFunc);
  }

  restoreSelectedItems() {
    const { selectedValues } = this.state;

    return selectedValues.concat().sort(sortFunc);
  }

  render() {
    const {
      prepareSelectedText,
      selectedText: SelectedText,
      popupMenu: PopupMenu,
      inputTextField: InputTextField,
      itemsList: ItemsList,
      listItem,
    } = this.props;
    const {
      showPopupMenu,
      searchQuery,
      foundItems,
      selectedValues,
    } = this.state;

    const selectedText = prepareSelectedText(selectedValues);

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
                listItem={listItem}
                items={foundItems}
                onChange={this.onChangeItemSelection}
              />
            )}
          />)}
      </Select2Container>
    );
  }
}

Select2Main.propTypes = {
  onSelect: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  prepareSelectedText: PropTypes.func.isRequired,
  performSelection: PropTypes.func.isRequired,
  selectedText: PropTypes.func.isRequired,
  popupMenu: PropTypes.func.isRequired,
  inputTextField: PropTypes.func.isRequired,
  itemsList: PropTypes.func.isRequired,
  listItem: PropTypes.func.isRequired,
};
