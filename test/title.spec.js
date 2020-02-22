import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Title from '../src/Title.jsx';
import MenuNav from '../src/MenuNav.jsx';
import Menu from '../src/Menu.jsx';

describe('Test Title component', () => {
  let wrapper = shallow(<Title />);

  it('should not return an error', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

// describe('Test MenuNav component', () => {
//   let wrapper = shallow(<MenuNav />);

//   it('should not return an error', () => {
//     expect(wrapper).toMatchSnapshot();
//   });
// });

// describe('Test Menu component', () => {
//   let wrapper = shallow(<Menu />);

//   it('should not return an error', () => {
//     expect(wrapper).toMatchSnapshot();
//   });
// });