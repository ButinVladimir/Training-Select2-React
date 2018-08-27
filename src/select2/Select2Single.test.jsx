import React from 'react';
import renderer from 'react-test-renderer';
import Select2Single from './Select2Single';
import getData from '../get-data-local';

describe('Select2Single', () => {
  test('renders without crashing', () => {
    const component = renderer.create(
      <Select2Single
        onSelect={() => {}}
        getData={getData}
      />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
