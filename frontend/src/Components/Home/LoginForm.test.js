import React from 'react';
import { mount, shallow } from 'enzyme';
import LoginForm from './LoginForm';

it('click to submit form', (done) => {
  const callback = (err, user) => {
    expect(err).toEqual(new Error("Network Error"))
    done();
  }

  const wrapper = mount(
    <LoginForm handleLoginResponse={callback}/> 
  );
  wrapper.find('form').simulate('submit');
});
