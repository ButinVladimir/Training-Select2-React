import React from 'react';
import renderer from 'react-test-renderer';
import DefaultInputTextField from './DefaultInputTextField';

describe('DefaultInputTextField', () => {
  test('renders without crashing', () => {
    const mockFn = jest.fn();
    const component = renderer.create(<DefaultInputTextField searchQuery="123" onChange={mockFn} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('fires onChange properly', () => {
    const mockFn = jest.fn();
    const component = renderer.create(<DefaultInputTextField searchQuery="123" onChange={mockFn} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onChange();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockFn).toHaveBeenCalled();
  });
});
