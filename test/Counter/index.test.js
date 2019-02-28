import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CounterComponent from '../../src/components/Counter';

Enzyme.configure({ adapter: new Adapter() });

describe('Check Counter Component', () => {
  const wrapper = shallow(<CounterComponent />);
  it('Check counter ID test', () => {
    expect(wrapper.find('#conter').exists()).toBe(true);
  });

  it('Check component props', () => {
    expect(wrapper.prop('unit')).toMatchSnapshot();
  });
});
