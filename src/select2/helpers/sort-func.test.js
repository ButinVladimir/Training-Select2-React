import sortFunc from './sort-func';
import ListItemValue from './list-item-value';

describe('sortFunc', () => {
  test('compares two differently checked items', () => {
    expect(sortFunc(
      new ListItemValue('name', 'value', false),
      new ListItemValue('name', 'value', true),
    )).toEqual(1);
    expect(sortFunc(
      new ListItemValue('name', 'value', true),
      new ListItemValue('name', 'value', false),
    )).toEqual(-1);

    expect(sortFunc(
      new ListItemValue('name 1', 'value 1', false),
      new ListItemValue('name 2', 'value 2', true),
    )).toEqual(1);
    expect(sortFunc(
      new ListItemValue('name 1', 'value 1', true),
      new ListItemValue('name 2', 'value 2', false),
    )).toEqual(-1);
  });

  test('compares two items both being checked', () => {
    expect(sortFunc(
      new ListItemValue('name 1', 'value 1', true),
      new ListItemValue('name 2', 'value 2', true),
    )).toEqual(-1);
    expect(sortFunc(
      new ListItemValue('name 2', 'value 1', true),
      new ListItemValue('name 1', 'value 2', true),
    )).toEqual(1);
  });

  test('compares two items both being unchecked', () => {
    expect(sortFunc(
      new ListItemValue('name 1', 'value 1', false),
      new ListItemValue('name 2', 'value 2', false),
    )).toEqual(-1);
    expect(sortFunc(
      new ListItemValue('name 2', 'value 1', false),
      new ListItemValue('name 1', 'value 2', false),
    )).toEqual(1);
  });

  test('compares two checked items with same names', () => {
    expect(sortFunc(
      new ListItemValue('name', 'value 1', true),
      new ListItemValue('name', 'value 2', true),
    )).toEqual(-1);

    expect(sortFunc(
      new ListItemValue('name', 'value 2', true),
      new ListItemValue('name', 'value 1', true),
    )).toEqual(1);
  });

  test('compares two unchecked items with same names', () => {
    expect(sortFunc(
      new ListItemValue('name', 'value 1', false),
      new ListItemValue('name', 'value 2', false),
    )).toEqual(-1);

    expect(sortFunc(
      new ListItemValue('name', 'value 2', false),
      new ListItemValue('name', 'value 1', false),
    )).toEqual(1);
  });

  test('compares two same items', () => {
    expect(sortFunc(
      new ListItemValue('name', 'value', false),
      new ListItemValue('name', 'value', false),
    )).toEqual(0);

    expect(sortFunc(
      new ListItemValue('name', 'value', true),
      new ListItemValue('name', 'value', true),
    )).toEqual(0);
  });
});
