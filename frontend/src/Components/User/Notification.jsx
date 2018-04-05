import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

class Notifications extends Component {
  notify = () => toast(`Congratulations You Won! ${'\n'} 100xp +`);

  render(){
    const {send} = this.props
    return (
      <div>
        {true?this.notify():''}
        <ToastContainer />
      </div>
    );
  }
}

export default Notifications