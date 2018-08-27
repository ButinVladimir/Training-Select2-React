import React from 'react';
import renderer from 'react-test-renderer';
import Select2Container from './Select2Container';

describe('Select2Container', () => {
  test('renders without crashing', () => {
    const component = renderer.create(
      <Select2Container ref={null}>
        <div>Child 1</div>
        <div>Child 2</div>
      </Select2Container>,
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
