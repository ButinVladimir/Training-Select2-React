import performSelectionSingle from './perform-selection-single';
import ListItemValue from './list-item-value';

describe('performSelectionSingle', () => {
  test('selects item when nothing is selected', () => {
    const foundItems = [
      new ListItemValue('name 1', 'value 1', false),
      new ListItemValue('name 2', 'value 2', false),
      new ListItemValue('name 3', 'value 3', false),
    ];
    const selectedValues = [];

    const { newFoundItems, newSelectedItems } = performSelectionSingle('value 2', 'name 2', selectedValues, foundItems);

    expect(newFoundItems).toEqual([
      new ListItemValue('name 1', 'value 1', false),
      new ListItemValue('name 2', 'value 2', true),
      new ListItemValue('name 3', 'value 3', false),
    ]);
    expect(newSelectedItems).toEqual([
      new ListItemValue('name 2', 'value 2', true),
    ]);
  });

  test('unselects item when it is selected', () => {
    const foundItems = [
      new ListItemValue('name 1', 'value 1', false),
      new ListItemValue('name 2', 'value 2', true),
      new ListItemValue('name 3', 'value 3', false),
    ];
    const selectedValues = [
      new ListItemValue('name 2', 'value 2', true),
    ];

    const { newFoundItems, newSelectedItems } = performSelectionSingle('value 2', 'name 2', selectedValues, foundItems);

    expect(newFoundItems).toEqual([
      new ListItemValue('name 1', 'value 1', false),
      new ListItemValue('name 2', 'value 2', false),
      new ListItemValue('name 3', 'value 3', false),
    ]);
    expect(newSelectedItems).toEqual([]);
  });

  test('selects item when other item is selected', () => {
    const foundItems = [
      new ListItemValue('name 1', 'value 1', true),
      new ListItemValue('name 2', 'value 2', false),
      new ListItemValue('name 3', 'value 3', false),
    ];
    const selectedValues = [
      new ListItemValue('name 1', 'value 1', true),
    ];

    const { newFoundItems, newSelectedItems } = performSelectionSingle('value 2', 'name 2', selectedValues, foundItems);

    expect(newFoundItems).toEqual([
      new ListItemValue('name 1', 'value 1', false),
      new ListItemValue('name 2', 'value 2', true),
      new ListItemValue('name 3', 'value 3', false),
    ]);
    expect(newSelectedItems).toEqual([
      new ListItemValue('name 2', 'value 2', true),
    ]);
  });
});
