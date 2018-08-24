import ListItemvalue from './list-item-value';

describe('ListItemvalue', () => {
  test('creates without crashing', () => {
    const value = new ListItemvalue('name', 'value', false);
    expect(value).toMatchObject({
      name: 'name',
      value: 'value',
      checked: false,
    });
  });
});
