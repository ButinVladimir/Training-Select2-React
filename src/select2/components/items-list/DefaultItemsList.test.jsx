import React from 'react';
import renderer from 'react-test-renderer';
import DefaultItemsList from './DefaultItemsList';
import DefaultListItemSingle from './DefaultListItemSingle';
import DefaultListItemMultiple from './DefaultListItemMultiple';
import ListItemValue from '../../helpers/list-item-value';

describe('DefaultItemsList', () => {
  test('renders without crashing with empty list and single selection', () => {
    const mockFn = jest.fn();
    const component = renderer.create(<DefaultItemsList
      ListItem={DefaultListItemSingle}
      items={[]}
      onChange={mockFn}
    />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('renders without crashing with empty list and multiple selection', () => {
    const mockFn = jest.fn();
    const component = renderer.create(<DefaultItemsList
      ListItem={DefaultListItemMultiple}
      items={[]}
      onChange={mockFn}
    />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('renders without crashing with some items in list and single selection', () => {
    const mockFn = jest.fn();
    const component = renderer.create(<DefaultItemsList
      ListItem={DefaultListItemSingle}
      items={[
        new ListItemValue('name 1', 'value 1', false),
        new ListItemValue('name 2', 'value 2', true),
        new ListItemValue('name 3', 'value 3', false),
      ]}
      onChange={mockFn}
    />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('renders without crashing with some items in list and multiple selection', () => {
    const mockFn = jest.fn();
    const component = renderer.create(<DefaultItemsList
      ListItem={DefaultListItemMultiple}
      items={[
        new ListItemValue('name 1', 'value 1', false),
        new ListItemValue('name 2', 'value 2', true),
        new ListItemValue('name 3', 'value 3', true),
      ]}
      onChange={mockFn}
    />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockFn).not.toHaveBeenCalled();
  });
});
