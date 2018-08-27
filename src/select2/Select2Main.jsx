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
      selectedItems: [],
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
    const { selectedItems, foundItems } = this.state;

    const {
      newSelectedItems,
      newFoundItems,
    } = performSelection(value, name, selectedItems, foundItems);
    onSelect(newSelectedItems.map(nsv => nsv.value));

    this.setState({
      selectedItems: newSelectedItems,
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
    const { selectedItems } = this.state;

    return (await getData(searchQuery))
      .map(foundItem => new ListItemValue(
        foundItem.name,
        foundItem.value,
        selectedItems.some(sv => sv.value === foundItem.value),
      ))
      .sort(sortFunc);
  }

  restoreSelectedItems() {
    const { selectedItems } = this.state;

    return selectedItems.concat().sort(sortFunc);
  }

  render() {
    const {
      prepareSelectedText,
      SelectedText,
      PopupMenu,
      InputTextField,
      ItemsList,
      ListItem,
    } = this.props;
    const {
      showPopupMenu,
      searchQuery,
      foundItems,
      selectedItems,
    } = this.state;

    const selectedText = prepareSelectedText(selectedItems);

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
                ListItem={ListItem}
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
  SelectedText: PropTypes.func.isRequired,
  PopupMenu: PropTypes.func.isRequired,
  InputTextField: PropTypes.func.isRequired,
  ItemsList: PropTypes.func.isRequired,
  ListItem: PropTypes.func.isRequired,
};
