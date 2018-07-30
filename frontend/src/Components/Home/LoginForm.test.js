import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import LoginForm from './LoginForm';

describe('<LoginForm/>', () => {
  it('form renders as it did last time (snapshot)', () => {
  const component = renderer.create(<LoginForm/>)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

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

  it('has two input texts, one of them is type password');
  it('doesn\'t submit if either input field is empty' );
  it('has a submit button with a function attached to it');
});