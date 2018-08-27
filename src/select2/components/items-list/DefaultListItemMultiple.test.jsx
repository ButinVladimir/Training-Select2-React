import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DefaultListItemMultiple from './DefaultListItemMultiple';

describe('DefaultListItemMultiple', () => {
  beforeAll(() => {
    Enzyme.configure({ adapter: new Adapter() });
  });

  test('renders without crashing unchecked', () => {
    const mockFn = jest.fn();
    const component = renderer.create(<DefaultListItemMultiple
      checked={false}
      name="name"
      value="value"
      onChange={mockFn}
    />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('renders without crashing checked', () => {
    const mockFn = jest.fn();
    const component = renderer.create(<DefaultListItemMultiple
      checked
      name="name"
      value="value"
      onChange={mockFn}
    />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockFn).not.toHaveBeenCalled();
  });

  test('fires onChange properly', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<DefaultListItemMultiple
      checked={false}
      name="name"
      value="value"
      onChange={mockFn}
    />);

    const input = wrapper.find('input');
    input.simulate('change', 'value', 'name');
    expect(mockFn).toHaveBeenCalledWith('value', 'name');
  });
});
