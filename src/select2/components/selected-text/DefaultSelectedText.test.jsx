import React from 'react';
import renderer from 'react-test-renderer';
import DefaultSelectedText from './DefaultSelectedText';

describe('DefaultSelectedText', () => {
  test('renders without crashing', () => {
    const mockFn = jest.fn();
    const component = renderer.create(<DefaultSelectedText value="value" onClick={mockFn} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('fires onClick properly', () => {
    const mockFn = jest.fn();
    const component = renderer.create(<DefaultSelectedText value="value" onClick={mockFn} />);

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    tree.props.onClick();
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockFn).toHaveBeenCalled();
  });
});
