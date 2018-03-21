import React from 'react';
import axios from 'axios';

class Settings extends React.Component {
  state = { newName: null, newUsername: null, newEmail: null, message: null }

  handleNewFullName = e => {
    this.setState({
      newFullName: e.target.value
    })
  }

  handleNewUsername = e => {
    this.setState({
      newUsername: e.target.value
    })
  }

  handleNewEmail = e => {
    this.setState({
      newEmail: e.target.value
    })
  }

  handleSave = e => {
    const { newFullName, newUsername, newEmail } = this.state;

    axios
      .patch('/users/updateUser', {
        newFullName: newFullName,
        newUsername: newUsername,
        newEmail: newEmail
      })
      .then(res => {
        this.setState({
          message: 'User settings updated!'
        })
      })
      .catch(e => {
        console.log(e)
        this.setState({
          message: 'Error updating profile'
        })
      })
  }

  render() {
    const { newFullName, newUsername, newEmail, message } = this.state;
    const { handleNewFullName, handleNewUsername, handleNewEmail, handleSave } = this;
    console.log({state: this.state})
    return (
      <div>
        Name <input type='text' id='newName' value={newFullName} onChange={handleNewFullName} />
        Username <input type='text' id='newUsername' value={newUsername} onChange={handleNewUsername} />
        Email <input type='text' id='newEmail' value={newEmail} onChange={handleNewEmail} />
        <button onClick={handleSave} >Save</button>
        {message}
      </div>
    )
  }
}

export default Settings;
