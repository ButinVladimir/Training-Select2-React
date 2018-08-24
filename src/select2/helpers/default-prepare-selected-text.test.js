import defaultPrepareSelectedText from './default-prepare-selected-text';
import ListItemValue from './list-item-value';

describe('default-prepare-selected-text', () => {
  test('has no values in input', () => {
    expect(defaultPrepareSelectedText(null)).toEqual('Click to select');
    expect(defaultPrepareSelectedText(123)).toEqual('Click to select');
    expect(defaultPrepareSelectedText([])).toEqual('Click to select');
  });

  test('has single value in input', () => {
    expect(defaultPrepareSelectedText([new ListItemValue('name', 'value', false)])).toEqual('name');
  });

  test('has multiple values in input', () => {
    expect(defaultPrepareSelectedText([
      new ListItemValue('name 2', 'value', false),
      new ListItemValue('name', 'value', false),
      new ListItemValue('name 1', 'value', false),
    ])).toEqual('name,name 1,name 2');
  });
});
