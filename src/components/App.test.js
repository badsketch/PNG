import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App Component', () => {
    it('display "Picture Naming Game" as the title', () => {
        const wrapper = shallow(<App />);
        const text = wrapper.find('h1').text();
        expect(text).toEqual('Picture Naming Game');
    })
})