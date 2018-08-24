import getDataLocal from './get-data-local';

describe('get local data function', () => {
  test('returns array by query', () => expect(getDataLocal('alph')).resolves.toEqual([
    { value: 1, name: 'Alpha' },
    { value: 11, name: 'Alpha 1' },
    { value: 21, name: 'Alpha 2' },
  ]));
});
