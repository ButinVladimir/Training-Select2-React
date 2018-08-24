import React from 'react';
import renderer from 'react-test-renderer';
import DefaultPopupMenu from './DefaultPopupMenu';

describe('DefaultPopupMenu', () => {
  test('renders without crashing', () => {
    const component = renderer.create(<DefaultPopupMenu
      inputTextField={<span>Text field</span>}
      itemsList={<span>Items list</span>}
    />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
