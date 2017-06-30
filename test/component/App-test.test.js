import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import { shallow, mount } from 'enzyme';

const defaultState = {
  activeCards: [],
};

it('should render a title', () => {
  const wrapper = shallow(<App/>);
  const title = wrapper.find('.title');

  expect(title.text()).toEqual('Headcount 2.0');
});

it('should hold default state', () => {
  const wrapper = mount(<App/>);

  expect(wrapper.state().activeCards).toEqual([]);
});

it('should load in a district repository', () => {
  const wrapper = mount(<App/>)
  expect(Object.keys(wrapper.state().districtRepository.data).length).toEqual(181);
})


it('should update active state when a card is clicked', () => {
  const wrapper = mount(<App/>);
  const cardToClick = wrapper.find('.card').first();

  cardToClick.simulate('click');

  expect(wrapper.state().activeCards.length).toEqual(1);
})

it('should render the data table in the active cards', () => {
  const wrapper = mount(<App/>)
  const cardToClick = wrapper.find('.card').at(0);
  const cardToClick2 = wrapper.find('.card').at(1);


  expect(cardToClick.find('tr').length).toEqual(0);
  expect(cardToClick2.find('tr').length).toEqual(0);

  cardToClick.simulate('click');
  cardToClick2.simulate('click');

  expect(cardToClick.find('tr').length).toBeGreaterThan(10);
  expect(cardToClick2.find('tr').length).toBeGreaterThan(10);
});
