import React from 'react';
import renderer from 'react-test-renderer';
import Select2Multiple from './Select2Multiple';
import getData from '../get-data-local';

describe('Select2Multiple', () => {
  test('renders without crashing', () => {
    const component = renderer.create(
      <Select2Multiple
        onSelect={() => {}}
        getData={getData}
      />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
