import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import Select2Main from './Select2Main';
import InputTextField from './components/input-text-field/DefaultInputTextField';
import ItemsList from './components/items-list/DefaultItemsList';
import ListItem from './components/items-list/DefaultListItemSingle';
import PopupMenu from './components/popup-menu/DefaultPopupMenu';
import SelectedText from './components/selected-text/DefaultSelectedText';
import getData from '../get-data-local';
import performSelection from './helpers/perform-selection-single';
import prepareSelectedText from './helpers/default-prepare-selected-text';
import ListItemValue from './helpers/list-item-value';

describe('Select2Main', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
    expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
  });

  const mountWrapper = onSelect => mount(
    <Select2Main
      onSelect={onSelect}
      getData={getData}
      prepareSelectedText={prepareSelectedText}
      performSelection={performSelection}
      SelectedText={SelectedText}
      PopupMenu={PopupMenu}
      InputTextField={InputTextField}
      ItemsList={ItemsList}
      ListItem={ListItem}
    />,
  );

  test('renders without crashing', () => {
    const wrapper = mountWrapper(() => {});

    expect(wrapper).toMatchSnapshot();
  });

  test('shows popup properly when no items are selected', () => {
    const wrapper = mountWrapper(() => {});

    wrapper.find(SelectedText).simulate('click');
    const state = wrapper.state();
    expect(state.showPopupMenu).toEqual(true);
    expect(state.searchQuery).toEqual('');
    expect(state.foundItems).toMatchObject([]);

    expect(wrapper).toMatchSnapshot();
  });

  test('shows popup properly when some items are selected', () => {
    const wrapper = mountWrapper(() => {});

    const selectedItems = [new ListItemValue('name', 'value', true)];
    wrapper.setState({ selectedItems });
    wrapper.find(SelectedText).simulate('click');
    const state = wrapper.state();
    expect(state.showPopupMenu).toEqual(true);
    expect(state.searchQuery).toEqual('');
    expect(state.foundItems).toMatchObject(selectedItems);

    expect(wrapper).toMatchSnapshot();
  });

  test('fires timer after text in input field has been changed', () => {
    jest.useFakeTimers();
    const wrapper = mountWrapper(() => {});

    wrapper.find(SelectedText).simulate('click');
    const input = wrapper.find(InputTextField).find('input');
    input.instance().value = 'a';
    input.simulate('change');

    expect(clearTimeout).toHaveBeenCalledTimes(0);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runAllTimers();

    const state = wrapper.state();
    expect(state.showPopupMenu).toEqual(true);
    expect(state.searchQuery).toEqual('a');
    expect(state.foundItems).toMatchObject([]);

    expect(wrapper).toMatchSnapshot();
  });

  test('clears and fires timer once after text in input field has been changed twice', () => {
    jest.useFakeTimers();
    const wrapper = mountWrapper(() => {});

    wrapper.find(SelectedText).simulate('click');
    const input = wrapper.find(InputTextField).find('input');
    input.instance().value = 'a';
    input.simulate('change');
    input.instance().value = 'alpha';
    input.simulate('change');

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    jest.runAllTimers();

    const state = wrapper.state();
    expect(state.showPopupMenu).toEqual(true);
    expect(state.searchQuery).toEqual('alpha');
    expect(state.foundItems).toMatchObject([]);

    expect(wrapper).toMatchSnapshot();
  });

  test('fires timer after text in input field has been cleared', () => {
    jest.useFakeTimers();
    const wrapper = mountWrapper(() => {});
    const selectedItems = [new ListItemValue('name', 'value', true)];

    wrapper.setState({ selectedItems });
    wrapper.find(SelectedText).simulate('click');
    const input = wrapper.find(InputTextField).find('input');
    input.instance().value = 'a';
    input.simulate('change');
    input.instance().value = '';
    input.simulate('change');

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runAllTimers();

    const state = wrapper.state();
    expect(state.showPopupMenu).toEqual(true);
    expect(state.searchQuery).toEqual('');
    expect(state.foundItems).toMatchObject(selectedItems);
    expect(state.selectedItems).toMatchObject(selectedItems);

    expect(wrapper).toMatchSnapshot();
  });

  test('clears timer after component is unmounted', () => {
    jest.useFakeTimers();
    const wrapper = mountWrapper(() => {});
    const selectedItems = [new ListItemValue('name', 'value', true)];

    wrapper.setState({ selectedItems });
    wrapper.find(SelectedText).simulate('click');
    const input = wrapper.find(InputTextField).find('input');
    input.instance().value = 'a';
    input.simulate('change');

    expect(clearTimeout).toHaveBeenCalledTimes(0);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    wrapper.unmount();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  test('gets and sorts data correctly when nothing is selected', async () => {
    const wrapper = mountWrapper(() => {});

    const foundItems = await wrapper.instance().getAndSortData('alpha');
    expect(foundItems).toMatchObject([
      new ListItemValue('Alpha', 1, false),
      new ListItemValue('Alpha 1', 11, false),
      new ListItemValue('Alpha 2', 21, false),
    ]);
  });

  test('gets and sorts data correctly when something is selected', async () => {
    const wrapper = mountWrapper(() => {});

    wrapper.setState({ selectedItems: [new ListItemValue('Alpha 1', 11, true)] });

    const foundItems = await wrapper.instance().getAndSortData('alpha');
    expect(foundItems).toMatchObject([
      new ListItemValue('Alpha 1', 11, true),
      new ListItemValue('Alpha', 1, false),
      new ListItemValue('Alpha 2', 21, false),
    ]);
  });

  test('changes selected item correctly', async () => {
    const mockFn = jest.fn();
    const wrapper = mountWrapper(mockFn);

    const foundItems = [
      new ListItemValue('Alpha 1', 11, true),
      new ListItemValue('Alpha', 1, false),
      new ListItemValue('Alpha 2', 21, false),
    ];
    const selectedItems = [
      new ListItemValue('Alpha 1', 11, true),
    ];
    wrapper.setState({ selectedItems, foundItems });
    wrapper.instance().onChangeItemSelection(21, 'Alpha 2');

    const state = wrapper.state();

    expect(state.foundItems).toEqual([
      new ListItemValue('Alpha 1', 11, false),
      new ListItemValue('Alpha', 1, false),
      new ListItemValue('Alpha 2', 21, true),
    ]);
    expect(state.selectedItems).toEqual([new ListItemValue('Alpha 2', 21, true)]);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith([21]);
    expect(wrapper).toMatchSnapshot();
  });
});
