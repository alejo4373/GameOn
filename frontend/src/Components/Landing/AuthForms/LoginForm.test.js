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

  it('simulate onSubmit & verify prop function got called', (done) => {
    const assertHandleLoginResponse = (err, user) => {
      expect(err).toBeDefined(); //Meaning the function got called
      done();
    }

    // mount() (Full Dom Rendering) test passes without complaints about e.preventDefault
    // const wrapper = mount(
    //   <LoginForm handleLoginResponse={assertHandleLoginResponse}/> 
    // );
    // console.log(wrapper.debug());
    // wrapper.find('Form').simulate('submit')//, {preventDefault: () => null});

    // shallow() test complained about e.preventDefault when added passes
    // complaint is a good sign that I should use this test and have it pass
      const wrapper = shallow(
        <LoginForm handleLoginResponse={assertHandleLoginResponse}/> 
      );
      console.log(wrapper.debug());
      wrapper.find('Form').simulate('submit', {preventDefault: () => null});


  });

});