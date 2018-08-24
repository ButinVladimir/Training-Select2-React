import getDataRemote from './get-data-remote';

describe('get remote data function', () => {
  test('returns array by non-existing name', () => expect(getDataRemote('alph')).resolves.toEqual([]));

  test('returns array by precise name', () => expect(getDataRemote('France'))
    .resolves
    .toMatchObject([{ name: 'France', value: 'FRA' }]));

  test('returns array by query', () => expect(getDataRemote('fr'))
    .resolves
    .toEqual(expect.arrayContaining([{ name: 'France', value: 'FRA' }])));
});
